import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { HiArrowNarrowLeft } from "react-icons/hi";
import { IoIosCall } from "react-icons/io";
import OrderDetails from '../OrderTrackComponent/OrderDetail';
import OrderProgress from '../OrderTrackComponent/OrderProgress';
import { BsGeoAlt, BsBriefcase } from "react-icons/bs";
import DeliveryLocationMap from '../OrderTrackComponent/DeliveryLocationMap';
import { Authorization } from '../../../../Utilities/Authorization';

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
                <OrderProgress currentStep={orderStatus} />
                <DeliveryLocationMap lati={orders?.deliveryLatitude} long={orders?.deliveryLongitude} />
                <OrderDetails OrderDetail={orders} />
            </div>
        </Modal>
    )
}