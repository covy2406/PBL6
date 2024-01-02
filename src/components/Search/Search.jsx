// import '../../assets/css/base.css';
// import '../Home/home.css';
// import '../Header/css/nav.css';
import { React } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import apiSearch from "api/apiSearch";
import useAuth from "hook/useAuth";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import "../../components/Home/home.css";
import "../Header/css/nav.css";
import "../../assets/css/base.css";
import useCartHandle from "hook/useCartHandle";
import useCart from "hook/useCart";
import { AiOutlineStar } from "react-icons/ai";

const Search = () => {
  const { auth, url } = useAuth();
  const { addtocart } = useCartHandle();
  const { view } = useCart();
  // State để lưu kết quả search
  const [searchResults, setSearchResults] = useState([]);
  const { search } = useParams();

  useEffect(() => {
    // Gọi API search khi component mount và search parameter thay đổi
    const fetchData = async () => {
      try {
        const response = await apiSearch.getAllSearch(search);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu search:", error);
        setSearchResults([]);
      }
    };

    fetchData(search);
  }, [search]);
  return (
    <div className="grid">
      <div className="product">
        <div className="container">
          {searchResults && searchResults.length > 0 ? (
            searchResults.map((itemProduct, index) => {
              return (
                <div className="box" key={index}>
                  <div className="img_box">
                    <img
                      className="product-main__item"
                      src={`${url}${itemProduct.image}`}
                      alt={itemProduct.name}></img>
                    <div className="icon">
                      {auth.isAuth ? (
                        <li onClick={() => addtocart(itemProduct)}>
                          <AiOutlineShoppingCart />
                        </li>
                      ) : (
                        <li>
                          <AiOutlineShoppingCart />
                        </li>
                      )}
                      {/* {`../Viewdetail/${item.id}`} */}
                      {/* <Link to={`../Viewdetail/${item.id}`}><BsEye /></Link> */}
                      <li
                        className="icon__link"
                        onClick={() => view(itemProduct.id)}>
                        <Link to={`../Viewdetail/${itemProduct.id}`}>
                          <BsEye />
                        </Link>
                      </li>
                    </div>
                  </div>
                  <div className="detail">
                    <h4 className="home-product-item__name">
                      {itemProduct.name}
                    </h4>
                    <div className="home-product-item__price">
                      <span className="home-product-item__price-old"></span>
                      <span className="home-product-item__price-current">
                        {parseInt(itemProduct.price).toLocaleString("vn-VN")} đ
                      </span>
                    </div>

                    <div className="home-product-item__origin">
                      <span className="home-product-item__brand">
                        {itemProduct.shopName}
                      </span>
                      <span className="home-product-item__origin-name">
                        {/* {itemProduct.starRated}  <AiOutlineStar /> */}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <p>Không có sản phẩm nào</p>
              <p>{searchResults}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Search;
