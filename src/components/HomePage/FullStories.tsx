// src/components/HomePage/FullStories.tsx
import { useEffect, useState } from 'react';
import { Story } from '../../types/Chapter';
import { fetchFullStories } from '../../utils/api';

const FullStories: React.FC = () => {
    const [stories, setStories] = useState<Story[]>([]);

    useEffect(() => {
        const loadStories = async () => {
            const data = await fetchFullStories(16);  // Limit to 16 stories
            setStories(data.list);
        };

        loadStories();
    }, []);

    return (
        <div className="full-story">
            <div className="full-story-header">
                <h2>TRUYỆN ĐÃ HOÀN THÀNH <span className="glyphicon glyphicon-chevron-right"></span></h2>
            </div>
            <div className="story-grid">
                {stories.map((story) => (
                    <div className="story-item" key={story.story_id}>
                        <a href={`/stories/${story.url_key}`}>
                            <img src={story.path_image} className="item-image" alt={story.title} />
                        </a>
                        <a href={`/stories/${story.url_key}`}>
                            <div className="story-title">{story.title}</div>
                        </a>
                        <div className="story-meta">
                            <span className="tag tag-full">Full</span> - {story.total_chapters} chương
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FullStories;
