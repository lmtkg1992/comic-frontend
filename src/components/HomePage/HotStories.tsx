// src/components/HomePage/HotStories.tsx
import { useEffect, useState } from 'react';
import { Story } from '../../types/Chapter';
import { Category } from '../../types/Category';
import { fetchHotStories } from '../../utils/api';
import categoriesData from '../../data/categories.json';

const HotStories: React.FC = () => {
    const [stories, setStories] = useState<Story[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const loadStories = async (categoryId = '') => {
        const data = await fetchHotStories(16, categoryId); // Limit to 16 stories with optional category ID
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

    return (
        <div className="hot-story">
            <div className="hot-story-header">
                <h2>TRUYỆN HOT <span className="glyphicon glyphicon-fire"></span></h2>
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