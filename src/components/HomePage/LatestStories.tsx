// src/components/HomePage/LatestStories.tsx
import { useEffect, useState } from 'react';
import { Story } from '../../types/Chapter';
import { Category } from '../../types/Category';
import { fetchLatestStories, fetchCategoriesByType } from '../../utils/api';

const LatestStories: React.FC = () => {
    const [stories, setStories] = useState<Story[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const loadStories = async () => {
            const data = await fetchLatestStories(16); // Limit to 16 stories
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
        <div className="latest-story">
            <div className="latest-story-header">
                <h2>TRUYỆN MỚI CẬP NHẬT <span className="glyphicon glyphicon-chevron-right"></span></h2>
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
                        <div className="story-time">7 giờ trước</div> {/* Update this part based on your data */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestStories;