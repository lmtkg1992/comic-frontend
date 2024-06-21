// src/pages/chapters/[url_key].tsx
import { GetServerSideProps } from 'next';
import { fetchChapterDetail, fetchStoryDetail } from '../../utils/api';
import { Chapter, Story } from '../../types/Chapter';

interface ChapterDetailProps {
    chapter: Chapter | null;
    story: Story | null;
}

const ChapterDetail: React.FC<ChapterDetailProps> = ({ chapter, story }) => {
    if (!chapter || !story) {
        return (
            <main>
                <p>Chapter not found.</p>
            </main>
        );
    }

    const { title, content } = chapter;

    return (
        <main>
            <div className="chapter-detail">
                <h1>{title}</h1>
                <p><a href={`/stories/${story.url_key}.${story.story_id}`}>Back to {story.title}</a></p>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </main>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { url_key } = context.params || {};
    if (!url_key) {
        return {
            props: {
                chapter: null,
                story: null,
            },
        };
    }

    const chapterId = (Array.isArray(url_key) ? url_key[0] : url_key).split('.').pop();
    if (!chapterId) {
        return {
            props: {
                chapter: null,
                story: null,
            },
        };
    }

    const chapter = await fetchChapterDetail(chapterId);
    const story = await fetchStoryDetail(chapter.story_id);

    return {
        props: {
            chapter,
            story,
        },
    };
};

export default ChapterDetail;
