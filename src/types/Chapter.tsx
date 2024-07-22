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
    title: string;
    url_key: string;
    total_chapters: number;
}