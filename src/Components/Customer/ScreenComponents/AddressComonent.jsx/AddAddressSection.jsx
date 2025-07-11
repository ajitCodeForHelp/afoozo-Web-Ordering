import React, { useRef, useState } from 'react';
import { HiArrowNarrowLeft } from "react-icons/hi";
import DraggableMap from './DraggableMap';
import LocationSearchDrawer from './LocationSearchDrawer';
// import { useJsApiLoader } from '@react-google-maps/api';


const libraries = ['places'];

const AddAddressSection = ({ isOpen, onClose }) => {

    const mapRef = useRef(null);
    const [address, setAddress] = useState('Drag map to select location');
    const [searchedAddress, setSearchedAddress] = useState('');
    // const [selectedLocation, setSelectedLocation] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    // const { isLoaded } = useJsApiLoader({
    //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    //     libraries,
    // });

    // if (!isLoaded) return <p>Loading Map Scripts...</p>;
    

    return (
        <>
            <div className={`add-address-overlay ${isOpen ? 'add-address-show' : ''}`} onClick={onClose} />
            <div className={`add-address-drawer ${isOpen ? 'add-address-open' : ''}`}>
                <div className="promo-header sticky-top them-bg-black d-flex align-items-center justify-content-between">
                    <HiArrowNarrowLeft className="ri-arrow-left-line fs-4 text-warning" onClick={onClose} role="button" />
                    <h5 className="text-warning m-auto">Add Address</h5>
                    <span></span>
                </div>
                <div className="add-address-body px-3 pb-4">
                    <div className="add-address-map mb-3 mt-2" ref={mapRef}>
                        <DraggableMap onLocationChange={setAddress} />
                    </div>

                    <div className="mb-3">
                        <input className="form-control add-address-input" placeholder="Room No./Flat No." />
                    </div>
                    <div className="mb-3">
                        <input className="form-control add-address-input" placeholder="Building Name" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Your Location</label>
                        <div className="form-control add-address-location" onClick={() => setDrawerOpen(true)}>
                            {address?.address}
                        </div>
                    </div>
                    <div className="mb-3 d-flex gap-2">
                        <button className="btn btn-outline-dark btn-sm add-address-tag">Home</button>
                        <button className="btn btn-outline-dark btn-sm add-address-tag">Work</button>
                        <button className="btn btn-dark btn-sm add-address-tag">Other</button>
                    </div>
                    <div className="mb-3">
                        <input className="form-control add-address-input" placeholder="Enter a nickname" />
                    </div>
                    <button className="btn btn-dark w-100 add-address-submit">SAVE & PROCEED</button>
                </div>
            </div>

            <LocationSearchDrawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                onSelect={(address) => setSearchedAddress(address)}
            />
        </>
    );
};

export default AddAddressSection;
