import { StoryListProps } from '../types/Story';

// Create the StoryList component
const StoryList : React.FC<StoryListProps> = ({ stories }) => {
    return (
        <div className="item-list">
            {stories.map(story => (
                <div className="item-story" key={story.story_id}>
                    <a href="#">
                        <img src={story.path_image} className="item-image"/>
                        <div className="item-title"><h3>{story.title}</h3></div>
                    </a>
                </div>
            ))}
        </div>
    );
};

export default StoryList;
