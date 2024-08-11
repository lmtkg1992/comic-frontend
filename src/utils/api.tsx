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

export const fetchCategoryDetailByUrlKey = async (urlKey: string) => {
    const response = await fetch(`${API_BASE_URL}/categories/detail_by_url_key/${urlKey}`);
    const data = await response.json();
    return data;
};

export const fetchCategoriesByType = async (typeCategory: string) => {
    const response = await fetch(`${API_BASE_URL}/categories/list?type_category=${typeCategory}`);
    const data = await response.json();
    return data.data.list;
};

export const fetchStoriesByCategory = async (categoryId: string, page = 1, size = 10) => {
    const response = await fetch(`${API_BASE_URL}/stories/list_by_category/${categoryId}?page=${page}&size=${size}`);
    const data = await response.json();
    return data.data;
};

export const fetchStoryDetailByUrlKey = async (urlKey: string) => {
    const response = await fetch(`${API_BASE_URL}/stories/detail_by_url_key/${urlKey}`);
    const data = await response.json();
    return data;
};

export const fetchChapterDetailByUrl = async (storyKey: string, chapterKey: string) => {
    const response = await fetch(`${API_BASE_URL}/chapters/detail_by_url/${storyKey}/${chapterKey}`);
    const data = await response.json();
    return data;
};

export const fetchChapters = async (storyId: string, page = 1, size = 50) => {
    const response = await fetch(`${API_BASE_URL}/chapters/list/${storyId}?page=${page}&size=${size}`);
    const data = await response.json();
    return data.data;
};

export const fetchAuthorDetailByUrlKey = async (urlKey: string) => {
    const response = await fetch(`${API_BASE_URL}/authors/detail_by_url_key/${urlKey}`);
    const data = await response.json();
    return data;
};

export const fetchStoriesByAuthor = async (authorId: string, page = 1, size = 10) => {
    const response = await fetch(`${API_BASE_URL}/stories/list?author_id=${authorId}&page=${page}&size=${size}`);
    const data = await response.json();
    return data.data;
};

export const fetchStoriesByTitle = async (title: string, page = 1, size = 10) => {
    const response = await fetch(`${API_BASE_URL}/stories/list?title=${title}&page=${page}&size=${size}`);
    const data = await response.json();
    return data.data;
};