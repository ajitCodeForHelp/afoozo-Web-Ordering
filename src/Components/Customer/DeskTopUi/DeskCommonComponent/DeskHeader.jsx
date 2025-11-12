import React, { useEffect, useState } from "react";
import SidebarDrawer from "../../CommonComponent/Drawer";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaWallet } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";

function DeskHeader({ handleSearch, balance }) {

    const [showDrawer, setShowDrawer] = useState(false);
    const navigate = useNavigate();
    const [search] = useSearchParams();
    const url = search.get("modal");
    useEffect(() => {
        // console.log("run oustSide");
        const drawer = url?.split(",") || [];
        const isOpen = drawer.includes("drawer");
        if (isOpen) {
            // console.log("run inSide");
            setShowDrawer(!showDrawer);
        } else if (!isOpen) {
            setShowDrawer(false);
        }

    }, [url]);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center p-3 sticky-top bg-white shadow-sm" style={{ backgroundColor: '#181818' }}>
                <div className="d-flex align-items-center gap-2">
                    <button className="bg-transparent border-0 fs-2 text-dark" style={{ marginTop: "-10px" }} onClick={() => navigate('?modal=drawer')} type="button">
                        <span className=""><RxHamburgerMenu /></span>
                    </button>
                    <span className="text-dark fw-bold fs-5">AFOOZO</span>
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
                    <input type="text" className="border-0 rounded-5 py-2 bg-light w-100 px-4" placeholder="Search" onChange={(e) => handleSearch(e.target.value)} />
                </div>

                <div className="d-flex gap-3 align-items-center">
                    {/* <button className="btn btn-link text-warning fw-semibold d-flex align-items-center gap-1 text-decoration-none">
                        <FaLocationDot className="text-warning" /> Locations
                    </button> */}
                    <div className="wallet d-flex align-items-center rounded-pill px-3 py-1">
                        <div className="wallet-icon d-flex align-items-center justify-content-center text-white fw-bold them-color bg-light rounded-pill">
                            <FaWallet className='text-dark' />
                        </div>
                        <span className="wallet-amount ms-2">₹{Number(balance).toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <SidebarDrawer isOpen={showDrawer} onClose={() => navigate(-1)} />
        </>
    )
};
export default DeskHeader;