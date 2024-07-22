// src/pages/chapters/[story_key]/[chapter_key].tsx
import { GetServerSideProps } from 'next';
import { fetchChapterDetail, fetchStoryDetail, fetchCategories } from '../../../utils/api';
import { Chapter, Story } from '../../../types/Chapter';
import CategoryNavigate from '../../../components/CategoryNavigate';
import { Category } from '../../../types/Category';

interface ChapterDetailProps {
    chapter: Chapter | null;
    categories: Category[];
    story: Story | null;
}

const ChapterDetail: React.FC<ChapterDetailProps> = ({ chapter, categories, story }) => {
    if (!chapter || !story) {
        return (
            <main>
                <p>Chapter not found.</p>
            </main>
        );
    }

    const { title, content, ordered } = chapter;

    return (
        <div>
            <CategoryNavigate categories={categories} />
            <main className="main-body">
                <div className="container">
                    <div className="chapter-header">
                        <h1 className="story-title">
                            <a href={`/stories/${story.url_key}.${story.story_id}`}>{story.title}</a>
                        </h1>
                        <h2 className="chapter-title">{title}</h2>
                        <div className="chapter-navigation">
                            <button
                                className="chapter-nav-btn"
                                disabled={ordered <= 1}
                                onClick={() =>
                                    window.location.href = `/chapters/${story.url_key}.${story.story_id}/chuong-${ordered - 1}`
                                }
                            >
                                Chương trước
                            </button>
                            <select
                                className="chapter-select"
                                value={ordered}
                                onChange={(e) =>
                                    window.location.href = `/chapters/${story.url_key}.${story.story_id}/chuong-${e.target.value}`
                                }
                            >
                                {[...Array(story.total_chapters)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        Chương {i + 1}
                                    </option>
                                ))}
                            </select>
                            <button
                                className="chapter-nav-btn"
                                disabled={ordered >= story.total_chapters}
                                onClick={() =>
                                    window.location.href = `/chapters/${story.url_key}.${story.story_id}/chuong-${ordered + 1}`
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
            },
        };
    }

    const storyKey = Array.isArray(story_key) ? story_key[0] : story_key;
    const chapterKey = Array.isArray(chapter_key) ? chapter_key[0] : chapter_key;

    const storyId = storyKey.split('.')[1];
    const ordered = chapterKey.replace('chuong-', '');

    if (!storyId || !ordered) {
        return {
            props: {
                chapter: null,
                categories,
                story: null,
            },
        };
    }

    const chapter = await fetchChapterDetail(storyId, ordered);
    const story = await fetchStoryDetail(storyId);

    return {
        props: {
            chapter,
            categories,
            story,
        },
    };
};

export default ChapterDetail;