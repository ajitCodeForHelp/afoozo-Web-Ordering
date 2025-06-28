import React from 'react';
import { Modal } from 'react-bootstrap';
import { HiArrowNarrowLeft } from "react-icons/hi";
import { LuClock3 } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function DetailedNotificationPopup({ show, onHide }) {
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
                    <HiArrowNarrowLeft className="ri-arrow-left-line fs-4 text-warning" onClick={onHide} role="button" />
                    <h5 className="text-warning m-auto">Notification</h5>
                    <span></span>
                </div>

                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h6 className="fw-bold mb-2">Welcome</h6>
                        <p className="text-muted small mb-3">
                            Dear John, Welcome to Afoozo Smart Restaurant App, You have got Rs 100.00 as Welcome Bonus. Enjoy..!!
                        </p>

                        <div className="d-flex justify-content-start align-items-center gap-4">
                            <div className="d-flex align-items-center gap-2">
                                <LuClock3 size={16} className="text-muted" />
                                <span className="small fw-medium text-dark">10:08 am</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <FaRegCalendarAlt size={16} className="text-muted" />
                                <span className="small fw-medium text-dark">12 Jun, 2025</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}