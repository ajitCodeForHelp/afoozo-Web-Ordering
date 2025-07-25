import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { HiArrowNarrowLeft } from "react-icons/hi";
import { IoIosCall } from "react-icons/io";
import OrderDetails from '../OrderTrackComponent/OrderDetail';
import OrderProgress from '../OrderTrackComponent/OrderProgress';
import { BsGeoAlt, BsBriefcase } from "react-icons/bs";

export default function OrderDetailSection({ show, onHide, orderId }) {

    const [orders, setOrders] = useState([]);
    const getOrderDetail = async (orderReferenceId) => {
        try {
            const mobile = localStorage.getItem("mobileNo");
            const key = localStorage.getItem("secretKey");
            const BasicAuth = btoa(`${mobile}:${key}`);

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
                <OrderProgress currentStep={2} />
                <OrderDetails OrderDetail={orders} />
            </div>
        </Modal>
    )
}