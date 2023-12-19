import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import './css/shopStyle.css'

const Shop = () => {
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState("");

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);

    return (
        <div className="grid">
            <div className="shop__container">
                <div className="shop__container-sidebar">
                    <ul className="sidebar-menu">
                        <ul className="sidebar-menu__item">
                            <h3>Quản lý đơn hàng</h3>
                            <li className="sidbar-menu__item-link">Tất cả</li>
                            <li className="sidbar-menu__item-link">Đơn Hủy</li>
                            <li className="sidbar-menu__item-link">Trả Hang/Hoàn tiền</li>
                        </ul>
                        <ul className="sidebar-menu__item">
                            <h3>Quản lý sản phẩm</h3>
                            <li className="sidbar-menu__item-link">Tất cả sản  phẩm</li>
                            <li className="sidbar-menu__item-link">Thêm sản phẩm</li>
                        </ul>
                        <ul className="sidebar-menu__item">
                            <h3>Hồ sơ shop</h3>
                            <li className="sidbar-menu__item-link">Hồ sơ shop</li>
                        </ul>
                    </ul>
                </div>
                <div className="shop__container-nav">
                    <div className="shop__menu_container">
                        <div className="shop__home">
                            <ul className="shop__home-list">
                                <li className="shop__home-item">
                                    <Link
                                        to="#"
                                        className={`shop__home-item-link ${currentPath === "#" ? "active" : ""
                                            }`}>
                                        Tất Cả
                                    </Link>
                                </li>
                                <li className="shop__home-item">
                                    <Link
                                        to="#"
                                        className={`shop__home-item-link ${currentPath === "#" ? "active" : ""
                                            }`}>
                                        Chờ Xác Nhận
                                    </Link>
                                </li>
                                <li className="shop__home-item">
                                    <Link
                                        to="#"
                                        className={`shop__home-item-link ${currentPath === "#" ? "active" : ""
                                            }`}>
                                        Chờ Lấy Hàng
                                    </Link>
                                </li>
                                <li className="shop__home-item">
                                    <Link
                                        to="#"
                                        className={`shop__home-item-link ${currentPath === "#" ? "active" : ""
                                            }`}>
                                        Đã Giao
                                    </Link>
                                </li>
                                <li className="shop__home-item">
                                    <Link
                                        to="#"
                                        className={`shop__home-item-link ${currentPath === "#" ? "active" : ""
                                            }`}>
                                        Đơn Hủy
                                    </Link>
                                </li>
                                <li className="shop__home-item">
                                    <Link
                                        to="#"
                                        className={`shop__home-item-link ${currentPath === "#" ? "active" : ""
                                            }`}>
                                        Trả Hàng/Hoàn Tiền
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Shop;
