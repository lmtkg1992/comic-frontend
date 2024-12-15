import CategoryNavigate from './CategoryNavigate';
import { Category } from '../types/Category';
import categoriesData from '../data/categories.json';

const StaticCategoryNavigate: React.FC = () => {
    const categories: Category[] = categoriesData;

    return <CategoryNavigate categories={categories} />;
};

export default StaticCategoryNavigate;