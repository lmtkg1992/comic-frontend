// src/pages/search/[key_word].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchStoriesByTitle } from '../../utils/api';
import { Story } from '../../types/Chapter';
import StaticCategoryNavigate from '../../components/StaticCategoryNavigate';
import StaticCategorySideBar from '../../components/StaticCategorySideBar';
import StoryList from '../../components/StoryList';
import { STORIES_PER_PAGE } from '../../utils/config';

const SearchResults: React.FC = () => {
    const router = useRouter();
    const { key_word } = router.query;

    const [stories, setStories] = useState<Story[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            if (key_word) {
                try {
                    setLoading(true);

                    const { list: fetchedStories, total_page: fetchedTotalPages } = await fetchStoriesByTitle(
                        key_word as string,
                        1,
                        STORIES_PER_PAGE
                    );
                    setStories(fetchedStories);
                    setTotalPages(fetchedTotalPages);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [key_word]);

    const fetchStories = (page: number) => fetchStoriesByTitle(key_word as string, page, STORIES_PER_PAGE);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!stories.length) {
        return (
            <main>
                <p>No stories found for "{key_word}".</p>
            </main>
        );
    }

    return (
        <div>
            <StaticCategoryNavigate />
            <main className="main-body">
                <div className="container">
                    <div className="category-detail">
                        <div className="left-column">
                            <h2>KẾT QUẢ TÌM KIẾM CHO TỪ KHÓA: {key_word}</h2>
                            <StoryList
                                fetchMethod={fetchStories}
                                initialStories={stories}
                                initialTotalPages={totalPages}
                            />
                        </div>
                        <div className="right-column">
                            <div className="category-info">
                                {`Danh sách truyện phù hợp với từ khóa "${key_word}"`}
                            </div>
                            <StaticCategorySideBar typeCategory="category" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SearchResults;