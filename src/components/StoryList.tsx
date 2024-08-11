// src/components/StoryList.tsx
import { useState } from 'react';
import { Story } from '../types/Chapter';

interface StoryListProps {
    initialStories: Story[];
    initialTotalPages: number;
    fetchMethod: (page: number) => Promise<{ list: Story[]; total_page: number }>;
}

const StoryList: React.FC<StoryListProps> = ({ initialStories, initialTotalPages, fetchMethod }) => {
    const [stories, setStories] = useState<Story[]>(initialStories);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(initialTotalPages);

    const handlePageChange = async (page: number) => {
        const { list: newStories, total_page: newTotalPages } = await fetchMethod(page);
        setStories(newStories);
        setCurrentPage(page);
        setTotalPages(newTotalPages);
    };

    const renderPagination = () => {
        const maxPagesToShow = 3;
        const pages = [];
        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(totalPages, currentPage + 1);

        if (currentPage > 1) {
            pages.push(
                <button key="prev" onClick={() => handlePageChange(currentPage - 1)}>
                    &lt;
                </button>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={i === currentPage ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }

        if (currentPage < totalPages) {
            pages.push(
                <button key="next" onClick={() => handlePageChange(currentPage + 1)}>
                    &gt;
                </button>
            );
        }

        return pages;
    };

    return (
        <div>
            {stories.length > 0 ? (
                <div className="story-list">
                    {stories.map((story) => (
                        <div className="story-item" key={story.story_id}>
                            <a href={`/stories/${story.url_key}`}>
                                <img src={story.path_image} alt={story.title} />
                            </a>
                            <div className="story-info">
                                <h3 className="story-title">
                                    <a href={`/stories/${story.url_key}`}>{story.title}</a>
                                    <span className="story-tags">
                                        {story.is_full && <span className="tag tag-full">Full</span>}
                                        {story.is_hot && <span className="tag tag-hot">Hot</span>}
                                    </span>
                                </h3>
                                <p className="story-author">
                                    <a href={`/authors/${story.author.url_key}`}>{story.author.author_title}</a>
                                </p>
                            </div>
                            {story.last_chapter && (
                                <div className="story-chapters">
                                    <a href={`/chapters/${story.url_key}/${story.last_chapter.url_key}`}>
                                        {story.last_chapter.title}
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>Không tìm thấy truyện nào trong danh sách.</p>
            )}
            <div className="pagination">{renderPagination()}</div>
        </div>
    );
};

export default StoryList;