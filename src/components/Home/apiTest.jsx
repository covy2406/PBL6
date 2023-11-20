// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './home.css';
// import { Link } from 'react-router-dom';
// import { AiOutlineShoppingCart } from 'react-icons/ai';
// import { BsEye } from 'react-icons/bs';


// //import apiProduct from 'api/apiProduct';

// const MyComponent = ({ view, addtocart }) => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('https://e059-171-225-185-98.ngrok-free.app/api/products');
//                 //const response = await axios.get('http://localhost:8000/api/products');
//                 //const response = await apiProduct.getAll()
//                 setData(response.data);
//             } catch (error) {
//                 setError(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>Error: {error.message}</p>;
//     }

//     return (
//         // <div>
//         //   <h1>Data from API</h1>
//         //   <pre>{JSON.stringify(data, null, 2)}</pre>
//         // </div>

//         <div className='container'>
//             {
//                 data && data.length > 0 ?
//                     data.map((curElm) => {
//                         //const shop = shopList.find((shop) => shop.id === curElm.id);
//                         return (
//                             <div className='box' key={curElm.id}>
//                                 <div className='img_box'>
//                                     <img className='product-main__item' src={curElm.image} alt={curElm.name}></img>
//                                     <div className='icon'>
//                                         <li onClick={() => addtocart(curElm)}><AiOutlineShoppingCart /></li>
//                                         <li className='icon__link' onClick={() => view(curElm)}><Link to='../Viewdetail'><BsEye /></Link></li>

//                                     </div>
//                                 </div>
//                                 <div className='detail'>
//                                     <h4 className="home-product-item__name">
//                                         {curElm.name}
//                                     </h4>
//                                     <div className="home-product-item__price">
//                                         <span className="home-product-item__price-old"></span>
//                                         <span className="home-product-item__price-current"></span>
//                                     </div>

//                                     {/* {
//                                     shop &&
//                                     <div className="home-product-item__origin">
//                                         <span className="home-product-item__brand">{shop.shopName}</span>
//                                         <span className="home-product-item__origin-name">{shop.shopAddress}</span>
//                                     </div>
//                                 } */}
//                                 </div>

//                             </div>
//                         )
//                     })
//                     :
//                     <>
//                         <p>Không có sản phẩm nào</p>
//                         <p >{data}</p>
//                     </>
//             }

//         </div>
//         //<pre>{JSON.stringify(data, null, 2)}</pre>
//     );
// };

// export default MyComponent;