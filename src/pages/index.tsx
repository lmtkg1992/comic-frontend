import Head from 'next/head';
import { useState, useEffect } from 'react';
import StoryList from '../components/StoryList';
import Header from '../components/Header';
import { fetchStories, fetchCategories } from '../utils/api';

import { Story } from '../types/Story';
import { Category } from '../types/Category';
interface Props {
    stories: Story[];
    categories: Category[];
}
export async function getServerSideProps() {

    const stories = await fetchStories();
    const categories = await fetchCategories();

    return {
        props: {
            stories,
            categories
        },
    };
}

const HomePage: React.FC<Props> = ({stories, categories}) => {
    return (
        // <StoryList stories={stories} />
        <body>
        <Header categories={categories} />
        <main className="main-body">
            <div className="container">
                <div className="hot-story">
                    <div className="title-list">TRUYỆN HOT</div>
                    <StoryList stories={stories} />
                </div>
                <div className="full-story">
                    <div className="title-list">TRUYỆN HOÀN THÀNH</div>
                    <StoryList stories={stories} />
                </div>
                <div className="full-story">
                    <div className="title-list">TRUYỆN CẬP NHẬT HAY</div>
                    <StoryList stories={stories} />
                </div>
            </div>
        </main>
        </body>
    );
};
export default HomePage;
