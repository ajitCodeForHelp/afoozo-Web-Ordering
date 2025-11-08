import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import useIsMobile from "../../../Utilities/IsMobile";
import DeskBanner from "../DeskTopUi/DeskCommonComponent/DeskBanner";

function Banner({ orderType }) {

    const [slides, setSlides] = useState([]);
    const getItems = async (type) => {
        try {
            // const token = localStorage.getItem("secretKey");
            const latitude = 19.032626310834413 // Number(location?.latitude);19.032626310834413  //23.8623  //
            const longitude = 72.84266162663698
// ?bannerPosition=${type}&lat=${latitude}&lng=${longitude}
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/getAdBannerList/${type}`)
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setSlides(getRes.responsePacket);
            }
        } catch (e) {
            console.log(e, "chek your internet connection");
        }
    };
    useEffect(() => {
        if (orderType === "HomeDelivery") {
            getItems("Delivery");
        } else if (orderType === "Cafe" || orderType === "TakeAway") {
            getItems(orderType)
        }
    }, [orderType]);

    const isMobile = useIsMobile();
    return (
        <>
            {isMobile ? 
            <div className="p-4">
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
