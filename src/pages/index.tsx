// pages/index.tsx
import { useEffect, useState } from 'react';
import CategoryNavigate from '../components/CategoryNavigate';
import HotStories from '@/src/components/HomePage/HotStories';
import LatestStories from '@/src/components/HomePage/LatestStories';
import FullStories from '@/src/components/HomePage/FullStories';
import CategorySideBar from '../components/CategorySideBar';
import { fetchCategories } from '../utils/api';
import { Category } from '../types/Category';

const HomePage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Fetch categories on the client side
        const fetchCategoriesData = async () => {
            try {
                setLoading(true);
                const categoriesData = await fetchCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoriesData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <CategoryNavigate categories={categories} />
            <main className="main-body">
                <div className="container">
                    <div className="homepage">
                        <div className="container-row">
                            <div className="full-column">
                                <HotStories />
                            </div>
                        </div>
                        <div className="container-row">
                            <div className="left-column">
                                <LatestStories />
                            </div>
                            <div className="right-column">
                                <CategorySideBar typeCategory="category" />
                            </div>
                        </div>
                        <div className="container-row">
                            <div className="full-column">
                                <FullStories />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomePage;