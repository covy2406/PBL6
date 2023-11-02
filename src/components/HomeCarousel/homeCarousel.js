import Slider from "react-slick";
import './homCarousel.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomeSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };
    return (
        <div className='slideCarousel w-3/4 m-auto '>
            <div className="slideCarousel__box mt-20">
                <Slider {...settings}>
                    {data.map((d) => (
                        // <div className='box__slider' key={d.Id}>
                        //     <div className='box__slider-img'>
                        //         <img src={d.Img} alt={d.Cat}></img>
                        //     </div>
                        //     <div className='box__slider-detail'>
                        //         <p>{d.Description}</p>
                        //     </div>
                        // </div>
                        <div key={d.id} className="slideCarousel__item bg-white h-[450px] text-black rounded-xl">
                            <div className='slideCarousel__img h-56 bg-indigo-500 flex justify-center text-center items-center '>
                                <img src={d.Img} alt="" className="h-44 w-44 rounded-full" />
                            </div>

                            <div className="slideCarousel__desc flex flex-col items-center justify-center gap-4 p-4">
                                <p className="slideCarousel__desc-title text-xl font-semibold">{d.Title}</p>
                                <p className="slideCarousel__desc-Des text-center">{d.Description}</p>
                                <p className="slideCarousel__desc-price text-center">
                                    {/* <span></span> */}{d.Price} đ
                                </p>
                                <button className='slideCarousel__desc-btn bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>Read More</button>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

        </div>
    );
}

const data = [
    {
        id: 1,
        Title: "iphone 13 promax",
        Cat: 'Apple',
        Price: '9000000',
        Price_old: '10 000 000',
        Description: 'SamSung zplip cho trải nghiệm gập mượt mà, trải nghiệm đỉnh cao',
        Img: './img/sanpham1.jpg',
        Brand: 'Apple',
        origin: 'Mỹ',
        discount: '10%'
    },
    {
        id: 2,
        Title: "iphone 12 promax",
        Cat: 'Apple',
        Price: '1680000',
        Price_old: '7000000',
        Description: 'SamSung zplip cho trải nghiệm gập mượt mà, trải nghiệm đỉnh cao',
        Brand: 'Apple',
        origin: 'Mỹ',
        Img: './img/sanpham2.jpg',
        discount: '5%'
    },
    {
        id: 3,
        Title: "SamSung galaxy ultraviolet",
        Cat: 'SamSung',
        Price: '4900000',
        Price_old: '7000000',
        Description: 'SamSung zplip cho trải nghiệm gập mượt mà, trải nghiệm đỉnh cao',
        Img: './img/sanpham3.jpg',
        origin: 'Hàn Quốc',
        Brand: 'SamSung',
        discount: '5%'
    },
    {
        id: 4,
        Title: "SamSung zplip",
        Cat: 'SamSung',
        Price: '4900000',
        Price_old: '7000000',
        Description: 'SamSung zplip cho trải nghiệm gập mượt mà, trải nghiệm đỉnh cao',
        Img: './img/sanpham3.jpg',
        origin: 'Hàn Quốc',
        Brand: 'SamSung',
        discount: '5%'
    },
    {
        id: 5,
        Title: "Iphone 15 promax",
        Cat: 'SamSung',
        Price: '4900000',
        Price_old: '7000000',
        Description: 'SamSung zplip cho trải nghiệm gập mượt mà, trải nghiệm đỉnh cao',
        Img: './img/sanpham3.jpg',
        origin: 'Hàn Quốc',
        Brand: 'SamSung',
        discount: '5%'
    },
    {
        id: 6,
        Title: "Iphone 15 promax",
        Cat: 'SamSung',
        Price: '4900000',
        Price_old: '7000000',
        Description: 'SamSung zplip cho trải nghiệm gập mượt mà, trải nghiệm đỉnh cao',
        Img: './img/sanpham3.jpg',
        origin: 'Hàn Quốc',
        Brand: 'SamSung',
        discount: '5%'
    },
];

export default HomeSlider;