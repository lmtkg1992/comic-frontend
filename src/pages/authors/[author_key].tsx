// src/pages/authors/[author_key].tsx
import { GetServerSideProps } from 'next';
import { fetchAuthorDetailByUrlKey, fetchStoriesByAuthor, fetchCategories } from '../../utils/api';
import { Story } from '../../types/Chapter';
import { Category } from '../../types/Category';
import CategoryNavigate from '../../components/CategoryNavigate';
import StoryList from '../../components/StoryList';
import CategorySideBar from '../../components/CategorySideBar';
import { STORIES_PER_PAGE } from '../../utils/config';

interface AuthorDetailProps {
    author: any | null;
    initialStories: Story[];
    categories: Category[];
    initialTotalPages: number;
}

const AuthorDetail: React.FC<AuthorDetailProps> = ({ author, initialStories, categories, initialTotalPages }) => {
    if (!author) {
        return (
            <main>
                <p>Author not found.</p>
            </main>
        );
    }

    const fetchStories = (page: number) => fetchStoriesByAuthor(author.author_id, page, STORIES_PER_PAGE);

    return (
        <div>
            <CategoryNavigate categories={categories} />
            <main className="main-body">
                <div className="container">
                    <div className="category-detail">
                        <div className="left-column">
                            <h2>{author.title}</h2>
                            <StoryList
                                fetchMethod={fetchStories}
                                initialStories={initialStories}
                                initialTotalPages={initialTotalPages}
                            />
                        </div>
                        <div className="right-column">
                            <div className="category-info">
                                {`Danh sách truyện của tác giả ${author.title}`}
                            </div>
                            <CategorySideBar typeCategory="category" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { author_key } = context.params || {};
    if (!author_key) {
        return {
            props: {
                author: null,
                initialStories: [],
                categories: [],
                initialTotalPages: 0,
            },
        };
    }

    const author = await fetchAuthorDetailByUrlKey(author_key as string);
    const categories = await fetchCategories();
    const { list: initialStories, total_page: initialTotalPages } = await fetchStoriesByAuthor(author.author_id, 1, STORIES_PER_PAGE);

    return {
        props: {
            author,
            initialStories,
            categories,
            initialTotalPages,
        },
    };
};

export default AuthorDetail;