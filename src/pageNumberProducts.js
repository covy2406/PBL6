import React from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';
import './assets/css/pagination.css';
import './assets/css/base.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Tạo một mảng chứa các số trang từ 1 đến totalPages
    totalPages = 10;
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <nav>
                <ul className="pagination home-product__pagination">
                    <li className="pagination-item">
                        <a href="/product" className="pagination-item__link">
                            <i className="pagination-item__icon fas fa-angle-left"><AiOutlineLeft/></i>
                        </a>
                    </li>
                    {pageNumbers.map((number) => (
                        <li
                            key={number}
                            className={number === currentPage ? 'active' : '' }
                            onClick={() => onPageChange(number)}
                            
                        >
                            {number}
                        </li>
                    ))}
                    <li className="pagination-item">
                        <a href="/product" className="pagination-item__link">
                            <i className="pagination-item__icon fas fa-angle-right">< AiOutlineRight/></i>
                        </a>
                    </li>
                </ul>
                {/* <ul className="pagination home-product__pagination">
                    <li className="pagination-item">
                        <a href="#" className="pagination-item__link">
                            <i className="pagination-item__icon fas fa-angle-left"></i>
                        </a>
                    </li>
                    <li className="pagination-item pagination-item--active">
                        <a href="#" className="pagination-item__link">1</a>
                    </li>
                    <li className="pagination-item">
                        <a href="#" className="pagination-item__link">2</a>
                    </li>
                    <li className="pagination-item">
                        <a href="#" className="pagination-item__link">3</a>
                    </li>
                    <li className="pagination-item">
                        <a href="#" className="pagination-item__link">4</a>
                    </li>
                    <li className="pagination-item">
                        <a href="#" className="pagination-item__link">5</a>
                    </li>
                    <li className="pagination-item">
                        <a href="#" className="pagination-item__link">...</a>
                    </li>
                    <li className="pagination-item">
                        <a href="#" className="pagination-item__link">14</a>
                    </li>
                    <li className="pagination-item">
                        <a href="#" className="pagination-item__link">
                            <i className="pagination-item__icon fas fa-angle-right"></i>
                        </a>
                    </li>
                </ul> */}
            </nav>
        </>
    );
};

export default Pagination;
