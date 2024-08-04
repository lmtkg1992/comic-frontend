// src/types/Category.tsx
export interface Category {
    category_id: string;
    increment_id: number;
    title: string;
    url_key: string;
    priority: number;
    type_category: string;
    description: string;
}

export interface CategoryListProps {
    categories: Category[];
}