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

const Search = ({ view, addtocart, detail }) => {
  const { auth } = useAuth();
  // CALL API SEARCH

  const [searchTerm, setSearchTerm] = useState("");
  const [searchProduct, setSearchProduct] = useState([]);

  const [error, setError] = useState(null);
  const { search } = useParams();

  // Hàm xử lý thay đổi giá trị ô nhập liệu tìm kiếm
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Hàm xử lý khi nhấn nút tìm kiếm
  const handleSearchSubmit = () => {
    // Gọi API hoặc xử lý tìm kiếm dữ liệu ở đây và cập nhật searchResults
    // Ví dụ: setSearchResults([...filteredData]);
    setSearchProduct([...searchProduct]);
  };

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const response = await apiSearch.get(search);
        setSearchProduct(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchSearch();
  }, [search]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container">
      {searchProduct && searchProduct.length > 0 ? (
        searchProduct.map((item) => {
          return (
            <div className="box" key={item.id}>
              <div className="img_box">
                {/* {`http://localhost:8000${item.image}`} */}
                <img
                  className="product-main__item"
                  src={`http://0.tcp.ap.ngrok.io:17403/${item.image}`}
                  alt={item.name}></img>
                <div className="icon">
                  {auth.isAuth ? (
                    <li onClick={() => addtocart(item)}>
                      <AiOutlineShoppingCart />
                    </li>
                  ) : (
                    <li>
                      <AiOutlineShoppingCart />
                    </li>
                  )}
                  {/* {`../Viewdetail/${item.id}`} */}
                  {/* <Link to={`../Viewdetail/${item.id}`}><BsEye /></Link> */}
                  <li className="icon__link" onClick={() => view(item.id)}>
                    <Link to={`../Viewdetail/${item.id}`}>
                      <BsEye />
                    </Link>
                  </li>
                </div>
              </div>
              <div className="detail">
                <h4 className="home-product-item__name">{item.name}</h4>
                <div className="home-product-item__price">
                  <span className="home-product-item__price-old"></span>
                  <span className="home-product-item__price-current">
                    {item.price} đ
                  </span>
                </div>

                <div className="home-product-item__origin">
                  <span className="home-product-item__brand">
                    {item.shopName}
                  </span>
                  <span className="home-product-item__origin-name">
                    {item.quantity}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <>
          <p>Không có sản phẩm nào</p>
          <p>{searchProduct}</p>
        </>
      )}
    </div>
  );
};
export default Search;
