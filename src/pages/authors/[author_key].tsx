// src/pages/authors/[author_key].tsx
import { GetServerSideProps } from 'next';
import { fetchAuthorDetailByUrlKey, fetchStoriesByAuthor, fetchCategories } from '../../utils/api';
import { Story } from '../../types/Chapter';
import { Category } from '../../types/Category';
import CategoryNavigate from '../../components/CategoryNavigate';
import StoryList from '../../components/StoryList';
import CategorySideBar from "@/src/components/CategorySideBar";

interface AuthorDetailProps {
    author: any | null;
    stories: Story[];
    categories: Category[];
    totalPages: number;
    currentPage: number;
}

const AuthorDetail: React.FC<AuthorDetailProps> = ({ author, stories, categories, totalPages, currentPage }) => {
    if (!author) {
        return (
            <main>
                <p>Author not found.</p>
            </main>
        );
    }

    const handlePageChange = async (page: number) => {
        // Implement the page change logic here if needed
    };

    const authorDescription = author.description ? author.description : `Danh sách truyện của tác giả ${author.title}`;

    return (
        <div>
            <CategoryNavigate categories={categories} />
            <main className="main-body">
                <div className="container">
                    <div className="category-detail">
                        <div className="left-column">
                            <h2>{author.title}</h2>
                            <StoryList stories={stories} />
                        </div>
                        <div className="right-column">
                            <div className="category-info">
                                {authorDescription}
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
                stories: [],
                categories: [],
                totalPages: 0,
                currentPage: 1,
            },
        };
    }

    const author = await fetchAuthorDetailByUrlKey(author_key as string);
    if (!author) {
        return {
            props: {
                author: null,
                stories: [],
                categories: [],
                totalPages: 0,
                currentPage: 1,
            },
        };
    }

    const categories = await fetchCategories();
    const { list: stories, total_page: totalPages } = await fetchStoriesByAuthor(author.author_id, 1, 10);

    return {
        props: {
            author,
            stories,
            categories,
            totalPages,
            currentPage: 1,
        },
    };
};

export default AuthorDetail;