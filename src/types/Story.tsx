// src/types/Story.tsx
export interface Story {
    story_id: string;
    increment_id: number;
    title: string;
    url_key: string;
    path_image: string;
    author: string;
    description: string;
    publish_date: string;
    status: string;
}

export interface StoryListProps {
    stories: Story[];
}
