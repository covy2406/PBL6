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
import useCartHandle from "hook/useCartHandle";
import useCart from "hook/useCart";

const Search = ({ searchResults}) => {
   const { auth } = useAuth();
   const { addtocart } = useCartHandle();
   const { view } = useCart();
   // const [searchResults, searchResults] = useState([]);

   // useEffect(() => {
   //    const fetchSearchResults = async () => {
   //       try {
   //          const resSearch = await apiSearch.getAllSearch(searchTerm);
   //          setSearchResults(resSearch.data);
   //       } catch (error) {
   //          console.error(error);
   //          setSearchResults([]);
   //       }
   //    }
   //    fetchSearchResults();
   // }, [searchTerm])

   //const [loading, setLoading] = useState(true);

   // useEffect(() => {
   //    setLoading(true);
   //    handleSearchSubmitResults(searchTerm)
   //       .then(() => setLoading(false))
   //       .catch((error) => {
   //          console.error("Error fetching search results:", error);
   //          setLoading(false);
   //       });
   // }, [searchTerm, handleSearchSubmitResults]);

   return (
      <div className="container">
         {searchResults && searchResults.length > 0 ? (
            searchResults.map((itemProduct,index) => {
               return (
                  <div className="box" key={index}>
                     <div className="img_box">
                        <img
                           className="product-main__item"
                           src={auth.url + itemProduct.image}
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
                           <li className="icon__link" onClick={() => view(itemProduct.id)}>
                              <Link to={`../Viewdetail/${itemProduct.id}`}>
                                 <BsEye />
                              </Link>
                           </li>
                        </div>
                     </div>
                     <div className="detail">
                        <h4 className="home-product-item__name">{itemProduct.name}</h4>
                        <div className="home-product-item__price">
                           <span className="home-product-item__price-old"></span>
                           <span className="home-product-item__price-current">
                              {itemProduct.price} đ
                           </span>
                        </div>

                        <div className="home-product-item__origin">
                           <span className="home-product-item__brand">
                              {itemProduct.shopName}
                           </span>
                           <span className="home-product-item__origin-name">
                              {itemProduct.quantity}
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
   );
};
export default Search;
