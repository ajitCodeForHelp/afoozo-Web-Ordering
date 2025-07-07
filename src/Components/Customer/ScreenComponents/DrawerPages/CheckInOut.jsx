import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import { HiArrowNarrowLeft } from "react-icons/hi";

function CheckInOut({ show, onHide }) {
    const [activeTab, setActiveTab] = useState("checkIn");
    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                centered
                backdrop="static"
                keyboard={false}
                dialogClassName="profile-modal modal-dialog-scrollable modal-fullscreen-sm-down"
            >
                <div className="">
                    <div className="promo-header sticky-top them-bg-black d-flex align-items-center justify-content-between">
                        <HiArrowNarrowLeft className="ri-arrow-left-line fs-4 text-warning" onClick={onHide} role="button" />
                        <h5 className="text-warning m-auto">Check -In</h5>
                        <span></span>
                    </div>
                    <div className="wallet-tabs d-flex justify-content-around border-bottom bg-white">
                        <button
                            className={`wallet-tab-btn ${activeTab === "checkIn" ? "active" : ""}`}
                            onClick={() => setActiveTab("checkIn")}
                        >
                            CHECK -IN
                        </button>
                        <button
                            className={`wallet-tab-btn ${activeTab === "checkOut" ? "active" : ""}`}
                            onClick={() => setActiveTab("checkOut")}
                        >
                            CHECKOUT
                        </button>

                    </div>
                </div>
            </Modal>
        </>
    )
};
export default CheckInOut;