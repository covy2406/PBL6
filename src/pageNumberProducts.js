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
                    <li class="pagination-item">
                        <a href="/product" class="pagination-item__link">
                            <i class="pagination-item__icon fas fa-angle-left"><AiOutlineLeft/></i>
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
                    <li class="pagination-item">
                        <a href="/product" class="pagination-item__link">
                            <i class="pagination-item__icon fas fa-angle-right">< AiOutlineRight/></i>
                        </a>
                    </li>
                </ul>
                {/* <ul class="pagination home-product__pagination">
                    <li class="pagination-item">
                        <a href="#" class="pagination-item__link">
                            <i class="pagination-item__icon fas fa-angle-left"></i>
                        </a>
                    </li>
                    <li class="pagination-item pagination-item--active">
                        <a href="#" class="pagination-item__link">1</a>
                    </li>
                    <li class="pagination-item">
                        <a href="#" class="pagination-item__link">2</a>
                    </li>
                    <li class="pagination-item">
                        <a href="#" class="pagination-item__link">3</a>
                    </li>
                    <li class="pagination-item">
                        <a href="#" class="pagination-item__link">4</a>
                    </li>
                    <li class="pagination-item">
                        <a href="#" class="pagination-item__link">5</a>
                    </li>
                    <li class="pagination-item">
                        <a href="#" class="pagination-item__link">...</a>
                    </li>
                    <li class="pagination-item">
                        <a href="#" class="pagination-item__link">14</a>
                    </li>
                    <li class="pagination-item">
                        <a href="#" class="pagination-item__link">
                            <i class="pagination-item__icon fas fa-angle-right"></i>
                        </a>
                    </li>
                </ul> */}
            </nav>
        </>
    );
};

export default Pagination;
