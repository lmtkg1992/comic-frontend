// src/components/HomePage/LatestStories.tsx
import { useEffect, useState } from 'react';
import { Story } from '../../types/Chapter';
import { Category } from '../../types/Category';
import { fetchLatestStories, fetchStoriesByCategory } from '../../utils/api';
import categoriesData from '../../data/categories.json';

const LatestStories: React.FC = () => {
    const [stories, setStories] = useState<Story[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const loadStories = async (categoryId = '') => {
        let data;
        if (categoryId) {
            data = await fetchStoriesByCategory(categoryId, 1, 16, true); // Fetch stories by category
        } else {
            data = await fetchLatestStories(16); // Fetch all latest stories
        }
        setStories(data.list);
    };

    useEffect(() => {
        setCategories(categoriesData.filter((category) => category.type_category === 'category'));
        loadStories(); // Load all stories initially
    }, []);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = event.target.value;
        setSelectedCategory(categoryId);
        loadStories(categoryId); // Load stories based on selected category
    };

    // Helper function to calculate the time difference
    const calculateTimeAgo = (updatedDate: string) => {
        const now = new Date();
        const updated = new Date(updatedDate);
        const diffInSeconds = Math.floor((now.getTime() - updated.getTime()) / 1000);

        if (diffInSeconds < 60) {
            return `${diffInSeconds} giây trước`;
        }

        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return `${diffInMinutes} phút trước`;
        }

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return `${diffInHours} giờ trước`;
        }

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) {
            return `${diffInDays} ngày trước`;
        }

        const diffInWeeks = Math.floor(diffInDays / 7);
        if (diffInWeeks < 4) {
            return `${diffInWeeks} tuần trước`;
        }

        const diffInMonths = Math.floor(diffInDays / 30);
        return `${diffInMonths} tháng trước`;
    };

    return (
        <div className="latest-story">
            <div className="latest-story-header">
                <h2>TRUYỆN MỚI CẬP NHẬT <span className="glyphicon glyphicon-chevron-right"></span></h2>
                <div className="category-dropdown">
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">TẤT CẢ</option>
                        {categories.map((category) => (
                            <option key={category.category_id} value={category.category_id}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="story-list">
                {stories.map((story) => (
                    <div className="story-row" key={story.story_id}>
                        <div className="story-title">
                            <a href={`/stories/${story.url_key}`}>{story.title}</a>
                            {story.is_full && <span className="tag tag-full">Full</span>}
                            {story.is_hot && <span className="tag tag-hot">Hot</span>}
                        </div>
                        <div className="story-genre">
                            {story.categories.map((category, index) => (
                                <span key={category.category_id}>
                                    {index > 0 && ', '}
                                    <a href={`/categories/${category.url_key}`}>{category.category_name}</a>
                                </span>
                            ))}
                        </div>
                        <div className="story-chapter">
                            {story.last_chapter ? (
                                <a href={`/chapters/${story.url_key}/${story.last_chapter.url_key}`}>
                                    {story.last_chapter.title}
                                </a>
                            ) : (
                                <span>&nbsp;</span> // Empty space to maintain structure
                            )}
                        </div>
                        <div className="story-time">{calculateTimeAgo(story.updated_date)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestStories;