// src/pages/chapters/[story_key]/[chapter_key].tsx
import { GetServerSideProps } from 'next';
import { fetchChapterDetailByUrl, fetchStoryDetailByUrlKey, fetchCategories, fetchChapters } from '../../../utils/api';
import { Chapter, Story } from '../../../types/Chapter';
import CategoryNavigate from '../../../components/CategoryNavigate';
import { Category } from '../../../types/Category';

interface ChapterDetailProps {
    chapter: Chapter | null;
    categories: Category[];
    story: Story | null;
    chapters: Chapter[];
}

const ChapterDetail: React.FC<ChapterDetailProps> = ({ chapter, categories, story, chapters }) => {
    if (!chapter || !story) {
        return (
            <main>
                <p>Chapter not found.</p>
            </main>
        );
    }

    const { title, content, ordered, short_title } = chapter;

    return (
        <div>
            <CategoryNavigate categories={categories} />
            <main className="main-body">
                <div className="container">
                    <div className="chapter-header">
                        <h1 className="story-title">
                            <a href={`/stories/${story.url_key}`}>{story.title}</a>
                        </h1>
                        <h2 className="chapter-title">{title}</h2>
                        <div className="chapter-navigation">
                            <button
                                className="chapter-nav-btn"
                                disabled={ordered <= 1}
                                onClick={() =>
                                    window.location.href = `/chapters/${story.url_key}/${chapters[ordered - 2].url_key}`
                                }
                            >
                                Chương trước
                            </button>
                            <select
                                className="chapter-select"
                                value={ordered}
                                onChange={(e) =>
                                    window.location.href = `/chapters/${story.url_key}/${chapters[parseInt(e.target.value) - 1].url_key}`
                                }
                            >
                                {chapters.map((chapter, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {chapter.short_title}
                                    </option>
                                ))}
                            </select>
                            <button
                                className="chapter-nav-btn"
                                disabled={ordered >= story.total_chapters}
                                onClick={() =>
                                    window.location.href = `/chapters/${story.url_key}/${chapters[ordered].url_key}`
                                }
                            >
                                Chương tiếp
                            </button>
                        </div>
                        <div className="chapter-decorations">
                            <span className="decoration">❧</span>
                            <span className="decoration">❦</span>
                        </div>
                    </div>
                    <div className="chapter-content" dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </main>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const categories = await fetchCategories();

    const { story_key, chapter_key } = context.params || {};
    if (!story_key || !chapter_key) {
        return {
            props: {
                chapter: null,
                categories,
                story: null,
                chapters: [],
            },
        };
    }

    const storyKey = Array.isArray(story_key) ? story_key[0] : story_key;
    const chapterKey = Array.isArray(chapter_key) ? chapter_key[0] : chapter_key;

    const story = await fetchStoryDetailByUrlKey(storyKey);
    const chapter = await fetchChapterDetailByUrl(storyKey, chapterKey);
    const { list: chapters } = await fetchChapters(story.story_id,1,story.total_chapters);

    return {
        props: {
            chapter,
            categories,
            story,
            chapters,
        },
    };
};

export default ChapterDetail;