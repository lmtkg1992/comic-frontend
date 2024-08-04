import { GetServerSideProps } from 'next';
import { fetchCategoryDetailByUrlKey, fetchStoriesByCategory, fetchCategories } from '../../utils/api';
import { Story } from '../../types/Chapter';
import { Category } from '../../types/Category';
import CategoryNavigate from '../../components/CategoryNavigate';
import StoryList from '../../components/StoryList';
import CategorySideBar from '../../components/CategorySideBar';

interface CategoryDetailProps {
    category: Category | null;
    stories: Story[];
    categories: Category[];
    totalPages: number;
    currentPage: number;
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({ category, stories, categories, totalPages, currentPage }) => {
    if (!category) {
        return (
            <main>
                <p>Category not found.</p>
            </main>
        );
    }

    const handlePageChange = async (page: number) => {
        // Implement the page change logic here if needed
    };
    const categoryDescription = category.description ? category.description : `Danh sách truyện của danh mục ${category.title}`;

    return (
        <div>
            <CategoryNavigate categories={categories} />
            <main className="main-body">
                <div className="container">
                    <div className="category-detail">
                        <div className="left-column">
                            <h2>{category.title}</h2>
                            <StoryList stories={stories} />
                        </div>
                        <div className="right-column">
                            <div className="category-info">
                                {categoryDescription}
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
                stories: [],
                categories: [],
                totalPages: 0,
                currentPage: 1,
            },
        };
    }

    const category = await fetchCategoryDetailByUrlKey(category_key as string);
    if (!category) {
        return {
            props: {
                category: null,
                stories: [],
                categories: [],
                totalPages: 0,
                currentPage: 1,
            },
        };
    }

    const categories = await fetchCategories();
    const { list: stories, total_page: totalPages } = await fetchStoriesByCategory(category.category_id, 1, 10);

    return {
        props: {
            category,
            stories,
            categories,
            totalPages,
            currentPage: 1,
        },
    };
};

export default CategoryDetail;