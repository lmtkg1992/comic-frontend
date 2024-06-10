import { Category, CategoryListProps } from '../types/Category';

// Helper function to split the categories into columns
const splitIntoColumns = (categories: Category[], itemsPerColumn: number) => {
    const columns = [];
    for (let i = 0; i < categories.length; i += itemsPerColumn) {
        columns.push(categories.slice(i, i + itemsPerColumn));
    }
    return columns;
};

// Create the Header component
const Header : React.FC<CategoryListProps> = ({ categories }) => {

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

    return (
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
                                            {goodList.map((category, index) => (
                                                <li key={index}>
                                                    <a href="#" title={category.name}>{category.name}</a>
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
                                                        <a href="#" title={category.name}>{category.name}</a>
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
    );
};

export default Header;
