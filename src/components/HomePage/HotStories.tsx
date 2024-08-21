// src/components/HomePage/HotStories.tsx
import { useEffect, useState } from 'react';
import { Story } from '../../types/Chapter';
import { Category } from '../../types/Category';
import { fetchHotStories, fetchCategoriesByType } from '../../utils/api';

const HotStories: React.FC = () => {
    const [stories, setStories] = useState<Story[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const loadStories = async () => {
            const data = await fetchHotStories(16); // Limit to 16 stories
            setStories(data.list);
        };

        const loadCategories = async () => {
            const data = await fetchCategoriesByType('category');
            setCategories(data);
        };

        loadStories();
        loadCategories();
    }, []);

    return (
        <div className="hot-story">
            <div className="hot-story-header">
                <h2>TRUYỆN HOT <span className="glyphicon glyphicon-fire"></span></h2>
                <div className="category-dropdown">
                    <select>
                        <option value="">TẤT CẢ</option>
                        {categories.map((category) => (
                            <option key={category.category_id} value={category.category_id}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="story-grid">
                {stories.map((story) => (
                    <div className="story-item" key={story.story_id}>
                        <a href={`/stories/${story.url_key}`}>
                            <img src={story.path_image} className="item-image" alt={story.title} />
                        </a>
                        <div className="story-title">
                            <a href={`/stories/${story.url_key}`}>{story.title}</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotStories;