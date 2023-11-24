import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ImageSlider from "../ImageSlider/ImageSlider";
import "./viewdt.css";
import "../../assets/css/base.css";
import { useState } from "react";
import { useEffect } from "react";

import { useParams } from "react-router-dom";
import apiProductDetail from "api/apiProductDetail";
//import axiosClient from 'api/axiosClient';

const Viewdetails = ({ addtocart, view, detail, close, setClose, match }) => {
  // CALL API PRODUCT DETAIL
  const [productDetail, setProductDetail] = useState([]);
  //     const { id } = useParams(); // Sử dụng useParams để lấy giá trị ID từ URL

  //     console.log();
  //   useEffect(() => {
  //     // Gọi API để lấy chi tiết sản phẩm dựa trên ID
  //     axios.get(`http://0.tcp.ap.ngrok.io:17403/api/getdetailshop_product/${id}`)
  //       .then(response => {
  //         // Xử lý dữ liệu trả về từ API
  //         setProductDetail(response.data);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching product details:', error);
  //       });
  //   }, [id]); // Thêm id vào mảng dependencies để useEffect chạy khi id thay đổi

  const { id } = useParams();

  const [error, setError] = useState(null);
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
  console.log(productDetail);

  if (error) {
    return <p>Erorr: {error.message}</p>;
  }
  return (
    <>
      {close ? (
        <div className="grid">
          <div className="product_detail">
            <div className="container">
              <button onClick={() => setClose(false)} className="closebtn">
                <AiOutlineCloseCircle />
              </button>

              {productDetail.map((item) => {
                return (
                  <div className="productbox">
                    {/* <h4>{curElm.Cat}</h4>
                                                <h2>{curElm.Title}</h2> */}
                    <div className="box__image">
                      {/* <div className="box__image-name">
                                                        <h2 className='box__image-cat'>{curElm.Cat}</h2>
                                                        <h2 className='box__image-title'>{curElm.Title}</h2>
                                                    </div> */}
                      <div className="img-box">
                        <ImageSlider />
                      </div>
                    </div>

                    <div className="detail">
                      {/* <h4>{curElm.Cat}</h4> */}
                      <h2>{item.name}</h2>
                      <table className="detail-table" key={item.id}>
                        <thead className="table__head-title">
                          <tr>
                            <th>Bộ Phận</th>
                            <th>Thông Số Kỹ Thuật</th>
                          </tr>
                        </thead>
                        <tbody className="table__head-body">
                          <tr>
                            <td>{item.name}</td>
                            <td>{item.color}</td>
                            <td>{item.forwardCameras}</td>
                            <td>{item.backwardCameras}</td>
                            <td>{item.isNew}</td>
                            <td>{item.memoryStorage}</td>
                            <td>{item.VAT}</td>
                            <td>{item.screen}</td>
                            <td>{item.CPU}</td>
                            <td>{item.RAM}</td>
                            <td>{item.isTrending}</td>
                            <td>{item.details}</td>
                            <td>{item.status}</td>
                            <td>{item.sim}</td>
                            <td>{item.battery}</td>
                          </tr>
                        </tbody>
                      </table>
                      {/* {
                                                        productDetail.map((item) => {
                                                            return (
                                                                <table className="detail-table" key={item.id}>
                                                                    <thead className='table__head-title'>
                                                                        <tr>
                                                                            <th>Bộ Phận</th>
                                                                            <th>Thông Số Kỹ Thuật</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody className='table__head-body'>
                                                                        <tr>
                                                                            <td>{item.name}</td>
                                                                            <td>{item.color}</td>
                                                                            <td>{item.forwardCameras}</td>
                                                                            <td>{item.backwardCameras}</td>
                                                                            <td>{item.isNew}</td>
                                                                            <td>{item.memoryStorage}</td>
                                                                            <td>{item.VAT}</td>
                                                                            <td>{item.screen}</td>
                                                                            <td>{item.CPU}</td>
                                                                            <td>{item.RAM}</td>
                                                                            <td>{item.isTrending}</td>
                                                                            <td>{item.details}</td>
                                                                            <td>{item.status}</td>
                                                                            <td>{item.sim}</td>
                                                                            <td>{item.battery}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            )
                                                        })
                                                    } */}
                      {/* <p>6.7 inch, OLED, Super Retina XDR, 2796 x 1290 Pixels
                                                        <br /><br />
                                                        48.0 MP + 12.0 MP + 12.0 MP
                                                        <br /><br />
                                                        12.0 MP
                                                        <br /><br />
                                                        Apple A17 Pro
                                                        <br /><br />
                                                        256 GB
                                                    </p> */}
                      {/* <h3>{item.Price} đ</h3> */}
                      <button onClick={() => addtocart(item)}>
                        Add To Cart
                      </button>
                    </div>
                  </div>
                );
              })}
              {/* <div className='productbox'></div> */}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

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
