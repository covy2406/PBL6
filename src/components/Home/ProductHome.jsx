import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import "./home.css";
import apiProductHome from "API/apiProductHome";
//import { toast } from 'react-toastify';

const ProductHome = ({ view, addtocart, detai }) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const [productList, setProductList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductHome = async () => {
      try {
        //const response = await axiosClient.get('/getall/shop_products');
        //const response = await axios.get('https://e059-171-225-185-98.ngrok-free.app/api/shop_products');
        const response = await apiProductHome.getAll();
        setProductList(response.data);
      } catch (error) {
        setError(error);
        //toast.error(error?.message);
      }
    };
    fetchProductHome();
  }, []);
  console.log(productList);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // cách 2 call từ 2 bảng shop và product để sản phẩm có thông tin
  // bao gồm: tên sp, tên shop, địa chỉ, mức sao

  // useEffect(() => {
  //     axiosClient.get('/products')
  //         .then(response => {
  //             const productData = response.data;
  //             const productBrandData = productData.map(async curElm => {
  //                 const brandResponse = await axiosClient.get(`/brands/${curElm.id}`);
  //                 const brandData = brandResponse.data;
  //                 return {
  //                     id: curElm.id,
  //                     name: curElm.name,
  //                     image: curElm.image,
  //                     nameBrand: brandData.name,
  //                     description: brandData.description,
  //                     //starRated: curElm.starRated
  //                 };
  //             });
  //             Promise.all(productBrandData).then(completedProducts => {
  //                 setProductList(completedProducts);
  //             });
  //         })
  //         .catch(error => {
  //             console.log(error);
  //         })

  // }, [])

  // cách 3: call products vs brands
  // useEffect(() => {
  //     const fetchProductData = async () => {
  //         try {
  //             const productsResponse = await axiosClient.get('/products');
  //             const brandsResponse = await axiosClient.get('/brands');

  //             const productsData = productsResponse.data;
  //             const brandsData = brandsResponse.data;

  //             const updatedProductList = productsData.map(curElm => {
  //                 // brand => brand.id === product.brand_id:
  //                 // Đây là hàm callback được truyền vào phương thức find.
  //                 // Trong hàm này, chúng ta so sánh id của mỗi phần tử trong mảng brandsData
  //                 // với brand_id của sản phẩm hiện tại (product).
  //                 // Khi tìm thấy phần tử thỏa mãn điều kiện này, phương thức find sẽ trả về phần tử đó.
  //                 const brand = brandsData.find(brand => brand.id === curElm.brand_id);
  //                 return {
  //                     id: curElm.id,
  //                     name: curElm.name,
  //                     image: curElm.image,
  //                     brand: brand ? brand.name : 'Unknown Brand',
  //                     description: curElm.description
  //                 };
  //             });

  //             setProductList(updatedProductList);
  //         } catch (error) {
  //             console.error('Error fetching data:', error);
  //         }
  //     };

  //     fetchProductData();
  // }, []);

  return (
    <div className="container">
      {/* <p >{productList}</p> */}
      {productList && productList.length > 0 ? (
        // Array.isArray(productList) ? or productList && productList.lenght > 0 ? đều kiểm tra xem có phải dữ liệu từ api là mảng hay ko.
        productList.map((curElm) => {
          return (
            <div className="box" key={curElm.id}>
              <div className="img_box">
                {/* {`http://localhost:8000${curElm.image}`} */}
                <img
                  className="product-main__item"
                  src={`http://0.tcp.ap.ngrok.io:17403/${curElm.image}`}
                  alt={curElm.name}></img>
                <div className="icon">
                  {isAuthenticated ? (
                    <li onClick={() => addtocart(curElm)}>
                      <AiOutlineShoppingCart />
                    </li>
                  ) : (
                    <li onClick={() => loginWithRedirect()}>
                      <AiOutlineShoppingCart />
                    </li>
                  )}
                  {/* {`../Viewdetail/${curElm.id}`} */}
                  {/* <Link to={`../Viewdetail/${curElm.id}`}><BsEye /></Link> */}
                  <li className="icon__link" onClick={() => view(curElm.id)}>
                    <Link to={`../Viewdetail/${curElm.id}`}>
                      <BsEye />
                    </Link>
                  </li>
                </div>
              </div>
              <div className="detail">
                <h4 className="home-product-item__name">{curElm.name}</h4>
                <div className="home-product-item__description">
                  {curElm.detais}
                </div>
                <div className="home-product-item__price">
                  <span className="home-product-item__price-old"></span>
                  <span className="home-product-item__price-current">
                    {curElm.price} đ
                  </span>
                </div>

                <div className="home-product-item__origin">
                  <span className="home-product-item__brand">
                    {curElm.shopName}
                  </span>
                  <span className="home-product-item__origin-name">
                    {curElm.details}
                  </span>
                </div>
                {/* {
                                        shop &&
                                        <div className="home-product-item__origin">
                                            <span className="home-product-item__brand">{shop.shopName}</span>
                                            <span className="home-product-item__origin-name">{shop.shopAddress}</span>
                                        </div>
                                    } */}
              </div>
            </div>
          );
        })
      ) : (
        <>
          <p>Không có sản phẩm nào</p>
          <p>{productList}</p>
        </>
      )}
    </div>
  );
};

export default ProductHome;
