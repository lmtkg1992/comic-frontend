// src/utils/api.ts
const API_BASE_URL = process.env.API_BASE_URL;

export const fetchStories = async () => {
    const response = await fetch(`${API_BASE_URL}/stories/list`);
    const data = await response.json();
    return data.data.list;
};

export const fetchCategories = async () => {
    const response = await fetch(`${API_BASE_URL}/categories/list`);
    const data = await response.json();
    return data.data.list;
};

export const fetchStoryDetail = async (storyId: string) => {
    const response = await fetch(`${API_BASE_URL}/stories/detail/${storyId}`);
    const data = await response.json();
    return data;
};

export const fetchChapters = async (storyId: string, page = 1, size = 10) => {
    const response = await fetch(`${API_BASE_URL}/chapters/list/${storyId}?page=${page}&size=${size}`);
    const data = await response.json();
    return data.data.list;
};

export const fetchChapterDetail = async (chapterId: string) => {
    const response = await fetch(`${API_BASE_URL}/chapters/detail/${chapterId}`);
    const data = await response.json();
    return data;
};