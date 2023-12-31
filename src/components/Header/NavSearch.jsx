import React from "react";
import { AiOutlineDown, AiOutlineCheck } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
//import apiSearch from "api/apiSearch";

const NavSearch = ({ handleSearchChange, handleSearchSubmit, searchTerm}) => {
    return (
        <div className="header__search">
            <div className="header__search-input-wrap">
                <input
                    type="text"
                    className="header__search-input"
                    placeholder="Nhập để tìm kiếm sản phẩm"
                    value={searchTerm}
                    onChange={handleSearchChange}>
                </input>
                <div className="header__search-history">
                    <h3 className="header__search-history-heading">
                        Lịch sử tìm kiếm
                    </h3>
                </div>
            </div>
            <div className="header__search-select">
                <span className="header__search-select-label">Trong shop</span>
                <i className="header__search-select-icon fa-solid fa-angle-down">
                    <AiOutlineDown />
                </i>

                <ul className="header__search-option">
                    <li className="header__search-option-item header__search-option-item--active">
                        <span>Trong Shop</span>
                        <i className="fas fa-check">
                            <AiOutlineCheck />
                        </i>
                    </li>
                    <li className="header__search-option-item">
                        <span>Ngoài Shop</span>
                        <i className="fas fa-check"></i>
                    </li>
                </ul>
            </div>
            <button className="header__search-btn" onClick={() => handleSearchSubmit(searchTerm)}>
                <i className="header__search-btn-icon fas fa-search">
                    <Link to={`../../Search`}>
                        <BiSearchAlt2 />
                    </Link>
                </i>
            </button>
        </div>
    )
}
export default NavSearch;