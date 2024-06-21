// src/utils/api.ts
const BASE_URL = 'http://localhost:8083';

export const fetchStories = async () => {
    const response = await fetch(`${BASE_URL}/stories/list`);
    const data = await response.json();
    return data.data.list;
};

export const fetchCategories = async () => {
    const response = await fetch(`${BASE_URL}/categories/list`);
    const data = await response.json();
    return data.data.list;
};