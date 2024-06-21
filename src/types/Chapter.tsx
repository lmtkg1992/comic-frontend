// src/types/Chapter.tsx
export interface Chapter {
    chapter_id: string;
    story_id: string;
    title: string;
    url_key: string;
    content: string;
}

export interface Story {
    story_id: string;
    title: string;
    url_key: string;
}
