import { useEffect, useState } from 'react';
import { fetchCategoriesByType } from '../utils/api';
import { Category } from '../types/Category';

interface CategorySideBarProps {
    typeCategory: string;
}

const CategorySideBar: React.FC<CategorySideBarProps> = ({ typeCategory }) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await fetchCategoriesByType(typeCategory);
            setCategories(fetchedCategories);
        };

        fetchCategories();
    }, [typeCategory]);

    return (
        <div className="category-list">
            <div className="category-title">
                <h4>THỂ LOẠI TRUYỆN</h4>
                <div className="category-list-item">
                    <div className="category-column">
                        {categories.slice(0, Math.ceil(categories.length / 2)).map(cat => (
                            <a href={`/categories/${cat.url_key}`} key={cat.category_id}>{cat.title}</a>
                        ))}
                    </div>
                    <div className="category-column">
                        {categories.slice(Math.ceil(categories.length / 2)).map(cat => (
                            <a href={`/categories/${cat.url_key}`} key={cat.category_id}>{cat.title}</a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategorySideBar;