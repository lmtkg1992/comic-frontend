// src/components/StoryList.tsx
import { Story } from '../types/Chapter';

interface StoryListProps {
    stories: Story[];
}

const StoryList: React.FC<StoryListProps> = ({ stories }) => {
    return (
        <div className="story-list">
            {stories.map(story => (
                <div className="story-item" key={story.story_id}>
                    <a href={`/stories/${story.url_key}`}>
                        <img src={story.path_image} alt={story.title} />
                    </a>
                    <div className="story-info">
                        <h3 className="story-title">
                            <a href={`/stories/${story.url_key}`}>{story.title}</a>
                            <span className="story-tags">
                                {story.is_full && <span className="tag tag-full">Full</span>}
                                {story.is_hot && <span className="tag tag-hot">Hot</span>}
                            </span>
                        </h3>
                        <p className="story-author">
                            <a href={`/authors/${story.author.url_key}`}>{story.author.author_title}</a>
                        </p>
                    </div>
                    {story.last_chapter && (
                        <div className="story-chapters">
                            <a href={`/chapters/${story.url_key}/${story.last_chapter.url_key}`}>{story.last_chapter.title}</a>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default StoryList;