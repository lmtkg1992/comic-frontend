// src/pages/categories/[category_key].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchCategoryDetailByUrlKey, fetchStoriesByCategory, fetchCategories } from '../../utils/api';
import { Story } from '../../types/Chapter';
import { Category } from '../../types/Category';
import CategoryNavigate from '../../components/CategoryNavigate';
import StoryList from '../../components/StoryList';
import CategorySideBar from '../../components/CategorySideBar';
import { STORIES_PER_PAGE } from '../../utils/config';

const CategoryDetail: React.FC = () => {
    const router = useRouter();
    const { category_key } = router.query;

    const [category, setCategory] = useState<Category | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [initialStories, setInitialStories] = useState<Story[]>([]);
    const [initialTotalPages, setInitialTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            if (category_key) {
                try {
                    setLoading(true);
                    const fetchedCategory = await fetchCategoryDetailByUrlKey(category_key as string);
                    if (fetchedCategory) {
                        setCategory(fetchedCategory);
                        const { list: stories, total_page: totalPages } = await fetchStoriesByCategory(
                            fetchedCategory.category_id,
                            1,
                            STORIES_PER_PAGE
                        );
                        setInitialStories(stories);
                        setInitialTotalPages(totalPages);
                    }
                    const fetchedCategories = await fetchCategories();
                    setCategories(fetchedCategories);
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [category_key]);

    if (loading) {
        return <p>Loading...</p>;
    }

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

export default CategoryDetail;