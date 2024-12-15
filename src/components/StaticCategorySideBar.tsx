import { Category } from '../types/Category';
import categoriesData from '../data/categories.json'; // Assuming you pre-fetch and save to JSON

interface StaticCategorySideBarProps {
    typeCategory: string;
}

const StaticCategorySideBar: React.FC<StaticCategorySideBarProps> = ({ typeCategory }) => {
    const filteredCategories = categoriesData.filter(
        (category) => category.type_category === typeCategory
    );

    return (
        <div className="category-list">
            <div className="category-title">
                <h4>THỂ LOẠI TRUYỆN</h4>
                <div className="category-list-item">
                    <div className="category-column">
                        {filteredCategories
                            .slice(0, Math.ceil(filteredCategories.length / 2))
                            .map((cat) => (
                                <a href={`/categories/${cat.url_key}`} key={cat.category_id}>
                                    {cat.title}
                                </a>
                            ))}
                    </div>
                    <div className="category-column">
                        {filteredCategories
                            .slice(Math.ceil(filteredCategories.length / 2))
                            .map((cat) => (
                                <a href={`/categories/${cat.url_key}`} key={cat.category_id}>
                                    {cat.title}
                                </a>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaticCategorySideBar;