// src/components/StoryList.tsx
import { StoryListProps } from '../types/Story';

// Create the StoryList component
const StoryList: React.FC<StoryListProps> = ({ stories }) => {
    return (
        <div className="item-list">
            {stories.map(story => (
                <div className="item-story" key={story.story_id}>
                    <a href={`/stories/${story.url_key}`}>
                        <img src={story.path_image} className="item-image" alt={story.title} />
                        <div className="item-title"><h3>{story.title}</h3></div>
                    </a>
                </div>
            ))}
        </div>
    );
};

export default StoryList;
