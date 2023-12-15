import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ImageSlider from "../ImageSlider/ImageSlider";
import { useState } from "react";
import { useEffect, useContext } from "react";
import "./viewdt.css";
import "../../assets/css/base.css";

import { useParams } from "react-router-dom";
import apiProductDetail from "api/apiProductDetail";
import { useCart } from "context/AddToCartContext";
import AuthContext from "context/AuthProvider";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineShoppingCart } from 'react-icons/ai';


const Viewdetails = ({ close, setClose }) => {

    const { auth } = useContext(AuthContext);
    const { addtocart } = useCart();
    const { loginWithRedirect} = useAuth0();
    // CALL API PRODUCT DETAIL
    const [productDetail, setProductDetail] = useState([]);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchProuductDetail = async () => {
            try {
                const response = await apiProductDetail.get(id);
                setProductDetail(response.data);
            } catch (error) {
                setError(error);
            }
        };
        fetchProuductDetail();
    }, [id]);

    if (error) {
        return <p>Erorr: {error.message}</p>
    }

    return (
        <div>
            {
                close ?
                    <div className='grid'>
                        <div className='product_detail'>
                            <div className='container'>
                                <button onClick={() => setClose(false)} className='closebtn'><AiOutlineCloseCircle /></button>
                                {
                                    Array.isArray(productDetail.shop_products) && productDetail.shop_products.map((item) => {
                                        return (
                                            <div className='productbox' >
                                                {/* <h4>{curElm.Cat}</h4>
                                                <h2>{curElm.Title}</h2> */}
                                                <div className="box__image">
                                                    <div className="img-box">
                                                        <ImageSlider />
                                                    </div>
                                                </div>

                                                <div className='detail'>
                                                    {/* <h4>{curElm.Cat}</h4> */}
                                                    <h2>{item.name}</h2>
                                                    <table className="detail-table" key={item.id}>
                                                        <thead className='table__head-title'>
                                                            <tr>
                                                                <th>Bộ Phận</th>
                                                                <th>Thông Số Kỹ Thuật</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className='table__head-body'>
                                                            <tr>
                                                                <td>Name</td>
                                                                <td>{item.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Color</td>
                                                                <td>{item.color}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Camera trước</td>
                                                                <td>{item.forwardCameras}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Camera sau</td>
                                                                <td>{item.backwardCameras}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Loại sản phẩm</td>
                                                                <td>{item.isNew}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Bộ nhớ</td>
                                                                <td>{item.memoryStorage}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Màn hình</td>
                                                                <td>{item.screen}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>CPU</td>
                                                                <td>{item.CPU}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Ram</td>
                                                                <td>{item.RAM}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Xu hướng</td>
                                                                <td>{item.isTrending}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Thông tin chi tiết</td>
                                                                <td>{item.details}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Trạng thái</td>
                                                                <td>{item.status}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Sim</td>
                                                                <td>{item.sim}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Dung lượng pin</td>
                                                                <td>{item.battery}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Hệ điều hành</td>
                                                                <td>{item.type}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    {
                                                        auth.isAuth ?
                                                        (
                                                            <div>
                                                                <button onClick={() => addtocart(item.id, 1)}>Thêm vào giỏ hàng</button>
                                                                <button onClick>Thanh Toán Ngay</button>
                                                            </div>
                                                        )
                                                        :
                                                        (
                                                            <li onClick={() => loginWithRedirect()}><AiOutlineShoppingCart/></li>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                {/* <div className='productbox'></div> */}
                            </div>
                            <div container__comment>

                            </div>
                        </div>
                    </div> : null
            }
        </div>
    )
}

export default Viewdetails;
// const ProductDetail = () => {
//     const { id } = useParams();
//     const [productData, setProductData] = useState(null);
//     console.log(id)
//     useEffect(() => {
//       // Sử dụng giá trị id để gọi API
//       const fetchData = async () => {
//         try {
//           const response = await fetch(`http://0.tcp.ap.ngrok.io:17403/api/getdetailshop_product/${id}`);
//           const data = await response.json();
//           setProductData(data);
//         } catch (error) {
//           console.error('Error fetching product details:', error);
//         }
//       };

//       fetchData();
//     }, [id]);

//     if (!productData) {
//       return <div>Loading...</div>;
//     }

//     // Hiển thị thông tin chi tiết sản phẩm
//     return (
//       <div>
//         <h2>{productData.name}</h2>
//         <p>{productData.id}</p>
//         {/* Hiển thị các thông tin khác của sản phẩm */}
//       </div>
//     );
//   };

//   export default ProductDetail;
// export default Viewdetails
