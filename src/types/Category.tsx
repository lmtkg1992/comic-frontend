// Define the Category type
export interface Category {
    category_id: string;
    title: string;
    type_category: string;
}

// Define the Category type
export interface CategoryListProps {
    categories: Category[];
}