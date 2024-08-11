// src/pages/categories/[category_key].tsx
import { GetServerSideProps } from 'next';
import { fetchCategoryDetailByUrlKey, fetchStoriesByCategory, fetchCategories } from '../../utils/api';
import { Story } from '../../types/Chapter';
import { Category } from '../../types/Category';
import CategoryNavigate from '../../components/CategoryNavigate';
import StoryList from '../../components/StoryList';
import CategorySideBar from '../../components/CategorySideBar';
import { STORIES_PER_PAGE } from '../../utils/config';

interface CategoryDetailProps {
    category: Category | null;
    initialStories: Story[];
    categories: Category[];
    initialTotalPages: number;
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({ category, initialStories, categories, initialTotalPages }) => {
    if (!category) {
        return (
            <main>
                <p>Category not found.</p>
            </main>
        );
    }

    const fetchStories = (page: number) => fetchStoriesByCategory(category.category_id, page, STORIES_PER_PAGE);

    return (
        <div>
            <CategoryNavigate categories={categories} />
            <main className="main-body">
                <div className="container">
                    <div className="category-detail">
                        <div className="left-column">
                            <h2>{category.title}</h2>
                            <StoryList
                                fetchMethod={fetchStories}
                                initialStories={initialStories}
                                initialTotalPages={initialTotalPages}
                            />
                        </div>
                        <div className="right-column">
                            <div className="category-info">
                                {category.description || `Danh sách truyện của danh mục ${category.title}`}
                            </div>
                            <CategorySideBar typeCategory="category" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { category_key } = context.params || {};
    if (!category_key) {
        return {
            props: {
                category: null,
                initialStories: [],
                categories: [],
                initialTotalPages: 0,
            },
        };
    }

    const category = await fetchCategoryDetailByUrlKey(category_key as string);
    if (!category) {
        return {
            props: {
                category: null,
                initialStories: [],
                categories: [],
                initialTotalPages: 0,
            },
        };
    }

    const categories = await fetchCategories();
    const { list: initialStories, total_page: initialTotalPages } = await fetchStoriesByCategory(category.category_id, 1, STORIES_PER_PAGE);

    return {
        props: {
            category,
            initialStories,
            categories,
            initialTotalPages,
        },
    };
};

export default CategoryDetail;