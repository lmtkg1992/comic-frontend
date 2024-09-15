// src/components/TopStories.tsx
import { useEffect, useState } from 'react';
import { Story } from '../../types/Chapter';
import { fetchTopStoriesByPeriod } from '../../utils/api'; // API method to be implemented

interface TopStoriesProps {
    initialPeriod?: 'day' | 'month' | 'all';
}

const TopStories: React.FC<TopStoriesProps> = ({ initialPeriod = 'day' }) => {
    const [stories, setStories] = useState<Story[]>([]);
    const [activeTab, setActiveTab] = useState<'day' | 'month' | 'all'>(initialPeriod);

    // Fetch stories based on the active tab (period)
    const fetchStories = async (period: 'day' | 'month' | 'all') => {
        const data = await fetchTopStoriesByPeriod(period, 5); // Limit to 5 stories
        setStories(data.list);
    };

    // Fetch stories whenever the active tab changes
    useEffect(() => {
        fetchStories(activeTab);
    }, [activeTab]);

    // Render tabs for different periods
    const renderTabs = () => (
        <div className="top-story-filter">
            <div
                className={activeTab === 'day' ? 'active' : ''}
                onClick={() => setActiveTab('day')}
            >
                Ngày
            </div>
            <div
                className={activeTab === 'month' ? 'active' : ''}
                onClick={() => setActiveTab('month')}
            >
                Tháng
            </div>
            <div
                className={activeTab === 'all' ? 'active' : ''}
                onClick={() => setActiveTab('all')}
            >
                All time
            </div>
        </div>
    );

    return (
        <div className="top-story">
            <h2>TRUYỆN ĐANG HOT</h2>
            {renderTabs()}
            {stories.map((story, index) => (
                <div className="top-story-item" key={story.story_id}>
                    <div>
                        <div className="top-story-num">{index + 1}</div>
                        <div className="top-story-num-title">
                            <h3>
                                <a href={`/stories/${story.url_key}`} title={story.title}>
                                    {story.title}
                                </a>
                            </h3>
                            <div className="story-meta">
                                {story.categories.map((category, i) => (
                                    <span key={category.category_id}>
                                        {i > 0 && ', '}
                                        <a href={`/categories/${category.url_key}`}>{category.category_name}</a>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TopStories;