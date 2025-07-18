import React, { useState, useEffect } from 'react';
import { HiArrowNarrowLeft } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import AddAddressSection from './AddAddressSection';
import PopupModal from '../../CommonComponent/Modals/PopUpModal';

const AddressDrawer = ({ show, onClose }) => {

    const [addressList, setAddressList] = useState([]);

    const getAddressList = async () => {
        try {
            const mobile = localStorage.getItem("mobileNo");
            const key = localStorage.getItem("secretKey");
            const basicAuth = btoa(`${mobile}:${key}`);

            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/getAddressList`, {
                headers: {
                    "Authorization": `Basic ${basicAuth}`,
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setAddressList(getRes.responsePacket);
            }
        } catch (e) {
            console.log(e, "error in getAddress");
        }
    };

    useEffect(() => {
        if (show) {
            getAddressList();
        }
    }, [show]);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Add Address Drawer 
    const [showAddAddressSection, setShowAddAddressSection] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const [showPopup, setShowPopup] = useState(false);
    const [getID, setGetID] = useState('');

    const deleteAddress = async (addressId) => {
        try {
            const mobile = localStorage.getItem('mobileNo');
            const key = localStorage.getItem('secretKey');
            const BasicAuth = btoa(`${mobile}:${key}`);

            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/deleteAddress/${addressId}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Basic ${BasicAuth}`
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setShowPopup(false);
                getAddressList();
            }
        } catch (e) {
            console.log(e, "error in deleting address");
        }
    };

    const handleDelete = (id) => {
        setShowPopup(true);
        setGetID(id);
    };
    const handleConfirm = () => {
        deleteAddress(getID);
    };


    return (
        <>
            <div className={`drawer-overlay ${show ? 'show' : ''}`} onClick={onClose}>
                <div
                    className={`drawer-content ${isMobile ? 'mobile' : 'desktop'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="promo-header them-bg-black d-flex align-items-center justify-content-between">
                        <HiArrowNarrowLeft className="ri-arrow-left-line fs-4 text-warning" onClick={onClose} role="button" />
                        <h5 className="text-warning m-auto">Address</h5>
                        <span></span>
                    </div>
                    <div className="py-3">
                        <h6 className='fw-semibold ps-3 address-bottom-border pb-3'>Saved Address</h6>
                        <div className="address-bottom-border mb-3">
                            <button className="btn ps-3 btn-link text-success text-decoration-none fw-semibold p-0 pb-2" onClick={() => setShowAddAddressSection(true)}>+ Add Address</button>
                        </div>
                        {
                            addressList?.map((itm) => {
                                return (
                                    <>
                                        <div className="mb-3 ps-3 address-bottom-border pb-3">
                                            <div className="fw-bold d-flex justify-content-between align-items-center">
                                                <span className='fw-bold'>{itm.addressType}</span>
                                                <span className='text-warning fs-5 pe-3' role='button' onClick={() => handleDelete(itm?.recordId)}><MdDeleteOutline /></span>
                                            </div>
                                            <div className="text-muted">
                                                {itm.addressLine1}<br />
                                                {itm.addressLine2}
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <AddAddressSection isOpen={showAddAddressSection} onClose={() => setShowAddAddressSection(false)} />
            <PopupModal show={showPopup} onClose={() => setShowPopup(false)} message={"Would you like to delete this address ?"} onConfirm={handleConfirm} />
        </>
    );
};

export default AddressDrawer;