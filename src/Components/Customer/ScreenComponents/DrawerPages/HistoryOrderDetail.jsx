import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { HiArrowNarrowLeft } from "react-icons/hi";
import { IoIosCall } from "react-icons/io";
import OrderDetails from '../OrderTrackComponent/OrderDetail';
import OrderProgress from '../OrderTrackComponent/OrderProgress';
import { BsGeoAlt, BsBriefcase } from "react-icons/bs";
import { Authorization } from '../../../../Utilities/Authorization';

export default function HistoryOrderDetail({ show, onHide, orderId }) {

    const [orders, setOrders] = useState([]);
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
            }
        } catch (e) {
            console.log(e, "error in orderDetail");
        }
    };

    useEffect(() => {
        if (show && orderId) {
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
            dialogClassName="detailed-notification-modal modal-fullscreen-sm-down"
        >
            <div className="">
                <div className="promo-header sticky-top them-bg-black d-flex align-items-center justify-content-between">
                    <HiArrowNarrowLeft className="ri-arrow-left-line fs-4 text-white" onClick={onHide} role="button" />
                    <h5 className="text-white m-auto">Order Detail</h5>
                    <span className='text-white'><IoIosCall /> Call</span>
                </div>
                {/* <OrderProgress currentStep={2} /> */}

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
                <div className="card shadow-sm p-3 m-3 rounded-4">
                    <div className="d-flex align-items-start mb-3">
                        <div className="me-2 d-flex justify-content-center align-items-center" style={{ width: "8%" }}>
                            <span className=' rounded-circle text-center w-100' style={{ height: "33px" }} >
                                <BsGeoAlt className="mt-1 fs-5" />
                            </span>
                        </div>
                        <div className="flex" style={{ width: "91%" }} >
                            <div className="fw-semibold">{orders.restaurantName}</div>
                            <div className="text-muted small text-truncate two-line-ellipsis" style={{ maxWidth: "100%" }}>
                                {orders?.pickUpCompleteAddress}
                            </div>
                        </div>
                    </div>

                    <div className="d-flex align-items-start">
                        <div className="me-2 d-flex justify-content-center align-items-center" style={{ width: "8%" }}>
                            <span className=' rounded-circle text-center w-100' style={{ height: "33px" }} >
                                <BsBriefcase className="mt-1 fs-5" />
                            </span>
                        </div>
                        <div className="flex" style={{ width: "91%" }}>
                            <div className="fw-semibold">Delivery Address</div>
                            <div className="text-muted small text-truncate two-line-ellipsis" style={{ maxWidth: "100%" }}>
                                {orders?.deliveryCompleteAddress}
                            </div>
                        </div>
                    </div>
                </div>

                <OrderDetails OrderDetail={orders} />
            </div>
        </Modal>
    )
}