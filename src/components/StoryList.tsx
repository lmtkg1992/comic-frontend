import { Story, StoryListProps } from '../types/Story';

// Create the StoryList component
const StoryList : React.FC<StoryListProps> = ({ stories }) => {
    return (
        <div className="item-list">
            {stories.map(story => (
                // <div key={story.story_id}>
                //     <h2>{story.title}</h2>
                //     <p>{story.description}</p>
                // </div>
                <div className="item-story" key={story.story_id}>
                    <a href="#">
                        <img src="https://static.8cache.com/cover/o/eJzLyTDW160wTC70dXI0zAnO1g9LL0gpsAz0CA_x1HeEAqckR31jj0A_n_Jg8ygXC_1yIzNT3QxjSzNdz2QTIwCutRND/linh-vu-thien-ha.jpg" className="item-image"/>
                        <div className="item-title"><h3>{story.title}</h3></div>
                    </a>
                </div>
            ))}
        </div>
    );
};

export default StoryList;
