import React from 'react';
import { PropTypes } from 'prop-types';
import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';
import '../../assets/css/pagination.css';
import '../../assets/css/base.css';

Pagination.propTypes = {
    Pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
    onPageChange: null,

}

function Pagination(props) {
    const { pagination, onPageChange } = props;
    const { _page, _litmit, _totalRows } = pagination;
    const totalPages = Math.ceil(_totalRows / _litmit);

    function handlePageChange(newPage) {
        if (onPageChange) {
            onPageChange(newPage);
        }
    }
    return (
        <nav>
            <ul className="pagination home-product__pagination">
                <li className="pagination-item">
                    <a href="/product" className="pagination-item__link">
                        <i className="pagination-item__icon"><AiOutlineLeft disabled={_page <= 1} onClick={() => handlePageChange(_page - 1)}/></i>
                    </a>
                </li>
                <li className="pagination-item">
                    <a href="/product" className="pagination-item__link">
                        <i className="pagination-item__icon"><AiOutlineRight disabled={_page >= totalPages} onClick={() => handlePageChange(_page + 1)}/></i>
                    </a>
                </li>
            </ul>
            {/* <button
                disabled={_page <= 1}
                onClick={() => handlePageChange(_page - 1)}
            >
                Prev
            </button>
            <button
                disabled={_page >= totalPages}
                onClick={() => handlePageChange(_page + 1)}
            >
                Next
            </button> */}
        </nav>
    )
}

export default Pagination