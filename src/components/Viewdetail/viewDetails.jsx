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

const Viewdetails = () => {
    const { addtocart } = useCartHandle();
    const { close, setClose } = useCart();
    const { auth } = useAuth();
    // CALL API PRODUCT DETAIL
    const [productDetail, setProductDetail] = useState([]);
    const [error, setError] = useState(null);
    const { id } = useParams();

    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null); // Thêm state mới

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
            } catch (error) {
                setError(error);
            }
        };
        fetchProuductDetail();
    }, [id]);

    const handleColorClick = (color, image) => {
        setSelectedColor(color);
        selectedImage(image)
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
                                        {listshop_product.map((product) => (
                                            <div
                                                key={product.shop_product_id}
                                                className={`color-option ${selectedColor === product.color ? 'selected' : ''}`}
                                                style={{ backgroundColor: product.color }}
                                                onClick={() => handleColorClick(product.color, product.image)}
                                            ></div>
                                        ))}
                                    </div>
                                    
                                </div>

                                <div className="detail">
                                    {
                                        shop_products ? (
                                            <div>
                                                <h2>{shop_products.name}</h2>
                                                <table className="detail-table" key={shop_products.id}>
                                                    <thead className="table__head-title">
                                                        <tr>
                                                            <th>Bộ Phận</th>
                                                            <th>Thông Số Kỹ Thuật</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="table__head-body">
                                                        <tr>
                                                            <td>Name</td>
                                                            <td>{shop_products.name}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Color</td>
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
                                            <button onClick>Thanh Toán Ngay</button>
                                        </div>
                                    ) : (
                                        <li>
                                            <AiOutlineShoppingCart />
                                        </li>
                                    )}
                                </div>
                            </div>
                            {/* {Array.isArray(productDetail.shop_products) &&
                                productDetail.shop_products.map((item) => {
                                    return (
                                    );
                                })} */}
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Viewdetails;
