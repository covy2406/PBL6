import React, {useState} from 'react';
import { useEffect } from "react";
import "./bannerSlider.css";
import '../../assets/css/base.css';

const BannerSlider = () => {
        const [currentSlide, setCurrentSlide] = useState(0);
        const slides = [
            {
                image: './img/bannerHomeleft1.jpg',
                caption: 'Slide 1',
            },
            {
                image: './img/bannerHomeleft2.jpg',
                caption: 'Slide 2',
            },
            {
                image: './img/bannerHomeleft3.jpg',
                caption: 'Slide 3',
            },
        ];

        useEffect(() => {
            const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
            }, 3000);

            return () => clearInterval(interval);
        }, [slides.length]);

        return (
            <div className='grid'>
                <div className='banner-home'>
                    <div className="banner-slider__left">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className={`slide ${index === currentSlide ? 'active' : ''}`}
                                style={{ backgroundImage: `url(${slide.image})` }}
                            >
                                {/* <div className="caption">{slide.caption}</div> */}
                            </div>
                        ))}
                    </div>
                    <div className='banner-slider__right'>
                        <div className='banner-slider__right-top'>
                            <a href='/'>
                                <img src='./img/bannerProductsTop1.jpg' alt='ảnh quảng cáo phụ banner chính 1'></img>
                            </a>
                        </div>
                        <div className='banner-slider__right-bottom'>
                            <a href='/'>
                                <img src='./img/bannerProductsBottom1.jpg' alt='ảnh quảng cáo phụ banner chính 2'></img>
                            </a>
                        </div>
                        <div className='banner-slider__small'>
                            {/* <div className='banner-slider__small-title'>Tin khuyến mãi</div> */}
                            <a className='banner-slider__small-item' href='/product' alt='banner small1'>
                                <img className='slider__small-img' src='./img/bannerSmall2.jpg' alt='ảnh1'></img>
                                <div className='banner-slider__small-content'>
                                    <h5 className='banner-slider__small-heading'>Giảm ngay 250k khi thanh toán quan VNPay, MoMo và các vi thanh toán nội địa</h5>
                                </div>
                            </a>
                            <a className='banner-slider__small-item' href='/product' alt='banner small2'>
                                <img className='slider__small-img' src='./img/bannerSmall2.jpg' alt='ảnh2'></img>
                                <div className='banner-slider__small-content'>
                                    <h5 className='banner-slider__small-heading'>Mua máy cũ giá mới, hàng cũ siêu mới, siêu chất lượng</h5>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );  
}; 

export default BannerSlider;