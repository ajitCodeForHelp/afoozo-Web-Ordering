import React, { useEffect, useState } from "react";
import { FaFileInvoice } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Authorization } from "../../../../Utilities/Authorization";
import useIsMobile from "../../../../Utilities/IsMobile";
import { useNavigate } from "react-router-dom";

const LiveOrdersSlide = () => {

    const [list, setList] = useState([]);
    const isMobile = useIsMobile();

    const orders = async () => {
        try {
            const BasicAuth = Authorization();
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/getOrderList/All/Live/0/-1`, {
                headers: {
                    'Authorization': `Basic ${BasicAuth}`
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setList(getRes.responsePacket);
            }
        } catch (error) {
            console.log(error, "error in liver order api");

        }
    };
    useEffect(() => {
        orders();
    }, []);

    const navigate = useNavigate();

    return (
        <>
            <div className="liver-order-slide sticky-bottom" style={{ bottom: isMobile && "65px" }}>
                <Swiper
                    spaceBetween={10}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="my-2 overflow-hidden"
                    style={{ height: "75px" }}
                >
                    {
                        list?.map((itm) => {
                            return (
                                <>
                                    <SwiperSlide>
                                        <div className="container">
                                            <div className="card bg-dark text-white p-3 rounded-3 shadow-sm">
                                                <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                    {/* Left side: Icon + Order ID */}
                                                    <div className="d-flex align-items-center mb-2 mb-md-0">
                                                        <FaFileInvoice
                                                            size={24}
                                                            color="#fcb100"
                                                            className="me-2 flex-shrink-0"
                                                        />
                                                        <span className="fw-semibold">{itm.orderReferenceId}</span>
                                                    </div>

                                                    {/* Right side: Track Button */}
                                                    <button className="btn btn-outline-none text-white btn-sm px-3"
                                                        onClick={() => navigate(`?sub=orderDetail&orderRef_id=${itm.orderReferenceId}`)}
                                                    >
                                                        Track <span className="text-warning">&nbsp;➜</span>
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </>
                            )
                        })
                    }
                </Swiper>
            </div>
        </>
    );
};

export default LiveOrdersSlide;
