import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { HiArrowNarrowLeft } from "react-icons/hi";
import { LuClock3 } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import Loading from '../../CommonComponent/LoadingWait';

export default function DetailedNotificationPopup({ show, onHide }) {
    const [notifiList, setNotifiList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const getList = async () => {
        try {
            setIsLoading(true);
            const mobile = localStorage.getItem('mobileNo');
            const key = localStorage.getItem("secretKey");
            const BasicAuth = btoa(`${mobile}:${key}`);
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/getNotificationList/ALL`, {
                headers: {
                    'Authorization': `Basic ${BasicAuth}`
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setNotifiList(getRes.responsePacket);
            }
        } catch (e) {
            console.log(e, "error in notification list");
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (show) {
            getList();
        }
    }, [show]);

    function getFormattedDate(timestamp) {
        const dateObj = new Date(timestamp);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = dateObj.toLocaleString('en-US', { month: 'short' }); // "Jul"
        const year = dateObj.getFullYear();
        return `${day} ${month} ${year}`; // e.g., "12 Jul 2025"
    };
    function getFormattedTime(timestamp) {
        const dateObj = new Date(timestamp);
        return dateObj.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true, // AM/PM
        }); // e.g., "12:28 PM"
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
                    <h5 className="text-white m-auto">Notification</h5>
                    <span></span>
                </div>

                {isLoading ? <Loading /> : notifiList?.map((item) => {
                    return (
                        <>
                            <div className="card shadow-sm border-0 m-2">
                                <div className="card-body">
                                    <h6 className="fw-bold mb-2">{item?.notificationTitle}</h6>
                                    <p className="text-muted small mb-3">
                                        {item?.notificationMessage}
                                    </p>
                                    <hr className='my-2' />
                                    <div className="d-flex justify-content-start align-items-center gap-4">
                                        <div className="d-flex align-items-center gap-2">
                                            <LuClock3 size={16} className="text-muted" />
                                            <span className="small fw-medium text-dark">{getFormattedTime(item?.createdAt)}</span>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <FaRegCalendarAlt size={16} className="text-muted" />
                                            <span className="small fw-medium text-dark">{getFormattedDate(item?.createdAt)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </Modal>
    );
}