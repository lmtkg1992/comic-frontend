// src/pages/authors/[author_key].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchAuthorDetailByUrlKey, fetchStoriesByAuthor } from '../../utils/api';
import { Story } from '../../types/Chapter';   
import StoryList from '../../components/StoryList';
import { STORIES_PER_PAGE } from '../../utils/config';
import StaticCategorySideBar from '../../components/StaticCategorySideBar'; 
import StaticCategoryNavigate from '@/src/components/StaticCategoryNavigate';

const AuthorDetail: React.FC = () => {
    const router = useRouter();
    const { author_key } = router.query;

    const [author, setAuthor] = useState<any | null>(null);
    const [stories, setStories] = useState<Story[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch categories and author details when the page loads or when author_key changes
    useEffect(() => {
        if (!author_key) return;

        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch author details
                const authorData = await fetchAuthorDetailByUrlKey(author_key as string);
                setAuthor(authorData);

                // Fetch stories by author for the first page
                const { list, total_page } = await fetchStoriesByAuthor(authorData.author_id, 1, STORIES_PER_PAGE);
                setStories(list);
                setTotalPages(total_page);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching author details or stories:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [author_key]);

    // The fetchStories method now returns the data in the format expected by StoryList.
    const fetchStories = async (page: number) => {
        try {
            const { list, total_page } = await fetchStoriesByAuthor(author.author_id, page, STORIES_PER_PAGE);
            return {
                list,
                total_page,
            };
        } catch (error) {
            console.error('Error fetching stories:', error);
            return {
                list: [],
                total_page: 0,
            };
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!author) {
        return (
            <main>
                <p>Author not found.</p>
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
                            <h2>{author.title}</h2>
                            <StoryList
                                fetchMethod={fetchStories}
                                initialStories={stories}
                                initialTotalPages={totalPages}
                            />
                        </div>
                        <div className="right-column">
                            <div className="category-info">
                                {`Danh sách truyện của tác giả ${author.title}`}
                            </div>
                            <StaticCategorySideBar typeCategory="category" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AuthorDetail;