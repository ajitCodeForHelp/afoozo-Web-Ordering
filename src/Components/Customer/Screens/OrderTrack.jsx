import React, { useEffect } from "react";
import OrderProgress from "../ScreenComponents/OrderTrackComponent/OrderProgress";
import DeliveryLocationMap from "../ScreenComponents/OrderTrackComponent/DeliveryLocationMap";
import OrderDetails from "../ScreenComponents/OrderTrackComponent/OrderDetail";

function OrderTrack() {
    const verifyPayment = async (orderReferenceId) => {
        try {
            const mobile = localStorage.getItem("mobileNo");
            const key = localStorage.getItem('secretKey');
            const BasicAuth = btoa(`${mobile}:${key}`);

            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/cashFree/verifiedPayment/${orderReferenceId}`, {
                headers: {
                    'Authorization': `Basic ${BasicAuth}`
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {

            }
        } catch (e) {
            console.log(e, "error in verifying");
        }
    };

    useEffect(() => {
        const orderId = localStorage.getItem("orderRefId");
        verifyPayment(orderId);
    }, []);

    return (
        <>
            <OrderProgress currentStep={2} />
            <DeliveryLocationMap lati="28.6139" long="77.2090" />
            <OrderDetails />
        </>
    )
}

export default OrderTrack;