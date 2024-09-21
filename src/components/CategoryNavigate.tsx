import { Category, CategoryListProps } from '../types/Category';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Helper function to split the categories into columns
const splitIntoColumns = (categories: Category[], itemsPerColumn: number) => {
    const columns = [];
    for (let i = 0; i < categories.length; i += itemsPerColumn) {
        columns.push(categories.slice(i, i + itemsPerColumn));
    }
    return columns;
};

// Create the Header component
const CategoryNavigate: React.FC<CategoryListProps> = ({ categories }) => {
    const router = useRouter();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [mobileNavActive, setMobileNavActive] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

    let normalCategories: Category[] = [];
    let goodList: Category[] = [];

    categories.forEach(item => {
        if (item.type_category === 'category') {
            normalCategories.push(item);
        } else if (item.type_category === 'good_list') {
            goodList.push(item);
        }
    });

    const columnNormalCategories = splitIntoColumns(normalCategories, 13);

    // Handle search
    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchKeyword) {
            router.push(`/search/${encodeURIComponent(searchKeyword)}`);
        }
    };

    useEffect(() => {
        if (router.query.key_word) {
            setSearchKeyword(decodeURIComponent(router.query.key_word as string));
        }
    }, [router.query.key_word]);

    // Handle mobile navigation toggle
    const toggleMobileNav = () => {
        setMobileNavActive(!mobileNavActive);
    };

    // Handle mobile dropdown toggle
    const toggleDropdown = (index: number) => {
        if (activeDropdown === index) {
            setActiveDropdown(null); // Close if already active
        } else {
            setActiveDropdown(index); // Open the selected dropdown
        }
    };

    return (
        <header className="header">
            <div className="container">
                <h1 className="logo">
                    <a href={NEXT_PUBLIC_BASE_URL}><span>YÊU TRUYỆN</span></a>
                </h1>

                {/* Hamburger Menu */}
                <div className="hamburger-menu" id="menu-icon" onClick={toggleMobileNav}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>

                {/* Desktop Navigation */}
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
                                        <ul>
                                            {goodList.map((category, index) => (
                                                <li key={index}>
                                                    <a href={`/categories/${category.url_key}`} title={category.title}>{category.title}</a>
                                                </li>
                                            ))}
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
                                    {columnNormalCategories.map((column, columnIndex) => (
                                        <div key={columnIndex} className="dropdown-column">
                                            <ul>
                                                {column.map((category, index) => (
                                                    <li key={index}>
                                                        <a href={`/categories/${category.url_key}`} title={category.title}>{category.title}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>

                {/* Mobile Navigation */}
                <nav className={`mobile-nav ${mobileNavActive ? 'active' : ''}`} id="mobile-nav">
                    <ul>
                        {/* Danh sách */}
                        <li className={`mobile-dropdown ${activeDropdown === 0 ? 'active' : ''}`}>
                            <a href="#" className="mobile-dropdown-toggle" onClick={() => toggleDropdown(0)}>
                                <i className="fas fa-list"></i> Danh sách
                                <i className="fas fa-chevron-down"></i>
                            </a>
                            <ul className="mobile-dropdown-menu">
                                {goodList.map((category, index) => (
                                    <li key={index}>
                                        <a href={`/categories/${category.url_key}`}>{category.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        {/* Thể loại */}
                        <li className={`mobile-dropdown ${activeDropdown === 1 ? 'active' : ''}`}>
                            <a href="#" className="mobile-dropdown-toggle" onClick={() => toggleDropdown(1)}>
                                <i className="fas fa-list"></i> Thể loại
                                <i className="fas fa-chevron-down"></i>
                            </a>
                            <ul className="mobile-dropdown-menu">
                                {normalCategories.map((category, index) => (
                                    <li key={index}>
                                        <a href={`/categories/${category.url_key}`}>{category.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>

                    <form className="mobile-search-form" id="mobile-search-form" onSubmit={handleSearch}>
                        <input
                            className="mobile-form-search"
                            type="search"
                            name="keyword"
                            placeholder="Tìm kiếm..."
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        <button className="mobile-form-search-btn" type="submit">
                            <span className="glyphicon glyphicon-search"></span>
                        </button>
                    </form>
                </nav>

                <div className="flex-spacer"></div>

                {/* Desktop Search */}
                <form className="header-form" onSubmit={handleSearch}>
                    <input
                        className="header-form-search"
                        id="search-input"
                        type="search"
                        name="keyword"
                        placeholder="Tìm kiếm..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    <button className="header-form-search-btn" type="submit">
                        <span className="glyphicon glyphicon-search"></span>
                    </button>
                </form>
            </div>
            <div className="header-breadcrumb">
                <div className="header-breadcrumb-container">
                    <span>Đọc truyện online, đọc truyện chữ, truyện full, truyện hay. Tổng hợp đầy đủ và cập nhật liên tục. </span>
                </div>
            </div>
        </header>
    );
};

export default CategoryNavigate;