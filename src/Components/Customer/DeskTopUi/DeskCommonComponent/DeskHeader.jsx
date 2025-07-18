import React, { useState } from "react";
import { Dropdown } from 'react-bootstrap';
import { FaLocationDot } from "react-icons/fa6";
import SidebarDrawer from "../../CommonComponent/Drawer";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaWallet } from "react-icons/fa";

function DeskHeader() {
    const [showDrawer, setShowDrawer] = useState(false);
    return (
        <>
            <div className="d-flex justify-content-between align-items-center p-3 sticky-top" style={{ backgroundColor: '#181818' }}>
                <div className="d-flex align-items-center gap-2">
                    <button className="bg-transparent border-0 fs-2 text-warning" style={{ marginTop: "-10px" }} onClick={() => setShowDrawer(!showDrawer)} type="button">
                        <span className=""><RxHamburgerMenu /></span>
                    </button>
                    <span className="text-warning fw-bold fs-5">AFOOZO</span>
                </div>

                {/* <div className="w-50">
                    <Dropdown>
                        <Dropdown.Toggle variant="light" className="w-100 text-start">
                            Pyramid Hisar
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="w-100">
                            <Dropdown.Item>Pyramid Delhi</Dropdown.Item>
                            <Dropdown.Item>Pyramid Chandigarh</Dropdown.Item>
                            <Dropdown.Item>Pyramid Mumbai</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div> */}
                <div className="w-50">
                    <input type="text" className="border-0 rounded-5 py-2 bg-white w-100 px-4" placeholder="Search" />
                </div>

                <div className="d-flex gap-3 align-items-center">
                    {/* <button className="btn btn-link text-warning fw-semibold d-flex align-items-center gap-1 text-decoration-none">
                        <FaLocationDot className="text-warning" /> Locations
                    </button> */}
                    <div className="wallet d-flex align-items-center rounded-pill px-3 py-1">
                        <div className="wallet-icon d-flex align-items-center justify-content-center text-white fw-bold them-color bg-light rounded-pill">
                            <FaWallet className='text-warning' />
                        </div>
                        <span className="wallet-amount ms-2">₹124.50</span>
                    </div>
                </div>
            </div>
            <SidebarDrawer isOpen={showDrawer} onClose={() => setShowDrawer(!showDrawer)} />
        </>
    )
};
export default DeskHeader;