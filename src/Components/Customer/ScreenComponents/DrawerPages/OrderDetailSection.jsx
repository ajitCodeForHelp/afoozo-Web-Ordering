import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { HiArrowNarrowLeft } from "react-icons/hi";
import { IoIosCall } from "react-icons/io";
import OrderDetails from '../OrderTrackComponent/OrderDetail';
import OrderProgress from '../OrderTrackComponent/OrderProgress';
import { BsGeoAlt, BsBriefcase } from "react-icons/bs";
import DeliveryLocationMap from '../OrderTrackComponent/DeliveryLocationMap';
import { Authorization } from '../../../../Utilities/Authorization';
import { useSearchParams } from 'react-router-dom';

export default function OrderDetailSection({ show, onHide, orderId }) {

    const [orders, setOrders] = useState([]);
    const [orderStatus, setOrderStatus] = useState(0);
    const getOrderDetail = async (orderReferenceId) => {
        try {
            // const mobile = localStorage.getItem("mobileNo");
            // const key = localStorage.getItem("secretKey");
            // const BasicAuth = btoa(`${mobile}:${key}`);
            const BasicAuth = Authorization();

            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/orderDetail/${orderReferenceId}`, {
                headers: {
                    'Authorization': `Basic ${BasicAuth}`
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setOrders(getRes.responsePacket);
                switch (getRes.responsePacket.orderStatus) {
                    case "Ordered":
                        setOrderStatus(0);
                        break;
                    case "OnTheWay":
                        setOrderStatus(1);
                        break;
                    case "Delivered":
                        setOrderStatus(2);
                        break;
                    default:
                        break;
                };
            }
        } catch (e) {
            console.log(e, "error in orderDetail");
        }
    };

    // useEffect(() => {
    //     if (show && orderId) {
    //         getOrderDetail(orderId);
    //     }
    // }, [show]);
    const [search] = useSearchParams();

    useEffect(() => {
        const url = search.get("orderRef_id");

        if (url && show) {
            getOrderDetail(url);
        } if (show && orderId) {
            getOrderDetail(orderId);
        }

    }, [show]);

    function formatDateTime(timestamp) {
        const date = new Date(timestamp);

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const month = months[date.getMonth()];
        const day = String(date.getDate()).padStart(2, '0');

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12 || 12; // convert to 12-hour format

        return `${month} ${day} ${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            backdrop="static"
            keyboard={false}
            dialogClassName="detailed-notification-modal modal-fullscreen-sm-down "
        >
            <div className="bg-white">
                <div className="promo-header sticky-top them-bg-black d-flex align-items-center justify-content-between">
                    <HiArrowNarrowLeft className="ri-arrow-left-line fs-4 text-white" onClick={onHide} role="button" />
                    <h5 className="text-white m-auto">Order Detail</h5>
                    <span className='text-white'><IoIosCall /> Call</span>
                </div>
                {orders?.orderType === "HomeDelivery" && <OrderProgress currentStep={orderStatus} />}
                {
                    orders?.orderType === "TakeAway" &&
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="d-flex justify-content-center align-items-center flex-column">
                            <img src="https://play-lh.googleusercontent.com/lomBq_jOClZ5skh0ELcMx4HMHAMW802kp9Z02_A84JevajkqD87P48--is1rEVPfzGVf" width={200} alt="img" />
                            <div className="text-center fw-semibold">
                                Show this QR to get your food.
                            </div>
                        </div>
                    </div>
                }
                {orders?.orderType === "HomeDelivery" ?
                    <DeliveryLocationMap lati={orders?.deliveryLatitude} long={orders?.deliveryLongitude} />
                    :
                    <div className="mb-3 p-3 shadow-sm">
                        <div className="fw-bold">
                            {orders?.restaurantName}
                        </div>
                        <div className="fw-bold">
                            {orders?.orderRefId}
                        </div>
                        <div className="fw-normal text-muted">
                            {orders?.orderStatus}
                        </div>
                        <div className="fw-normal text-muted">
                            {formatDateTime(orders?.orderDateTime)}
                        </div>
                    </div>
                }
                <OrderDetails OrderDetail={orders} />
            </div>
        </Modal>
    )
}