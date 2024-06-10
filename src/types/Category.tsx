// Define the Category type
export interface Category {
    category_id: string;
    name: string;
    type_category: string;
}

// Define the Category type
export interface CategoryListProps {
    categories: Category[];
}