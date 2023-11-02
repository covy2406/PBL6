import { Carousel } from "@material-tailwind/react";

export function CarouselTransition() {
    return (
        <Carousel transition={{ duration: 2 }} className="rounded-xl">
            <img
                src='./img/dienthoai.jpg'
                alt="hinh"
                className="h-full w-full object-cover"
            />
            <img
                src='./img/dienthoai.jpg'
                alt="hinh"
                className="h-full w-full object-cover"
            />
            <img
                src='./img/dienthoai.jpg'
                alt="hinh"
                className="h-full w-full object-cover"
            />
        </Carousel>
    );
}