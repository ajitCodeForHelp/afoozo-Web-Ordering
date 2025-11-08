import React, { useContext, useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Container, Row, Col } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";
import SidebarDrawer from "../../CommonComponent/Drawer";
import { RxHamburgerMenu } from "react-icons/rx";
// import { FaWallet } from "react-icons/fa";
import AddressDrawer from "../AddressComonent.jsx/AddressSection";
import { useCart } from "../../../../Utilities/CartProvider";
import useIsMobile from "../../../../Utilities/IsMobile";
import { Authorization } from "../../../../Utilities/Authorization";
import logo from "../../../../Assets/notification_icon-removebg-preview.png";

function Nav() {
    const [showDrawer, setShowDrawer] = useState(false);
    const { cart, dispatch } = useCart();
    // address
    const [showAddressDrawer, setShowAddressDrawer] = useState(false);

    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                    .then(res => res.json())
                    .then(data => {
                        saveCurrentAdd(data)
                    });
            },
            (error) => {
                console.error("Location error:", error);
            }
        );
    };

    const getAddressList = async () => {
        try {
            // const mobile = localStorage.getItem("mobileNo");
            // const key = localStorage.getItem("secretKey");
            // const basicAuth = btoa(`${mobile}:${key}`);
            const BasicAuth = Authorization();

            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/getAddressList`, {
                headers: {
                    "Authorization": `Basic ${BasicAuth}`,
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0 && getRes.responsePacket?.length > 0) {
                if (!cart?.address) {
                    dispatch({
                        type: "SET_ADDRESS",
                        payload: getRes.responsePacket[0]
                    });
                }

            } else if (getRes.responsePacket?.length === 0) {
                getCurrentLocation();
            }
        } catch (e) {
            console.log(e, "error in getAddress");
        }
    };

    useEffect(() => {
        if (!cart?.address) {
            getAddressList();
        }
    }, []);

    const saveCurrentAdd = async (address) => {
        const payload = {
            addressLine1: address?.display_name || '',
            addressLine2: '',
            addressLine3: '',
            addressType: address?.addresstype, // or 'Work', or get from user input
            cityFullName: address?.address.county,
            cityId: 0, // depends on your DB
            countryFullName: address?.country || '',
            countryId: 0, // depends on your DB
            latitude: address.lat,
            longitude: address.lon,
            recordId: 0,
            stateFullName: address?.address?.state || '',
            stateId: address?.place_id,
        };
        try {
            // const mobile = localStorage.getItem("mobileNo");
            // const key = localStorage.getItem("key");
            // const BasicAuth = btoa(`${mobile}:${key}`);
            const BasicAuth = Authorization();
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/saveAddress`, {
                method: "POST",
                headers: {
                    'Authorization': `Basic ${BasicAuth}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                getAddressList();
            }
        } catch (e) {
            console.log(e, "error in save api")
        }
    };

    const isMobile = useIsMobile();

    const handleUpdateAddress = (address) => {
        dispatch({
            type: "SET_ADDRESS",
            payload: address
        });
        setShowAddressDrawer(false);
    };

    const [balance, setBalance] = useState('');
    const walletBalance = async () => {
        try {
            const BasicAuth = Authorization();
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/getBalance`, {
                headers: {
                    'Authorization': `basic ${BasicAuth}`
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setBalance(getRes.responsePacket);
            }
        } catch (e) {
            console.log(e, "error in walletBalance Api");
        }
    };
    useEffect(() => {
        walletBalance();
    }, []);

    return (
        <>
            <div className={`d-flex justify-content-between align-items-center px-3 ${isMobile ? "py-2" : "py-3"} sticky-top bg-dark shadow-sm`}>
                <div className="d-flex align-items-center gap-2">
                    <button className="bg-transparent border-0 fs-2 text-white" style={{ marginTop: "-10px" }} onClick={() => setShowDrawer(!showDrawer)} type="button">
                        <span className=""><RxHamburgerMenu /></span>
                    </button>
                </div>
                <span className="text-white fw-bold fs-5">AFOOZO</span>
                <span className="wallet-amount text-white ms-2"></span>
                {/* ₹{Number(balance).toFixed(2)} */}
                {/* <div className={`d-flex gap-3 align-items-center ${isMobile ? "w-60" : "w-35"}`} >
                    <button className={`btn btn-link text-dark fw-semibold d-flex  ${isMobile ? "align-items-start" : "gap-1 align-items-center"} text-decoration-none fs-6`} onClick={() => setShowAddressDrawer(true)}>
                        <span className={`${isMobile ? "current-address-ellipsis-2" : "current-address-ellipsis"} small fw-semibold`}><span className="me-2"><FaLocationDot /></span>{cart?.address ? cart.address.addressLine1 : "Select Address"}</span>
                    </button>
                    <div className="wallet d-flex align-items-center rounded-pill px-3 py-1">
                        <div className="wallet-icon d-flex align-items-center justify-content-center text-white fw-bold them-color bg-light rounded-pill">
                            <FaWallet className='text-warning' />
                        </div>
                        <span className="wallet-amount ms-2">₹124.50</span>
                    </div>
                </div> */}
            </div>
            {/* <div className="d-flex px-2"> */}
            {/* <div className="d-flex align-items-center gap-2">
                    <img src={logo} alt="img" className="w-50" />
                    <span className="fs-6">Menu is for</span>
                </div>
                <div className="d-flex gap-2">
                    <span className="">
                        <FaLocationDot />
                    </span>
                    <span className="">

                    </span>
                </div> */}
            {/* <button className={`btn btn-link text-dark fw-semibold d-flex  ${isMobile ? "align-items-start" : "gap-1 align-items-center"} text-decoration-none fs-6`} onClick={() => setShowAddressDrawer(true)}>
                    <span className={`${isMobile ? "current-address-ellipsis-2" : "current-address-ellipsis"} small fw-semibold`}>
                        <span className="me-2">
                            <FaLocationDot />
                        </span>
                        {cart?.address ? cart.address.addressLine1 : "Select Address"}
                    </span>
                </button> */}
            {/* </div> */}

            {/* <div className="container-fluid py-2 sticky-top bg-white" style={{ top: isMobile ? "46px" : "72px" }}>
                <div className={`d-flex align-items-center justify-content-${isMobile ? "start" : "between"} gap-2`}>

                    <div className="d-flex align-items-center justify-content-start">
                        <img
                            src={logo}
                            alt="Logo"
                            style={{ width: "28px", height: "28px", marginRight: "5px" }}
                        />
                        <span className="fs-10 fw-semibold">Menu is for</span>
                    </div>

                    <div className="d-flex align-items-center justify-content-end" onClick={() => setShowAddressDrawer(true)}>
                        <FaLocationDot width={"22px"} height={"22px"} className="me-1" />
                        <div className={`${isMobile && "w-100"}`}>
                            <span className="fw-bold fs-10">Change Location</span>
                            <div className="text-muted small two-line-ellipsis fs-10">
                                {cart?.address ? cart.address.addressLine1 : "Select Address"}
                            </div>
                        </div>
                    </div>

                </div>
            </div> */}

            <div className="header py-2 px-1 shadow-sm bg-white sticky-top" style={{ top: isMobile ? "46px" : "72px" }}>
                <Container fluid>
                    <Row className="align-items-center justify-content-between flex-nowrap">
                        {/* Logo */}
                        <Col xs="auto" className="d-flex align-items-center">
                            <img
                                src={logo} // replace with your logo
                                alt="Logo"
                                className="header-logo me-2"
                            />
                            <span className={`fw-semiblod mb-0 ${isMobile ? "fs-12" : "fs-6"}`}>Menu is for</span>
                        </Col>

                        {/* Location */}
                        <Col xs="auto" className="d-flex align-items-center" onClick={() => setShowAddressDrawer(true)}>
                            <FaMapMarkerAlt size={20} className="me-2 text-dark" />
                            <div className="location-text">
                                <span className="fw-semibold small">Change Location</span>
                                <div className="text-muted small address-text">
                                    {cart?.address ? cart.address.addressLine1 : "Select Address"}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <SidebarDrawer isOpen={showDrawer} onClose={() => setShowDrawer(!showDrawer)} />
            <AddressDrawer show={showAddressDrawer} onClose={() => setShowAddressDrawer(false)} handleUpdateAddress={handleUpdateAddress} />
        </>
    );
};
export default Nav;