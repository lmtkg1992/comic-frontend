// src/pages/stories/[url_key].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchStoryDetailByUrlKey, fetchChapters } from '../../utils/api';
import { Story, Chapter } from '../../types/Chapter';
import TopStories from '../../components/StoryDetail/TopStories';
import StaticCategoryNavigate from '../../components/StaticCategoryNavigate';
const StoryDetail: React.FC = () => {
    const router = useRouter();
    const { url_key } = router.query;

    const [story, setStory] = useState<Story | null>(null);
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [totalChapters, setTotalChapters] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            if (url_key) {
                try {
                    setLoading(true);

                    const fetchedStory = await fetchStoryDetailByUrlKey(url_key as string);
                    if (fetchedStory) {
                        setStory(fetchedStory);

                        const { list: fetchedChapters, total, total_page: fetchedTotalPages } = await fetchChapters(
                            fetchedStory.story_id
                        );
                        setChapters(fetchedChapters);
                        setTotalChapters(total);
                        setTotalPages(fetchedTotalPages);
                    }
                } catch (error) {
                    console.error('Error fetching story details:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [url_key]);

    const handlePageChange = async (page: number) => {
        try {
            const { list: fetchedChapters } = await fetchChapters(story!.story_id, page);
            setChapters(fetchedChapters);
            setCurrentPage(page);
        } catch (error) {
            console.error('Error fetching chapters:', error);
        }
    };

    const renderChaptersInColumns = (chapters: Chapter[], columns: number) => {
        const itemsPerColumn = Math.ceil(chapters.length / columns);
        const chapterColumns = [];

        for (let i = 0; i < columns; i++) {
            chapterColumns.push(
                <ul className="chapter-column" key={i}>
                    {chapters.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn).map((chapter) => (
                        <li key={chapter.chapter_id}>
                            <a href={`/chapters/${story!.url_key}/${chapter.url_key}`}>{chapter.title}</a>
                        </li>
                    ))}
                </ul>
            );
        }

        return chapterColumns;
    };

    const renderPagination = () => {
        const maxPagesToShow = 3;
        const pages = [];
        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(totalPages, currentPage + maxPagesToShow - 1);

        if (startPage > 1) {
            pages.push(
                <a href="#" key="first" onClick={(e) => { e.preventDefault(); handlePageChange(1); }}>&laquo; Đầu &raquo;</a>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <a
                    href="#"
                    key={i}
                    className={currentPage === i ? 'active' : ''}
                    onClick={(e) => { e.preventDefault(); handlePageChange(i); }}
                >
                    {i}
                </a>
            );
        }

        if (endPage < totalPages) {
            pages.push(
                <a href="#" key="last" onClick={(e) => { e.preventDefault(); handlePageChange(totalPages); }}>&laquo; Cuối &raquo;</a>
            );
        }

        return pages;
    };

    const getStatusLabel = (status: string) => {
        if (status === 'completed') return 'Hoàn thành';
        if (status === 'inprogress') return 'Đang tiến hành';
        return status;
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!story) {
        return (
            <main>
                <p>Story not found.</p>
            </main>
        );
    }

    const { title, path_image, author, description, status, categories: storyCategories, source, translator } = story;

    return (
        <div>
            <StaticCategoryNavigate />
            <main className="main-body">
                <div className="container">
                    <div className="story-detail">
                        <div className="left-column">
                            <div className="story-info">
                                <h2>THÔNG TIN TRUYỆN</h2>
                                <div className="story-header">
                                    <div className="story-image">
                                        <img src={path_image} alt={title} />
                                        <div className="story-info">
                                            <p>Tác giả: <a href={`/authors/${author.url_key}`}>{author.author_title}</a></p>
                                            <p>Trạng thái: {getStatusLabel(status)}</p>
                                            <p>Thể loại: {storyCategories.map((category, index) => (
                                                <span key={category.category_id}>
                                                    {index > 0 && ', '}
                                                    <a href={`/categories/${category.url_key}`}>{category.category_name}</a>
                                                </span>
                                            ))}
                                            </p>
                                            <p>Nguồn: {source}</p>
                                            <p>Dịch giả: {translator}</p>
                                        </div>
                                    </div>
                                    <div className="story-content">
                                        <h1 className="story-name">{title}</h1>
                                        <div className="story-description" dangerouslySetInnerHTML={{ __html: description }} />
                                    </div>
                                </div>
                            </div>
                            <div className="chapter-list">
                                <h2>DANH SÁCH CHƯƠNG</h2>
                                <div className="chapter-columns">
                                    {renderChaptersInColumns(chapters, 2)}
                                </div>
                                <div className="pagination">
                                    {renderPagination()}
                                </div>
                            </div>
                        </div>
                        <div className="right-column">
                            <TopStories />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StoryDetail;