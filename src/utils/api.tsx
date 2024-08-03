// src/utils/api.ts
const API_BASE_URL = 'http://localhost:8083';

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

export const fetchStoryDetailByUrlKey = async (urlKey: string) => {
    const response = await fetch(`${API_BASE_URL}/stories/detail_by_url_key/${urlKey}`);
    const data = await response.json();
    return data;
};

export const fetchChapters = async (storyId: string, page = 1, size = 50) => {
    const response = await fetch(`${API_BASE_URL}/chapters/list/${storyId}?page=${page}&size=${size}`);
    const data = await response.json();
    return data.data;
};

export const fetchChapterDetail = async (storyId: string, ordered: string) => {
    const response = await fetch(`${API_BASE_URL}/chapters/detail/${storyId}/${ordered}`);
    const data = await response.json();
    return data;
};

export const fetchChapterDetailByUrl = async (storyKey: string, chapterKey: string) => {
    const response = await fetch(`${API_BASE_URL}/chapters/detail_by_url/${storyKey}/${chapterKey}`);
    const data = await response.json();
    return data;
};