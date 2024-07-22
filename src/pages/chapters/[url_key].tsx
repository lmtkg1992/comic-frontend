// src/pages/chapters/[url_key].tsx
import { GetServerSideProps } from 'next';
import { fetchChapterDetail, fetchStoryDetail, fetchCategories } from '../../utils/api';
import { Chapter, Story } from '../../types/Chapter';
import CategoryNavigate from "@/src/components/CategoryNavigate";
import {Category} from "@/src/types/Category";

interface ChapterDetailProps {
    chapter: Chapter | null;
    categories: Category[];
    story: Story | null;
}

const ChapterDetail: React.FC<ChapterDetailProps> = ({ chapter,categories, story }) => {
    if (!chapter || !story) {
        return (
            <main>
                <p>Chapter not found.</p>
            </main>
        );
    }

    const { title, content } = chapter;

    return (
        <div>
            <CategoryNavigate categories={categories} />
            <main className="main-body">
                <div className="container">
                    <div className="chapter-header">
                        <h1 className="story-title"><a href={`/stories/${story.url_key}.${story.story_id}`}>{story.title}</a></h1>
                        <h2 className="chapter-title">{title}</h2>
                        <div className="chapter-navigation">
                            <button className="chapter-nav-btn">Chương trước</button>
                            <select className="chapter-select">
                                <option value="1">Chương 1</option>
                            </select>
                            <button className="chapter-nav-btn">Chương tiếp</button>
                        </div>
                        <div className="chapter-decorations">
                            <span className="decoration">❧</span>
                            <span className="decoration">❦</span>
                        </div>
                    </div>
                    <div className="chapter-content" dangerouslySetInnerHTML={{ __html: content }} />
                </div>
                {/*<div className="chapter-detail">*/}
                {/*    <h1>{title}</h1>*/}
                {/*    <p><a href={`/stories/${story.url_key}.${story.story_id}`}>Back to {story.title}</a></p>*/}
                {/*    <div dangerouslySetInnerHTML={{ __html: content }} />*/}
                {/*</div>*/}
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
                chapter: null,
                categories,
                story: null,
            },
        };
    }

    const chapterId = (Array.isArray(url_key) ? url_key[0] : url_key).split('.').pop();
    if (!chapterId) {
        return {
            props: {
                chapter: null,
                categories,
                story: null,
            },
        };
    }

    const chapter = await fetchChapterDetail(chapterId);
    const story = await fetchStoryDetail(chapter.story_id);

    return {
        props: {
            chapter,
            categories,
            story,
        },
    };
};

export default ChapterDetail;
