// src/pages/categories/[category_key].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchCategoryDetailByUrlKey, fetchStoriesByCategory } from '../../utils/api';
import { Story } from '../../types/Chapter';
import { Category } from '../../types/Category';
import StoryList from '../../components/StoryList';
import { STORIES_PER_PAGE } from '../../utils/config';
import StaticCategoryNavigate from '../../components/StaticCategoryNavigate';
import StaticCategorySideBar from '../../components/StaticCategorySideBar';

const CategoryDetail: React.FC = () => {
    const router = useRouter();
    const { category_key } = router.query;

    const [category, setCategory] = useState<Category | null>(null);
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
            <StaticCategoryNavigate />
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
                            <StaticCategorySideBar typeCategory="category" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CategoryDetail;