import "./viewdt.css";
import "../../assets/css/base.css";
import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FcShop } from "react-icons/fc";
import { useState, useEffect } from "react";
import { FaStar, FaRegStar } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';

import { useParams, Link } from "react-router-dom";
import apiProductDetail from "api/apiProductDetail";

import useAuth from "hook/useAuth";
import useCartHandle from "hook/useCartHandle";
import useCart from "hook/useCart";

import { AiOutlineShoppingCart } from "react-icons/ai";
//import useComment from "hook/useComments";
//import apiComment from "api/apiComment";

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

   // Thêm state mới để lưu trữ shop_product_id được chọn
   const [selectedShopProductId, setSelectedShopProductId] = useState(null);

   // comment
   const [comment, setComment] = useState([]);

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
      fetchProuductDetail(id);
   }, []);


   // call api comment
   useEffect(() => {
      const fetchComments = async (shop_product_id) => {
         try {
            const resCmt = await apiProductDetail.getComment(shop_product_id);
            setComment(resCmt.data);
         } catch (err) {
            if (err.response) {
               // Lỗi HTTP, ví dụ: error.response.status
               console.log("Lỗi HTTP:", err.response.status);
            } else if (err.request) {
               // Yêu cầu đã được gửi nhưng không nhận được phản hồi
               console.log("Yêu cầu không được phản hồi:", err.request);
            } else {
               // Lỗi khác
               console.log("Lỗi:", err.message);
            }
         }
      };
      fetchComments(id);
   }, []);

   // console.log('id chi tiet san pham: ', id);
   // console.log("productDetail", productDetail);
   if (error) {
      return <p>Erorr: {error.message}</p>;
   }

   // Kiểm tra nếu shop_products không tồn tại hoặc là mảng rỗng
   if (!productDetail.shop_products || productDetail.shop_products.length === 0) {
      return <p>Product not found</p>;
   }

   const { shop_products, listshop_product } = productDetail;

   // xử lý thay đổi màu, ảnh, shop_product_id
   const handleColorClick = (color, image, shopProductId) => {
      // console.log(`Color clicked: ${color}, Image: ${image}`);
      setSelectedColor((prevColor) => color);
      setSelectedImage((prevImage) => image);
      setSelectedShopProductId(shopProductId); // Cập nhật shop_product_id khi chọn ảnh mới
   };

   // tính số sao:
   // Hàm để render số sao tương ứng
   const renderStars = (rating) => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
         stars.push(
            i <= rating ? (
               <FaStar key={i} color="#FFD700" />
            ) : (
               <FaRegStar key={i} color="#FFD700" />
            )
         );
      }
      return stars;
   };

   // tính thời gian comment
   const calculateTimeAgo = (createdAt, updatedAt) => {
      const currentDate = new Date(updatedAt);
      const commentDate = new Date(createdAt);
      const distance = formatDistanceToNow(commentDate, { addSuffix: true });
      return distance;
   };



   console.log('in ra shop_product_id đang chọn: ', selectedShopProductId);

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
                              <img className="img-box__real" src={`http://0.tcp.ap.ngrok.io:15234/${selectedImage}`} alt={shop_products.name} />

                           </div>
                           <div className="box__image-select">
                              {listshop_product.map(product => (
                                 <div
                                    key={product.shop_product_id}
                                    className={`color-option ${selectedColor === product.color ? 'selected' : ''}`}
                                    style={{ backgroundColor: product.color }}
                                    onClick={() => handleColorClick(product.color, product.image, product)}
                                 >
                                    {/* Hiển thị ảnh của điện thoại từ listshop_product */}
                                    {/* {product.shop_product_id} */}
                                    <img className="box__image-select-choose" src={`http://0.tcp.ap.ngrok.io:15234/${product.image}`} alt={shop_products.name} />
                                 </div>
                              ))}
                           </div>
                        </div>
                        <div className="detail">
                           {shop_products ? (
                              <>
                                 <div className="detail__shopName-link">
                                    <Link to={`../../ViewdetailShop/${shop_products.shop_id}`} className="detail__shopName-icon">
                                       <FcShop />
                                    </Link>
                                    <Link className="detail__shopName" to={`../../ViewdetailShop/${shop_products.shop_id}`}>
                                       Shop Name: {shop_products.Shopname}
                                       {/* <div className="detail__shopName">
                                    </div> */}
                                    </Link>

                                 </div>
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
                                          <td>{selectedColor}</td>
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
                              </>
                           ) : null
                           }
                           {auth.isAuth ? (
                              <div>
                                 <button onClick={() => addtocart(selectedShopProductId, 1)}>
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
                              <div className="comment-item__head">
                                 <div className="container__comment-item-img">
                                    <img src={`http://0.tcp.ap.ngrok.io:15234/${cmtItem.avatar}`} alt="" className="comment__avatar" />
                                 </div>
                                 <div className="comment__content">
                                    <div className="comment__content-user-info">
                                       <span className="user-info-username">{cmtItem.name}</span>
                                    </div>
                                    <div className="comment__content-user-info">
                                       {((cmtItem.created_at) === (cmtItem.upadate_at)) ? (
                                          <span className="user-info-timestamp">{calculateTimeAgo(cmtItem.created_at)}</span>

                                       ) : (
                                          <span className="user-info-timestamp">đã chỉnh sửa: {calculateTimeAgo(cmtItem.updated_at)}</span>
                                       )}
                                    </div>
                                    <div className="comment__content-rating">
                                       {renderStars(cmtItem.rating)}
                                    </div>
                                 </div>
                              </div>
                              <div className="comment__content-text">
                                 <p className="comment__content-text-main">
                                    {cmtItem.feedback}
                                 </p>
                              </div>
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