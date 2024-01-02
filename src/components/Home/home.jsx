import {React} from 'react';
import { FiTruck } from 'react-icons/fi';
import { BsCurrencyDollar } from 'react-icons/bs';
import { CiPercent } from 'react-icons/ci';
import { BiHeadphone } from 'react-icons/bi';
import BannerSlider from '../BannerHome/BannerSlider.jsx';
import TopHomeSlider from 'components/TopHome/TopHomeSlider.jsx';
import BannerProducts from '../BannerProduct/BannerProducts';
import ProductHome from './ProductHome.jsx';


import './home.css';
import '../../assets/css/base.css';


const Home = () => {

    return (
        <>
            {/* BANNER SLIDER DYNAMIC */}
            <BannerSlider />

            {/* SẢN PHẨM NỔI BẬT */}
            <div className='grid'>
                <div className='product_type'>
                    <h2 className='product_item_name'>Hot</h2>
                    <TopHomeSlider />
                </div>
            </div>
            
            {/* --------------------ABOUT SERVICE---------------------- */}

            <div className='grid'>
                <div className='about'>
                    <div className='container'>
                        <div className='box'>
                            <div className='icon'>
                                <FiTruck />
                            </div>
                            <div className='detail'>
                                <h2>Miễn phí vận chuyển</h2>
                                <p>Khi mua hàng trên 1000$</p>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='icon'>
                                <BsCurrencyDollar />
                            </div>
                            <div className='detail'>
                                <h2>Chi trả nhanh & hoàn tiền nhanh</h2>
                                <p>Đảm bảo an toàn khi giao dịch</p>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='icon'>
                                <CiPercent />
                            </div>
                            <div className='detail'>
                                <h2>Giảm giá thành viên</h2>
                                <p>Nhiều ưu đãi khi trở thành viên viên</p>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='icon'>
                                <BiHeadphone />
                            </div>
                            <div className='detail'>
                                <h2>Hổ trợ khách hàng</h2>
                                <p>Hổ trợ khách hàng 24/24 mỗi khi khách gọi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SẢN PHẨM Ở TRANG CHÍNH */}
            <div className='grid'>
                <div className='product'>
                    <h2 className='product_item_name'>Sản phẩm nổi bật</h2>
                    {/* CALL API TRẢ VỀ DANH SÁCH SẢN PHẨM TRANG CHỦ: */}
                    <ProductHome  />
                </div>
            </div>
            <BannerProducts/>
        </>
    )
}

export default Home;