import React, { useContext, useEffect, useState } from "react";
import banner from "../../../Assets/hero-bg.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import useIsMobile from "../../../Utilities/IsMobile";
import DeskBanner from "../DeskTopUi/DeskCommonComponent/DeskBanner";

function Banner() {

    const [slides, setSlides] = useState([]);
    const getItems = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/getAdBannerList/DashboardTop`)
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setSlides(getRes.responsePacket);
            }
        } catch (e) {
            console.log(e, "chek your internet connection");
        }
    };
    useEffect(() => {
        getItems();
    }, []);

    const isMobile = useIsMobile();
    return (
        <>
            {isMobile ? <div className="p-4">
                <Swiper
                    spaceBetween={10}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper overflow-hidden"
                >
                    {slides.map((slide, idx) => (
                        slide.active && <SwiperSlide key={idx} className="rounded-xl overflow-hidden">
                            {/* <div
                                className="rounded-xl overflow-hidden relative d-flex align-items-center"
                                style={{
                                    height: '250px',
                                    backgroundImage: `url(${slide.adImageUrlLarge})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className="absolute inset-0 bg-black/40 rounded-xl flex flex-col justify-center px-4 text-white">
                                    <h2 className="text-lg font-bold">{slide.title}</h2>
                                    <p className="text-sm">{slide.subtitle}</p>
                                    <button className="mt-2 bg-red-600 text-warning px-4 py-1 rounded them-bg-black border-dark border-0">
                                        {slide.buttonText}
                                    </button>
                                </div>
                            </div> */}
                            <img src={slide.adImageUrlLarge} alt={`Slide ${idx + 1}`} className="img-fluid slide-image w-100 rounded-xl" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div> :
                <DeskBanner images={slides} />
            }
        </>
    )
}
export default Banner;
