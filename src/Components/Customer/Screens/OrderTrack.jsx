import React, { useEffect, useState } from "react";
import OrderProgress from "../ScreenComponents/OrderTrackComponent/OrderProgress";
import DeliveryLocationMap from "../ScreenComponents/OrderTrackComponent/DeliveryLocationMap";
import OrderDetails from "../ScreenComponents/OrderTrackComponent/OrderDetail";
import { HiArrowNarrowLeft } from "react-icons/hi";
import MessagePopup from "../CommonComponent/Modals/MessagePopup";
import { useNavigate } from "react-router-dom";

function OrderTrack() {
    const verifyPayment = async (orderReferenceId) => {
        try {
            const mobile = localStorage.getItem("mobileNo");
            const key = localStorage.getItem('secretKey');
            const BasicAuth = btoa(`${mobile}:${key}`);
            const orderData = JSON.parse(localStorage.getItem("orderData"));

            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/cashFree/verifiedPayment/${orderReferenceId}`, {
                headers: {
                    'Authorization': `Basic ${BasicAuth}`
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                updatePaymentReq(orderData?.orderId, getRes.responsePacket, orderData?.orderTotal, orderData?.specialInstruction);
            };
        } catch (e) {
            console.log(e, "error in verifying");
        }
    };

    useEffect(() => {
        const orderData = JSON.parse(localStorage.getItem("orderData"));
        verifyPayment(orderData.orderId);
    }, []);

    const updatePaymentReq = async (orderId, txStatus, orderAmount, specialInstruction) => {
        try {
            const mobile = localStorage.getItem("mobileNo");
            const key = localStorage.getItem("secretKey");
            const BasicAuth = btoa(`${mobile}:${key}`);
            const paymentType = localStorage.getItem("paymentType");

            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/updatePaymentRequestForCashFreeV2`, {
                method: "POST",
                headers: {
                    'Authorization': `Basic ${BasicAuth}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderId: orderId,
                    referenceId: orderId,
                    txStatus: txStatus,
                    paymentGateway: paymentType,
                    orderAmount: orderAmount,
                })
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                placeOrder(orderId, specialInstruction, orderAmount, paymentType);
            }
        } catch (e) {
            console.log(e, "error in update payment api");
        }
    };

    const [showMessagePopup, setShowMessagePopup] = useState(false);
    const [message, setMessage] = useState('');
    const placeOrder = async (orderReferenceId, specialInstruction, paidByWallet, paymentType) => {
        try {
            const mobile = localStorage.getItem("mobileNo");
            const key = localStorage.getItem("secretKey");
            const BasicAuth = btoa(`${mobile}:${key}`);

            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/placeOrder/${orderReferenceId}`, {
                method: "POST",
                headers: {
                    'Authorization': `Basic ${BasicAuth}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    specialInstruction: specialInstruction,
                    paidOnDelivery: 0,
                    paidByWallet: paidByWallet,
                    paymentType: paymentType
                })
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setShowMessagePopup(true);
                setMessage(getRes.message);
                orderDetail(orderReferenceId);
            } else if (getRes.message === "This order has already been processed.") {
                orderDetail(orderReferenceId);
            } else {
                setShowMessagePopup(true);
                setMessage(getRes.message);
            }
        } catch (e) {
            console.log(e, 'error in place order');
        }
    };

    const [orders, setOrders] = useState([]);

    const orderDetail = async (orderReferenceId) => {
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

    const navigate = useNavigate();

    return (
        <>
            <div className="promo-header sticky-top them-bg-black d-flex align-items-center justify-content-between">
                <HiArrowNarrowLeft className="ri-arrow-left-line fs-4 text-white" role="button" onClick={() => navigate("/")} />
                <h5 className="text-white m-auto">Order Track</h5>
                <span></span>
            </div>
            <OrderProgress currentStep={2} />
            {/* <DeliveryLocationMap lati="28.6139" long="77.2090" /> */}
            <OrderDetails OrderDetail={orders} />
            <MessagePopup show={showMessagePopup} message={message} onClose={() => setShowMessagePopup(false)} />
        </>
    )
}

export default OrderTrack;