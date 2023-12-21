import React, { useState } from "react";
import { AiFillLeftCircle } from "react-icons/ai";
import { AiFillRightCircle } from "react-icons/ai";
//import images  from './carouselDt';
import "./imageSlider.css";
import Slider from "react-slick";
//import { useEffect } from 'react';

const ImageSlider = () => {
  // const [imageList, setImageList] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //     const fetch
  // })

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  const images = [
    {
      img: "./img/iphone_mattruoc_tim.jpg",
    },
    {
      img: "./img/iphone_matsau_tim.jpg",
    },
    {
      img: "./img/iphone_sautruoc_tim.jpg",
    },
    {
      img: "./img/iphone_camera_tim.jpg",
    },
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const nextImage = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };

  const previousImage = () => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };

  return (
    <div className="slider__image">
      <button className="slider__carsdt-btn-left" onClick={previousImage}>
        <AiFillLeftCircle />
      </button>
      <Slider className="slider" {...settings}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.img}
            alt={`Slider ${index}`}
            style={{ display: index === currentImage ? "block" : "none" }}
          />
        ))}
      </Slider>
      <button className="slider__carsdt-btn-right" onClick={nextImage}>
        <AiFillRightCircle />
      </button>
    </div>
  );
};

export default ImageSlider;
