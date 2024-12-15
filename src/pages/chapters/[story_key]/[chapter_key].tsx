// src/pages/chapters/[story_key]/[chapter_key].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchChapterDetailByUrl, fetchStoryDetailByUrlKey, fetchChapters } from '../../../utils/api';
import { Chapter, Story } from '../../../types/Chapter';
import StaticCategoryNavigate from '../../../components/StaticCategoryNavigate';

const ChapterDetail: React.FC = () => {
    const router = useRouter();
    const { story_key, chapter_key } = router.query;

    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [story, setStory] = useState<Story | null>(null);
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            if (story_key && chapter_key) {
                try {
                    setLoading(true);

                    const fetchedStory = await fetchStoryDetailByUrlKey(story_key as string);
                    setStory(fetchedStory);

                    const fetchedChapter = await fetchChapterDetailByUrl(story_key as string, chapter_key as string);
                    setChapter(fetchedChapter);

                    if (fetchedStory) {
                        const { list: fetchedChapters } = await fetchChapters(fetchedStory.story_id, 1, fetchedStory.total_chapters);
                        setChapters(fetchedChapters);
                    }

                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [story_key, chapter_key]);

    if (loading) {
        return <p>Loading...</p>;
    }

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
            <StaticCategoryNavigate />
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

export default ChapterDetail;