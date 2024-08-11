// src/pages/search/[key_word].tsx
import { GetServerSideProps } from 'next';
import { fetchStoriesByTitle, fetchCategories } from '../../utils/api';
import { Story } from '../../types/Chapter';
import { Category } from '../../types/Category';
import CategoryNavigate from '../../components/CategoryNavigate';
import StoryList from '../../components/StoryList';
import CategorySideBar from '../../components/CategorySideBar';
import { STORIES_PER_PAGE } from '../../utils/config';

interface SearchResultsProps {
    key_word: string;
    initialStories: Story[];
    categories: Category[];
    initialTotalPages: number;
}

const SearchResults: React.FC<SearchResultsProps> = ({ key_word, initialStories, categories, initialTotalPages }) => {
    const fetchStories = (page: number) => fetchStoriesByTitle(key_word, page, STORIES_PER_PAGE);

    return (
        <div>
            <CategoryNavigate categories={categories} />
            <main className="main-body">
                <div className="container">
                    <div className="category-detail">
                        <div className="left-column">
                            <h2>KẾT QUẢ TÌM KIẾM CHO TỪ KHÓA: {key_word}</h2>
                            <StoryList
                                fetchMethod={fetchStories}
                                initialStories={initialStories}
                                initialTotalPages={initialTotalPages}
                            />
                        </div>
                        <div className="right-column">
                            <div className="category-info">
                                {`Danh sách truyện phù hợp với từ khóa ${key_word}`}
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
                initialStories: [],
                categories: [],
                initialTotalPages: 0,
            },
        };
    }

    const categories = await fetchCategories();
    const { list: initialStories, total_page: initialTotalPages } = await fetchStoriesByTitle(key_word as string, 1, STORIES_PER_PAGE);

    return {
        props: {
            key_word,
            initialStories,
            categories,
            initialTotalPages,
        },
    };
};

export default SearchResults;