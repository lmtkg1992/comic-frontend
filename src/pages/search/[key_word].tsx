// src/pages/search/[key_word].tsx
import { GetServerSideProps } from 'next';
import { fetchStoriesByTitle, fetchCategories } from '../../utils/api';
import { Story } from '../../types/Chapter';
import { Category } from '../../types/Category';
import CategoryNavigate from '../../components/CategoryNavigate';
import StoryList from '../../components/StoryList';
import CategorySideBar from '../../components/CategorySideBar';

interface SearchResultsProps {
    key_word: string;
    stories: Story[];
    categories: Category[];
    totalPages: number;
    currentPage: number;
}

const SearchResults: React.FC<SearchResultsProps> = ({ key_word, stories, categories, totalPages, currentPage }) => {
    if (!stories || stories.length === 0) {
        return (
            <main>
                <p>No results found for "{key_word}".</p>
            </main>
        );
    }

    const handlePageChange = async (page: number) => {
        // Implement the page change logic here if needed
    };

    const categoryDescription = `Danh sách truyện phù hợp với từ khóa ${key_word}`;

    return (
        <div>
            <CategoryNavigate categories={categories} />
            <main className="main-body">
                <div className="container">
                    <div className="category-detail">
                        <div className="left-column">
                            <h2>KẾT QUẢ TÌM KIẾM CHO TỪ KHÓA: {key_word}</h2>
                            <StoryList stories={stories} />
                        </div>
                        <div className="right-column">
                            <div className="category-info">
                                {categoryDescription}
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
    const { key_word } = context.params || {};
    if (!key_word) {
        return {
            props: {
                key_word: '',
                stories: [],
                categories: [],
                totalPages: 0,
                currentPage: 1,
            },
        };
    }

    const categories = await fetchCategories();
    const { list: stories, total_page: totalPages } = await fetchStoriesByTitle(key_word as string, 1, 10);

    return {
        props: {
            key_word,
            stories,
            categories,
            totalPages,
            currentPage: 1,
        },
    };
};

export default SearchResults;