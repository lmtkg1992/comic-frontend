// Define the Story type
export interface Story {
    story_id: string;
    title: string;
    description: string;
}

// Define the Story type
export interface StoryListProps {
    stories: Story[];
};