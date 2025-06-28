import React, { useState, useEffect } from 'react';
import { HiArrowNarrowLeft } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import AddAddressSection from './AddAddressSection';

const AddressDrawer = ({ show, onClose }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Add Address Drawer 
    const [showAddAddressSection, setShowAddAddressSection] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                            <button className="btn ps-3 btn-link text-success text-decoration-none fw-semibold p-0 pb-2" onClick={()=>setShowAddAddressSection(true)}>+ Add Address</button>
                        </div>
                        <div className="mb-3 ps-3 address-bottom-border pb-3">
                            <div className="fw-bold d-flex justify-content-between align-items-center">
                                <span className='fw-bold'>Home</span>
                                <span className='text-warning fs-5 pe-3' role='button'><MdDeleteOutline /></span>
                            </div>
                            <div className="text-muted">
                                Kakad Industrial Estate, 32, Sitaram Keer Marg,<br />
                                VSNL Colony, Mahim, Mumbai, Maharashtra 400016, India
                            </div>
                            {/* <button className="btn btn-sm btn-link text-danger p-0 mt-1">🗑</button> */}
                        </div>
                        <div className='ps-3'>
                            <div className="fw-bold d-flex justify-content-between align-items-center">
                                <span className='fw-bold'>Home</span>
                                <span className='text-warning fs-5 pe-3' role='button'><MdDeleteOutline /></span>
                            </div>
                            <div className="text-muted">
                                Kakad Industrial Estate, 32, Sitaram Keer Marg,<br />
                                VSNL Colony, Mahim, Mumbai, Maharashtra 400016, India
                            </div>
                            {/* <button className="btn btn-sm btn-link text-danger p-0 mt-1">🗑</button> */}
                        </div>
                    </div>
                </div>
            </div>
            <AddAddressSection isOpen={showAddAddressSection} onClose={() => setShowAddAddressSection(false)} />
        </>
    );
};

export default AddressDrawer;