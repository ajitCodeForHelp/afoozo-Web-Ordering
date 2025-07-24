import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import { HiArrowNarrowLeft } from "react-icons/hi";

function BillToOrders({ show, onHide }) {

    const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
    const [fromDate, setFromDate] = useState(today);
    const [toDate, setToDate] = useState(today);

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
                <div className="pb-3">
                    <div className="promo-header sticky-top them-bg-black d-flex align-items-center justify-content-between">
                        <HiArrowNarrowLeft className="ri-arrow-left-line fs-4 text-white" onClick={onHide} role="button" />
                        <h5 className="text-white m-auto">Bill To Company Orders</h5>
                        <span></span>
                    </div>
                    <div className="d-flex justify-content-evenly align-items-center p-3">
                        <button className="border-0 rounded-4 px-3 py-2 shadow-sm bg-white">Total orders</button>
                        <button className="border-0 rounded-4 px-3 py-2 shadow-sm bg-white">Total BTC</button>
                    </div>
                    <div className="wallet-date-filter bg-white mx-3 p-3 mt-3 rounded-4 d-flex align-items-center justify-content-between gap-2 flex-wrap">

                        <div className="date-box d-flex align-items-center">
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="date-input"
                            />
                            {/* <span className="calendar-emoji ms-2">📅</span> */}
                        </div>

                        <div className="date-box d-flex align-items-center ">
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="date-input"
                            />
                            {/* <span className="calendar-emoji ms-2">📅</span> */}
                        </div>

                        <button
                            className="btn go-btn bg-dark text-white fw-bold ms-md-3 mt-2"
                        // onClick={() => onGo(fromDate, toDate)}
                        >
                            GO
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
};
export default BillToOrders;