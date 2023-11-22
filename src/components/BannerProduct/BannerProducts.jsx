import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import "../BannerProduct/productBanner.css";
import '../../assets/css/base.css';
import '../Header/nav.css'

const BannerProducts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "./img/bannerProducts1.jpg",
      caption: "Slide 1",
    },
    {
      image: "./img/bannerProducts2.jpg",
      caption: "Slide 2",
    },
    {
      image: "./img/bannerProducts3.jpg",
      caption: "Slide 3",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="grid">
      <div className="banner-home">
        <div className="banner-slider">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? "active" : ""}`}
              style={{ backgroundImage: `url(${slide.image})` }}>
              <Link to="/product" className="home_link_Link"></Link>
              {/* <div className="caption">{slide.caption}</div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerProducts;
