import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
//import ImageSlider from "./ImageSlider/ImageSlider";
import { useState } from "react";
import { useEffect } from "react";
import "./viewdt.css";
import "../../assets/css/base.css";

import { useParams } from "react-router-dom";
import apiProductDetail from "api/apiProductDetail";

import useAuth from "hook/useAuth";
import useCartHandle from "hook/useCartHandle";

import { AiOutlineShoppingCart } from "react-icons/ai";
import useCart from "hook/useCart";
//import useComment from "hook/useComments";
import apiComment from "api/apiComment";


const Viewdetails = () => {
   const { addtocart } = useCartHandle();
   //const { fetchComments } = useComment();
   const { close, setClose } = useCart();
   const { auth } = useAuth();
   // CALL API PRODUCT DETAIL
   const [productDetail, setProductDetail] = useState([]);
   const [error, setError] = useState(null);
   const { id } = useParams();

   const [selectedColor, setSelectedColor] = useState(null);
   const [selectedImage, setSelectedImage] = useState(null); // Thêm state mới
   const [listImageColor, setListImageColor] = useState(null);

   // comment
   const [comment, setComment] = useState([])

   useEffect(() => {
      const fetchProuductDetail = async () => {
         try {
            const response = await apiProductDetail.viewDetail(id);

            setProductDetail(response.data);
            // Mặc định chọn màu đầu tiên
            if (response.data.listshop_product.length > 0) {
               setSelectedColor(response.data.listshop_product[0].color);
               setSelectedImage(response.data.listshop_product[0].image); // Mặc định chọn hình ảnh đầu tiên
            }
            else {
               setListImageColor(listshop_product.image)
            }
         } catch (error) {
            setError(error);
         }
      };
      fetchProuductDetail();
   }, [id]);


   // call api comment
   useEffect(() => {
      const fetchComments = async (numberOfStars, shop_product_id) => {
         try {
            const resCmt = await apiComment.getComment(numberOfStars, shop_product_id);
            setComment(resCmt.data);
         }
         catch (err) {
            if (err.response) {
               // Lỗi HTTP, ví dụ: error.response.status
               console.log('Lỗi HTTP:', err.response.status);
            } else if (err.request) {
               // Yêu cầu đã được gửi nhưng không nhận được phản hồi
               console.log('Yêu cầu không được phản hồi:', err.request);
            } else {
               // Lỗi khác
               console.log('Lỗi:', err.message);
            }
         }
      }
      fetchComments();
   }, [])
   

   const handleColorClick = (color, image) => {
      console.log(`Color clicked: ${color}, Image: ${image}`);
      setSelectedColor((prevColor) => color);
      setSelectedImage((prevImage) => image);
   };

   // console.log('id chi tiet san pham: ', id);
   console.log('productDetail', productDetail);
   if (error) {
      return <p>Erorr: {error.message}</p>;
   }

   // Kiểm tra nếu shop_products không tồn tại hoặc là mảng rỗng
   if (!productDetail.shop_products || productDetail.shop_products.length === 0) {
      return <p>Product not found</p>;
   }



   const { shop_products, listshop_product } = productDetail;
   console.log('listshop_product',listshop_product);
   const shopProductId = listshop_product.map((item) => (item.shop_product_id));
   console.log(shopProductId);
   //console.log('in ra shop_product_id của chi tiết sản phẩm', listshop_product.shop_product_id);

   return (
      <div>
         {close ? (
            <div className="grid">
               <div className="product_detail">
                  <div className="container">
                     <button onClick={() => setClose(false)} className="closebtn">
                        <AiOutlineCloseCircle />
                     </button>
                     <div className="productbox">
                        <div className="box__image">
                           <div className="img-box">
                              <img className="img-box__real" src={`http://0.tcp.ap.ngrok.io:15234/${shop_products.image}`} alt={shop_products.name} />

                           </div>
                           <div className="box__image-select">
                              {listshop_product.map(product => (
                                 
                                 <div
                                    key={product.shop_product_id}
                                    className={`color-option ${selectedColor === product.color ? 'selected' : ''}`}
                                    style={{ backgroundColor: product.color }}
                                    onClick={() => handleColorClick(product.color, product.image)}
                                 >
                                    {/* Hiển thị ảnh của điện thoại từ listshop_product */}
                                    {/* {product.shop_product_id} */}
                                    <img src={`http://0.tcp.ap.ngrok.io:15234/${product.image}`} alt={shop_products.name} />
                                 </div>
                              ))}
                           </div>
                        </div>

                        <div className="detail">
                           {
                              shop_products ? (
                                 <div>
                                    <h2>{shop_products.name}</h2>
                                    <div className="product__price">
                                       {parseInt(shop_products.price).toLocaleString("vn-VN")} đ
                                    </div>
                                    <table className="detail-table" key={shop_products.id}>
                                       <thead className="table__head-title">
                                          <tr>
                                             <th>Bộ Phận</th>
                                             <th>Thông Số Kỹ Thuật</th>
                                          </tr>
                                       </thead>
                                       <tbody className="table__head-body">
                                          <tr>
                                             <td>Tên sản phẩm</td>
                                             <td>{shop_products.name}</td>
                                          </tr>
                                          
                                          <tr>
                                             <td>Màu sắc</td>
                                             <td>{shop_products.color}</td>
                                          </tr>
                                          <tr>
                                             <td>Camera trước</td>
                                             <td>{shop_products.forwardCameras}</td>
                                          </tr>
                                          <tr>
                                             <td>Camera sau</td>
                                             <td>{shop_products.backwardCameras}</td>
                                          </tr>
                                          <tr>
                                             <td>Loại sản phẩm</td>
                                             <td>{shop_products.isNew}</td>
                                          </tr>
                                          <tr>
                                             <td>Bộ nhớ</td>
                                             <td>{shop_products.memoryStorage}</td>
                                          </tr>
                                          <tr>
                                             <td>Màn hình</td>
                                             <td>{shop_products.screen}</td>
                                          </tr>
                                          <tr>
                                             <td>CPU</td>
                                             <td>{shop_products.CPU}</td>
                                          </tr>
                                          <tr>
                                             <td>Ram</td>
                                             <td>{shop_products.RAM}</td>
                                          </tr>
                                          <tr>
                                             <td>Xu hướng</td>
                                             <td>{shop_products.isTrending}</td>
                                          </tr>
                                          <tr>
                                             <td>Thông tin chi tiết</td>
                                             <td>{shop_products.details}</td>
                                          </tr>
                                          <tr>
                                             <td>Trạng thái</td>
                                             <td>{shop_products.status}</td>
                                          </tr>
                                          <tr>
                                             <td>Sim</td>
                                             <td>{shop_products.sim}</td>
                                          </tr>
                                          <tr>
                                             <td>Dung lượng pin</td>
                                             <td>{shop_products.battery}</td>
                                          </tr>
                                          <tr>
                                             <td>Hệ điều hành</td>
                                             <td>{shop_products.type}</td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>

                              ) : null
                           }
                           {auth.isAuth ? (
                              <div>
                                 <button onClick={() => addtocart(shop_products.id, 1)}>
                                    Thêm vào giỏ hàng
                                 </button>
                                 <button >Thanh Toán Ngay</button>
                              </div>
                           ) : (
                              <li>
                                 <AiOutlineShoppingCart />
                              </li>
                           )}
                        </div>
                     </div>
                     <div container__comment>
                        {comment.map((cmtItem, index) => (
                           <div className="container__comment-item" key={index}>
                              <div className="container__comment-item-img">{cmtItem.avartar}</div>
                              <div className="container__commnet-item-write">{cmtItem.feedback}</div>
                           </div>
                        ))}

                     </div>
                  </div>
               </div>
            </div>
         ) : null}
      </div>
   );
};

export default Viewdetails;
