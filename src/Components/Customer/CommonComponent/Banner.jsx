import React from "react";
import banner from "../../../Assets/hero-bg.jpg";
import { Button, Card } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function Banner() {
    const slides = [
        {
            title: "Gharelu Thali",
            subtitle: "Subscription at 20% off",
            buttonText: "Order Now",
            image: banner, // Make sure the path is correct (public folder or import)
        },
        {
            title: "Gharelu Thali",
            subtitle: "Subscription at 20% off",
            buttonText: "Order Now",
            image: banner, // Make sure the path is correct (public folder or import)
        },
        {
            title: "Gharelu Thali",
            subtitle: "Subscription at 20% off",
            buttonText: "Order Now",
            image: banner, // Make sure the path is correct (public folder or import)
        },
        // Add more slides if needed
    ];
    // const images = [banner, banner, banner, banner];

    return (
        <>
            {/* <Card className="mb-4">
                <Card.Body className="text-center text-white bg-danger rounded banner-img">
                    <Card.Title>Fast Food Sweet Treats</Card.Title>
                    <Card.Text>Buy 1 Get 1 Free on Desserts</Card.Text>
                    <Button variant="light">Order Now</Button>
                </Card.Body>
            </Card> */}
            <div className="p-4">
                <Swiper
                    spaceBetween={10}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper"
                >
                    {slides.map((slide, idx) => (
                        <SwiperSlide key={idx}>
                            <div
                                className="rounded-xl overflow-hidden relative d-flex align-items-center"
                                style={{
                                    height: '250px',
                                    backgroundImage: `url(${slide.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className="absolute inset-0 bg-black/40 rounded-xl flex flex-col justify-center px-4 text-white">
                                    <h2 className="text-lg font-bold">{slide.title}</h2>
                                    <p className="text-sm">{slide.subtitle}</p>
                                    <button className="mt-2 bg-red-600 text-white px-4 py-1 rounded them-bg border-0">
                                        {slide.buttonText}
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}
export default Banner;
