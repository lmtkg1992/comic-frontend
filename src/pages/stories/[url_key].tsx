// src/pages/story/[url_key].tsx
import { GetServerSideProps } from 'next';
import CategoryNavigate from '../../components/CategoryNavigate';
import { fetchStoryDetail, fetchChapters, fetchCategories } from '../../utils/api';
import { Story } from '../../types/Story';
import { Category } from '../../types/Category';

interface StoryDetailProps {
    story: Story | null;
    categories: Category[];
    chapters: any[];
}

const StoryDetail: React.FC<StoryDetailProps> = ({ story, categories, chapters }) => {
    if (!story) {
        return (
            <div>
                <CategoryNavigate categories={categories} />
                <main>
                    <p>Story not found.</p>
                </main>
            </div>
        );
    }

    const { title, path_image, author, description, publish_date, status } = story;

    return (
        <div>
            <CategoryNavigate categories={categories} />
            <main>
                <div className="story-detail">
                    <img src={path_image} alt={title} />
                    <h1>{title}</h1>
                    <p>Author: {author}</p>
                    <p>Publish Date: {publish_date}</p>
                    <p>Status: {status}</p>
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                </div>
                <div className="chapter-list">
                    <h2>Chapters</h2>
                    <ul>
                        {chapters.map((chapter) => (
                            <li key={chapter.chapter_id}>
                                <a href={`/chapters/${story.url_key}-${chapter.url_key}.${chapter.chapter_id}`}>{chapter.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const categories = await fetchCategories();

    const { url_key } = context.params || {};
    if (!url_key) {
        return {
            props: {
                categories,
                story: null,
                chapters: [],
            },
        };
    }

    const storyId = (Array.isArray(url_key) ? url_key[0] : url_key).split('.').pop();
    if (!storyId) {
        return {
            props: {
                categories,
                story: null,
                chapters: [],
            },
        };
    }

    const story = await fetchStoryDetail(storyId);
    const chapters = await fetchChapters(storyId);

    return {
        props: {
            categories,
            story,
            chapters,
        },
    };
};

export default StoryDetail;
