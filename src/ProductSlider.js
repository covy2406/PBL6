import React, { useState } from 'react';
import './assets/css/productTypeSlider.css';
import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';
import ProductSlide1 from './assets/js/productSlide';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";



function ProductSlider() {
    const [slideIndex, setSlideIndex] = useState(0);
    const handlePrev = () => {
        if (slideIndex > 0) {
            setSlideIndex(slideIndex - 1);
        }
    };

    const handleNext = () => {
        if (slideIndex < ProductSlide1.length - 4) {
            setSlideIndex(slideIndex + 1);
        }
    };

  return (
    <div className="slider-container">
      <div className="slider">
        
        {ProductSlide1.map((product, index) => (
          <div
            key={index}
            className={`product ${index >= slideIndex && index < slideIndex + 4 ? "active" : ""}`}
          >
            <img src={product.Img} alt={product.name} />
            <h3>{product.Price}</h3>
            <p>{product.Title}</p>
          </div>
        ))}
      </div>
      <div className="slider-nav">
        <div className="prev" onClick={handlePrev}>
          <i className="fa fa-angle-left"><AiOutlineLeft/></i>
        </div>
        <div className="next" onClick={handleNext}>
          <i className="fa fa-angle-right"><AiOutlineRight/></i>
        </div>
      </div>
    </div>
  );
}

export default ProductSlider;
