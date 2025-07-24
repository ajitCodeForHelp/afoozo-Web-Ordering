import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { HiArrowNarrowLeft } from "react-icons/hi";
import { FaQrcode } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { BsCalendarEvent } from "react-icons/bs";
import useIsMobile from "../../../../Utilities/IsMobile";

function Wallet({ show, onHide }) {
    const quickAmounts = [2000, 5000, 10000];
    const [activeTab, setActiveTab] = useState("add");
    const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [walletTransition, setWalletTransition] = useState([]);
    const getWalletTransition = async (stDate, enDate) => {
        try {
            const mobile = localStorage.getItem('mobileNo');
            const key = localStorage.getItem("secretKey");
            const BasicAuth = btoa(`${mobile}:${key}`);
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/getWalletTransactionListData/0/-1/${stDate}/${enDate}`, {
                headers: {
                    'Authorization': `Basic ${BasicAuth}`
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setWalletTransition(getRes.responsePacket);
            }
        } catch (e) {
            console.log(e, "error in getWallet Transtion List Api");
        }
    };

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [coinTransition, setCoinTransition] = useState([]);
    const getCoinTransition = async (stDate, enDate) => {
        try {
            const mobile = localStorage.getItem('mobileNo');
            const key = localStorage.getItem("secretKey");
            const BasicAuth = btoa(`${mobile}:${key}`);
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/getCoinTransactionListData/0/-1/${stDate}/${enDate}`, {
                headers: {
                    'Authorization': `Basic ${BasicAuth}`
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setCoinTransition(getRes.responsePacket);
            }
        } catch (e) {
            console.log(e, "error in coin Transtion List Api");
        }
    };

    const walletData = () => {
        if (!fromDate && !toDate) {
            setFromDate(today);
            setToDate(today);
            getWalletTransition(dateToTimestamp(today), dateToTimestamp(today));
        }
    };

    const coinData = () => {
        if (!startDate && !endDate) {
            setStartDate(today);
            setEndDate(today);
            getCoinTransition(dateToTimestamp(today), dateToTimestamp(today));
        }
    };

    function dateToTimestamp(dateStr) {
        return new Date(dateStr).getTime();
    };
    const handleGo = (transition) => {
        if (transition === "coin" && startDate && endDate) {
            getCoinTransition(dateToTimestamp(startDate), dateToTimestamp(endDate));
        } else if (transition === "wallet" && fromDate && toDate) {
            getWalletTransition(dateToTimestamp(fromDate), dateToTimestamp(toDate));
        } else {
            alert("select date first !");
        };
    };

    const [balance, setBalance] = useState({});
    const getBalance = async () => {
        try {
            const mobile = localStorage.getItem('mobileNo');
            const key = localStorage.getItem("secretKey");
            const BasicAuth = btoa(`${mobile}:${key}`);

            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/getCoinAndWalletBalance`, {
                headers: {
                    'Authorization': `Basic ${BasicAuth}`,
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setBalance(getRes.responsePacket);
            }
        } catch (e) {
            console.log(e, "error in getBalance");
        }
    };
    useEffect(() => {
        if (show) {
            getBalance();
        };
    }, [show]);

    function formatTime(timestamp) {
        const date = new Date(timestamp);
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12 || 12; // convert to 12-hour format
        return `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
    };

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    const isMobile = useIsMobile();
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
                <div className="pb-4">
                    <div className="promo-header sticky-top them-bg-black d-flex align-items-center justify-content-between">
                        <HiArrowNarrowLeft className="ri-arrow-left-line fs-4 text-white" onClick={onHide} role="button" />
                        <h5 className="text-white m-auto">Wallet</h5>
                        <span></span>
                    </div>

                    <div className="wallet-card bg-white rounded-4 shadow mx-3 p-3 d-flex align-items-center justify-content-between">
                        <div>
                            <p className="text-secondary mb-1 small">Wallet balance</p>
                            <h5 className="text-dark fw-bold">₹{Number(balance?.walletBalance).toFixed(2)}</h5>
                        </div>
                        <div>
                            <p className="text-secondary mb-1 small">Coin balance</p>
                            <h5 className="text-dark fw-bold">₹{Number(balance?.coinBalance).toFixed(2)}</h5>
                        </div>
                        <div>
                            <FaQrcode size={28} className="text-dark" />
                        </div>
                    </div>

                    <div className="wallet-tabs d-flex justify-content-around border-bottom bg-white">
                        <button
                            className={`wallet-tab-btn ${activeTab === "add" ? "active" : ""}`}
                            onClick={() => setActiveTab("add")}
                        >
                            ADD ₹
                        </button>
                        <button
                            className={`wallet-tab-btn ${activeTab === "wallet" ? "active" : ""}`}
                            onClick={() => { setActiveTab("wallet"); walletData() }}
                        >
                            WALLET HISTORY ₹
                        </button>
                        <button
                            className={`wallet-tab-btn ${activeTab === "coin" ? "active" : ""}`}
                            onClick={() => { setActiveTab("coin"); coinData() }}
                        >
                            COIN HISTORY ₹
                        </button>
                    </div>

                    {activeTab === "add" && <div className="wallet-add-box shadow rounded-4 mx-3 p-3 mt-3 bg-white">
                        <div className="d-flex align-items-center mb-3">
                            <FaWallet className="me-2 text-dark" />
                            <h6 className="mb-0 fw-bold">Add ₹ To Your Wallet</h6>
                        </div>

                        <input
                            type="number"
                            placeholder="Enter Amount"
                            // value={amount}
                            // onChange={(e) => setAmount(e.target.value)}
                            className="form-control add-amount-input mb-3"
                        />

                        <div className="quick-amounts d-flex justify-content-between mb-4">
                            {quickAmounts.map((amt) => (
                                <button
                                    key={amt}
                                    className="btn btn-outline-dark quick-btn"
                                // onClick={() => handleQuickAmount(amt)}
                                >
                                    +{amt}
                                </button>
                            ))}
                        </div>

                        <button className="btn btn-dark text-white w-100 rounded-pill fw-bold py-2">
                            ADD SECURELY
                        </button>
                    </div>}
                    {
                        activeTab === "wallet" &&
                        <>
                            <div className="wallet-date-filter bg-white mx-3 p-2 py-3 mt-3 rounded-4 d-flex align-items-center justify-content-evenly gap-1 flex-wrap">

                                <div className="date-box d-flex align-items-center">
                                    <input
                                        type="date"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                        className={`date-input bg-white ${isMobile ? "fs-12" : "small"}`}
                                    />
                                    {/* <span className="calendar-emoji ms-2">📅</span> */}
                                </div>

                                <div className="date-box d-flex align-items-center ">
                                    <input
                                        type="date"
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                        className={`date-input bg-white ${isMobile ? "fs-12" : "small"}`}
                                    />
                                    {/* <span className="calendar-emoji ms-2">📅</span> */}
                                </div>

                                <button
                                    className={`rounded-3 px-2 py-1 bg-dark border-0 text-white ${isMobile ? "fs-12 fw-semibold" : "fw-semibold small"}`}
                                    onClick={() => handleGo("wallet")}
                                >
                                    GO
                                </button>
                            </div>
                            <div className="wallet-trans-list">
                                {
                                    walletTransition?.map((itm) => {
                                        return (
                                            <>
                                                <div className="card shadow-sm p-3 m-3 rounded-4" style={{ maxWidth: 500 }}>
                                                    <div className="mb-2">
                                                        <h6 className="fw-bold mb-1">{itm?.transactionReferenceId}</h6>
                                                        <div className="text-muted small">
                                                            {/* 59.0 has been paid for Order ID{" "}
                                                        <span className="text-primary">ORD-0000406254</span> in{" "}
                                                        <span className="text-primary">Ginger Agartala</span> */}
                                                            {itm?.remark}
                                                        </div>
                                                    </div>

                                                    <div className="d-flex justify-content-between mb-2">
                                                        <div className="text-dark small">
                                                            <strong>Type:</strong> {itm?.transactionType}
                                                        </div>
                                                        <div className="text-dark small">
                                                            <strong>Amount:</strong> ₹{itm?.transactionAmount}
                                                        </div>
                                                    </div>
                                                    <hr className="my-2" />
                                                    <div className="d-flex justify-content-between align-items-center text-muted small mt-2">
                                                        <div className="d-flex align-items-center">
                                                            <BsClock className="me-1" />
                                                            {formatTime(itm?.createdAtTimeStamp)}
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <BsCalendarEvent className="me-1" />
                                                            {formatDate(itm?.createdAtTimeStamp)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </>
                    }

                    {
                        activeTab === "coin" &&
                        <>
                            <div className="wallet-date-filter bg-white mx-3 p-2 py-3 mt-3 rounded-4 d-flex align-items-center justify-content-evenly gap-1 flex-wrap">

                                <div className="date-box d-flex align-items-center">
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className={`date-input bg-white ${isMobile ? "fs-12" : "small"}`}
                                    />
                                    {/* <span className="calendar-emoji ms-2">📅</span> */}
                                </div>

                                <div className="date-box d-flex align-items-center ">
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className={`date-input bg-white ${isMobile ? "fs-12" : "small"}`}
                                    />
                                    {/* <span className="calendar-emoji ms-2">📅</span> */}
                                </div>

                                <button
                                    className={`rounded-3 px-2 py-1 bg-dark border-0 text-white ${isMobile ? "fs-12 fw-semibold" : "fw-semibold small"}`}
                                    onClick={() => handleGo("coin")}
                                >
                                    GO
                                </button>
                            </div>
                            <div className="wallet-trans-list">
                                {
                                    coinTransition?.map((itm) => {
                                        return (
                                            <>
                                                <div className="card shadow-sm p-3 m-3 rounded-4" style={{ maxWidth: 500 }}>
                                                    <div className="mb-2">
                                                        <h6 className="fw-bold mb-1">{itm?.transactionReferenceId}</h6>
                                                        <div className="text-muted small">
                                                            {/* 59.0 has been paid for Order ID{" "}
                                                        <span className="text-primary">ORD-0000406254</span> in{" "}
                                                        <span className="text-primary">Ginger Agartala</span> */}
                                                            {itm?.remark}
                                                        </div>
                                                    </div>

                                                    <div className="d-flex justify-content-between mb-2">
                                                        <div className="text-dark small">
                                                            <strong>Type:</strong> {itm?.transactionType}
                                                        </div>
                                                        <div className="text-dark small">
                                                            <strong>Amount:</strong> ₹{itm?.transactionAmount}
                                                        </div>
                                                    </div>
                                                    <hr className="my-2" />
                                                    <div className="d-flex justify-content-between align-items-center text-muted small mt-2">
                                                        <div className="d-flex align-items-center">
                                                            <BsClock className="me-1" />
                                                            {formatTime(itm?.createdAtTimeStamp)}
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <BsCalendarEvent className="me-1" />
                                                            {formatDate(itm?.createdAtTimeStamp)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </>
                    }

                </div>
            </Modal>
        </>
    )
};
export default Wallet;