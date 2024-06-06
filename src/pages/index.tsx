import Head from 'next/head';
import { useState, useEffect } from 'react';
import StoryList from '../components/StoryList';
import { Story, StoryListProps } from '../types/Story';

export async function getServerSideProps() {
    // Gọi API và lấy dữ liệu trên server
    const res = await fetch('http://localhost:8083/stories/list');
    let stories = await res.json();
    stories = stories.data.list;

    return {
        props: {
            stories,
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

const HomePage: React.FC<StoryListProps> = ({ stories }) => {
    return (
        // <StoryList stories={stories} />
        <body>
        <header className="header">
            <div className="container">
                <h1 className="logo"><a href="#"><span>YÊU TRUYỆN</span></a></h1>
                <nav className="header-nav">
                    <ul>
                        <li className="dropdown">
                            <a href="#">
                                <div className="header-nav-item">
                                    <span className="header-nav-item-text glyphicon glyphicon-th">Danh sách</span>
                                    <span className="chevron glyphicon glyphicon-chevron-down"></span>
                                </div>
                            </a>
                            <div className="dropdown-menu">
                                <div className="dropdown-row">
                                    <div className="dropdown-column">
                                        <ul className="">
                                            <li>
                                                <a href="https://truyenfull.vn/danh-sach/truyen-hot/" title="Truyện Hot">Truyện Hot</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/danh-sach/truyen-full/" title="Truyện Full">Truyện Full</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/danh-sach/tien-hiep-hay/" title="Tiên Hiệp Hay">Tiên Hiệp Hay</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/danh-sach/kiem-hiep-hay/" title="Kiếm Hiệp Hay">Kiếm Hiệp Hay</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/danh-sach/truyen-teen-hay/" title="Truyện Teen Hay">Truyện Teen Hay</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/danh-sach/ngon-tinh-hay/" title="Ngôn Tình Hay">Ngôn Tình Hay</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/danh-sach/ngon-tinh-nguoc/" title="Ngôn Tình Ngược">Ngôn Tình Ngược</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/danh-sach/ngon-tinh-sung/" title="Ngôn Tình Sủng">Ngôn Tình Sủng</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/danh-sach/ngon-tinh-hai/" title="Ngôn Tình Hài">Ngôn Tình Hài</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/danh-sach/dam-my-hai/" title="Đam Mỹ Hài">Đam Mỹ Hài</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/danh-sach/dam-my-hay/" title="Đam Mỹ Hay">Đam Mỹ Hay</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/danh-sach/dam-my-h-van/" title="Đam Mỹ H Văn">Đam Mỹ H Văn</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/danh-sach/dam-my-sac/" title="Đam Mỹ Sắc">Đam Mỹ Sắc</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="dropdown">
                            <a href="#">
                                <div className="header-nav-item">
                                    <span className="header-nav-item-text glyphicon glyphicon-th">Thể loại</span>
                                    <div className="chevron glyphicon glyphicon-chevron-down"></div>
                                </div>
                            </a>
                            <div className="dropdown-menu">
                                <div className="dropdown-row">
                                    <div className="dropdown-column">
                                        <ul className="">
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/tien-hiep/" title="Truyện Tiên Hiệp">Tiên Hiệp</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/kiem-hiep/" title="Truyện Kiếm Hiệp">Kiếm Hiệp</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/ngon-tinh/" title="Truyện Ngôn Tình">Ngôn Tình</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/dam-my/" title="Truyện Đam Mỹ">Đam Mỹ</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/quan-truong/" title="Truyện Quan Trường">Quan Trường</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/vong-du/" title="Truyện Võng Du">Võng Du</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/khoa-huyen/" title="Truyện Khoa Huyễn">Khoa Huyễn</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/he-thong/" title="Truyện Hệ Thống">Hệ Thống</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/huyen-huyen/" title="Truyện Huyền Huyễn">Huyền Huyễn</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/di-gioi/" title="Truyện Dị Giới">Dị Giới</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/di-nang/" title="Truyện Dị Năng">Dị Năng</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/quan-su/" title="Truyện Quân Sự">Quân Sự</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/lich-su/" title="Truyện Lịch Sử">Lịch Sử</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="dropdown-column">
                                        <ul className="">
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/xuyen-khong/" title="Truyện Xuyên Không">Xuyên Không</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/xuyen-nhanh/" title="Truyện Xuyên Nhanh">Xuyên Nhanh</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/trong-sinh/" title="Truyện Trọng Sinh">Trọng Sinh</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/trinh-tham/" title="Truyện Trinh Thám">Trinh Thám</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/tham-hiem/" title="Truyện Thám Hiểm">Thám Hiểm</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/linh-di/" title="Truyện Linh Dị">Linh Dị</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/nguoc/" title="Truyện Ngược">Ngược</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/sung/" title="Truyện Sủng">Sủng</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/cung-dau/" title="Truyện Cung Đấu">Cung Đấu</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/nu-cuong/" title="Truyện Nữ Cường">Nữ Cường</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/gia-dau/" title="Truyện Gia Đấu">Gia Đấu</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/dong-phuong/" title="Truyện Đông Phương">Đông Phương</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/do-thi/" title="Truyện Đô Thị">Đô Thị</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="dropdown-column">
                                        <ul className="">
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/bach-hop/" title="Truyện Bách Hợp">Bách Hợp</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/hai-huoc/" title="Truyện Hài Hước">Hài Hước</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/dien-van/" title="Truyện Điền Văn">Điền Văn</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/co-dai/" title="Truyện Cổ Đại">Cổ Đại</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/mat-the/" title="Truyện Mạt Thế">Mạt Thế</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/truyen-teen/" title="Truyện Truyện Teen">Truyện Teen</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/phuong-tay/" title="Truyện Phương Tây">Phương Tây</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/nu-phu/" title="Truyện Nữ Phụ">Nữ Phụ</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/light-novel/" title="Truyện Light Novel">Light Novel</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/viet-nam/" title="Truyện Việt Nam">Việt Nam</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/doan-van/" title="Truyện Đoản Văn">Đoản Văn</a>
                                            </li>
                                            <li>
                                                <a href="https://truyenfull.vn/the-loai/khac/" title="Truyện Khác">Khác</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>

                <form className="header-form">
                    <input className="header-form-search" id="search-input" type="search" name="keyword" placeholder="Tìm kiếm..."/>
                    <button className="header-form-search-btn" type="submit" ><span className="glyphicon glyphicon-search"></span></button>
                </form>
            </div>
            <div className="header-breadcrumb">
                <div className="header-breadcrumb-container">
                    <span>Đọc truyện online, đọc truyện chữ, truyện full, truyện hay. Tổng hợp đầy đủ và cập nhật liên tục. </span>
                </div>
            </div>
        </header>
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
            </div>
        </main>
        </body>
    );
};
export default HomePage;
