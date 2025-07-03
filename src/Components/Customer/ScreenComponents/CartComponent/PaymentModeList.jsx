import React, { useEffect, useRef, useState } from 'react';
import { HiArrowNarrowLeft } from "react-icons/hi";

const PaymentMode = ({ visible, onClose, orderType, orderTotal }) => {
    const promoRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (promoRef.current && !promoRef.current.contains(event.target)) {
                onClose(); // close cart
            }
        };
        if (visible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [visible, onClose]);

    const [payModeList, setPayModeList] = useState([]);
    const modeList = async () => {
        try {
            const mobile = localStorage.getItem("mobileNo");
            const key = localStorage.getItem("secretKey");
            const BasicAuth = btoa(`${mobile}:${key}`);

            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/getPaymentGatewayList/${orderType}`, {
                headers: {
                    'Authorization': `Basic ${BasicAuth}`
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setPayModeList(getRes.responsePacket);
            }
        } catch (e) {
            console.log(e, "error in mode list");
        }
    };

    useEffect(() => {
        if (visible) {
            modeList();
        }
    }, [visible]);

    return (
        <div className={`promo-panel ${visible ? 'show' : ''}`} ref={promoRef}>
            <div className="promo-header them-bg-black d-flex align-items-center justify-content-between">
                <HiArrowNarrowLeft className="ri-arrow-left-line fs-4 text-warning" onClick={onClose} role="button" />
                <h5 className="text-warning m-auto">Choose Payment Mode</h5>
                <span></span>
            </div>

            <div className="promo-body px-3 pt-4">
                <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
                    <h4 className=''>Pay: ₹{orderTotal}</h4>
                </div>
                <div className="">
                    {
                        payModeList.map((itm) => {
                            return (
                                <>
                                    <div className="d-flex justify-content-start">
                                        <div className="">{itm}</div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default PaymentMode;
