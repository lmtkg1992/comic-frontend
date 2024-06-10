import Head from 'next/head';
import { useState, useEffect } from 'react';
import StoryList from '../components/StoryList';
import Header from '../components/Header';

import { Story } from '../types/Story';
import { Category } from '../types/Category';
interface Props {
    stories: Story[];
    categories: Category[];
}
export async function getServerSideProps() {

    const resStories = await fetch('http://localhost:8083/stories/list');
    let stories = await resStories.json();
    stories = stories.data.list;

    const resCategories = await fetch('http://localhost:8083/categories/list');
    let categories = await resCategories.json();
    categories = categories.data.list;

    return {
        props: {
            stories,
            categories
        },
    };
}

// export async function getStaticProps() {
//     const res = await fetch('http://localhost:8083/stories/list');
//     let stories = await res.json();
//     stories = stories.data.list;
//
//     return {
//         props: {
//             stories,
//         },
//         revalidate: 10, // Revalidate every 10 seconds
//     };
// }

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
