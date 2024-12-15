// pages/index.tsx
import HotStories from '@/src/components/HomePage/HotStories';
import LatestStories from '@/src/components/HomePage/LatestStories';
import FullStories from '@/src/components/HomePage/FullStories';
import CategorySideBar from '../components/CategorySideBar';
import StaticCategoryNavigate from '../components/StaticCategoryNavigate';

const HomePage: React.FC = () => {

    return (
        <div>
            <StaticCategoryNavigate />
            <main className="main-body">
                <div className="container">
                    <div className="homepage">
                        <div className="container-row">
                            <div className="full-column">
                                <HotStories />
                            </div>
                        </div>
                        <div className="container-row">
                            <div className="left-column">
                                <LatestStories />
                            </div>
                            <div className="right-column">
                                <CategorySideBar typeCategory="category" />
                            </div>
                        </div>
                        <div className="container-row">
                            <div className="full-column">
                                <FullStories />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomePage;