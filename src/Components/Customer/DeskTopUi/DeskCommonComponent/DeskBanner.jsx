import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import img from "../../../../Assets/Banner.jpg";

function DeskBanner() {
    const images = [img, img, img];
    return (
        <>
            <div className="container-fluid px-0 banner-carousel">
                <Swiper
                    spaceBetween={0}
                    centeredSlides={true}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper deskSwiper"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img src={img} alt={`Slide ${index + 1}`} className="img-fluid slide-image" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}

export default DeskBanner;
