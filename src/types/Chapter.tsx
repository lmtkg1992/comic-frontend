// src/types/Chapter.tsx
export interface Chapter {
    chapter_id: string;
    story_id: string;
    title: string;
    url_key: string;
    content: string;
    ordered: number;
}

export interface Story {
    story_id: string;
    increment_id: number;
    title: string;
    url_key: string;
    is_active: boolean;
    path_image: string;
    author: {
        author_id: string;
        author_title: string;
        url_key: string;
    };
    description: string;
    publish_date: string;
    updated_date: string;
    status: string;
    is_full: boolean;
    is_hot: boolean;
    total_chapters: number;
    source: string;
    translator: string;
    categories: {
        category_id: string;
        category_name: string;
        url_key: string;
    }[];
}
