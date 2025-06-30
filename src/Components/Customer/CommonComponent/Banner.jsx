import React, { useContext, useEffect } from "react";
import banner from "../../../Assets/hero-bg.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import useIsMobile from "../../../Utilities/IsMobile";
import DeskBanner from "../DeskTopUi/DeskCommonComponent/DeskBanner";

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

    const getItems = async (lat, lng) => {
        // ${process.env.REACT_APP_BASE_URL}
        const res = await fetch(`http://65.0.136.206:8080/v1/api/getAdBannerList/DashboardTop`)
        const getRes = await res.json();
        if (getRes.errorCode === 0) {
            console.log(getRes, "gerRes");
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
                                    <button className="mt-2 bg-red-600 text-warning px-4 py-1 rounded them-bg-black border-dark border-0">
                                        {slide.buttonText}
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div> :
                <DeskBanner />
            }
        </>
    )
}
export default Banner;
