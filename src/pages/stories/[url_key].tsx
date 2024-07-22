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
            <main className="main-body">
                <div className="container">
                    <div className="story-detail">
                        <div className="left-column">
                            <div className="story-info">
                                <h2>THÔNG TIN TRUYỆN</h2>
                                <div className="story-header">
                                    <div className="story-image">
                                            <img src={path_image} alt={title} />
                                            <p>Author: {author}</p>
                                            <p>Status: {status}</p>
                                    </div>
                                    <div className="story-content">
                                        <h1 className="story-name">{title}</h1>
                                        <div className="story-description" dangerouslySetInnerHTML={{ __html: description }} />
                                    </div>
                                </div>
                            </div>
                            <div className="chapter-list">
                                <h2>DANH SÁCH CHƯƠNG</h2>
                                <ul>
                                    {chapters.map((chapter) => (
                                        <li key={chapter.chapter_id}>
                                            <a href={`/chapters/${story.url_key}.${story.story_id}/chuong-${chapter.ordered}`}>{chapter.title}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="right-column">
                            <div className="top-story">
                                <h2>TRUYỆN ĐANG HOT</h2>
                                <div className="top-story-filter">
                                    <div className="active">Ngày</div>
                                    <div>Tháng</div>
                                    <div>All time</div>
                                </div>
                                <div className="top-story-item">
                                    <div>
                                        <div className="top-story-num">1</div>
                                        <div className="top-story-num-title">
                                            <h3>
                                                <a href="https://truyenfull.vn/than-dao-dan-ton-6060282/" title="Thần Đạo Đan Tôn">Thần Đạo Đan Tôn</a>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="top-story-item">
                                    <div>
                                        <div className="top-story-num">2</div>
                                        <div className="top-story-num-title">
                                            <h3>
                                                <a href="https://truyenfull.vn/than-dao-dan-ton-6060282/" title="Thần Đạo Đan Tôn">Thần Đạo Đan Tôn</a>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
