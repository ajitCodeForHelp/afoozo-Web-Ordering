// ------------------------------
// DetailedNotificationPopup.jsx
// ------------------------------
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { HiArrowNarrowLeft } from "react-icons/hi";
import Loading from '../../CommonComponent/LoadingWait';

export default function OrderHistory({ show, onHide, setShowOrderDetail, setOrderId }) {
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getList = async () => {
        try {
            setIsLoading(true);
            const mobile = localStorage.getItem("mobileNo");
            const key = localStorage.getItem("secretKey");
            const BasicAuth = btoa(`${mobile}:${key}`);

            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/getOrderList/All/history/0/-1`, {
                headers: {
                    'Authorization': `Basic ${BasicAuth}`
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setList(getRes.responsePacket);
            }
        } catch (e) {
            console.log(e, "error in getList");
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (show) {
            getList();
        }
    }, [show]);

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const month = months[date.getMonth()];
        const day = String(date.getDate()).padStart(2, '0');

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');

        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12 || 12; // Convert to 12-hour format

        return `${month} ${day} ${hours}:${minutes} ${ampm}`;
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
            <div className="bg-white">
                <div className="promo-header sticky-top them-bg-black d-flex align-items-center justify-content-between">
                    <HiArrowNarrowLeft className="ri-arrow-left-line fs-4 text-white" onClick={onHide} role="button" />
                    <h5 className="text-white m-auto">Orders History</h5>
                    <span></span>
                </div>
                {
                    isLoading ? <Loading /> :
                        list?.length > 0 ?
                            list?.map((itm) => {
                                return (
                                    <>
                                        <div className="card shadow-sm p-3 m-3 rounded-4" style={{ maxWidth: 500 }} onClick={() => { setShowOrderDetail(true); setOrderId(itm?.orderReferenceId) }}>
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div className="pe-2">
                                                    <h6 className="fw-bold mb-1">{itm?.restaurantName}</h6>
                                                    <div className="text-muted small two-line-ellipsis">{itm?.deliveryAddress}</div>
                                                </div>
                                                {
                                                    itm?.orderType === "HomeDelivery" && <span className='bg-dark text-white px-3 py-2'>🛵</span> ||
                                                    itm?.orderType === "TakeAway" && <span className='bg-dark text-white px-3 py-2'>🧺</span> ||
                                                    itm?.orderType === "Cafe" && <span className='bg-dark text-white px-3 py-2'>☕</span>
                                                }
                                            </div>

                                            <div className="fw-semibold mt-2">₹{Number(itm?.orderTotal).toFixed(2)}</div>

                                            <hr className="my-2" />
                                            <div className="text-muted small mt-1">{formatTimestamp(itm?.orderDateTime)}</div>
                                            <div className="d-flex align-items-center justify-content-evenly">
                                                <button className='bg-dark text-white py-1 rounded-5 m-1 small cursor-pointer'>REORDER</button>
                                                <button className='bg-dark text-white py-1 rounded-5 m-1 small cursor-pointer'>FEEDBACK</button>
                                                <button className='bg-dark text-white py-1 rounded-5 m-1 small cursor-pointer'>TIP ORDER</button>
                                            </div>
                                            {/* <div className="text-dark fw-bold small">{itm?.orderItemText}</div> */}
                                        </div>
                                    </>
                                )
                            }) : <p className='text-center m-auto p-3'>No Order</p>
                }

            </div>
        </Modal>
    );
}