import StoryList from '../components/StoryList';
import CategoryNavigate from '../components/CategoryNavigate';
import { fetchStories, fetchCategories } from '../utils/api';

import { Story } from '../types/Story';
import { Category } from '../types/Category';
interface Props {
    categories: Category[];
    stories: Story[];
}
export async function getServerSideProps() {

    const categories = await fetchCategories();
    const stories = await fetchStories();

    return {
        props: {
            categories,
            stories
        },
    };
}

const HomePage: React.FC<Props> = ({categories, stories }) => {
    return (
        <body>
        <CategoryNavigate categories={categories} />
        <main className="main-body">
            <div className="container">
                <div className="hot-story">
                    <div className="title-list">TRUYỆN HOT</div>
                    <StoryList stories={stories} />
                </div>
            </div>
        </main>
        </body>
    );
};
export default HomePage;