import React from "react";
import { BsHouseDoor, BsTruck, BsFillPersonFill } from 'react-icons/bs';
import { MdDeliveryDining } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { FaTruckMoving } from "react-icons/fa";

function BottomNav({ orderType, setOrderType }) {
    return (
        <>
            <div className="fixed-bottom bg-white shadow-sm border-top d-flex justify-content-around py-2 mb-0" >
                <div className={`text-center ${orderType === "Cafe" ? `text-dark` : "text-muted"}`} onClick={() => setOrderType("Cafe")}>
                    {orderType === "Cafe" ? <><GoHomeFill /> <div className="small fw-bold">Home</div></> :
                        <><BsHouseDoor /> <div className="small">Home</div></>}
                </div>
                <div className={`text-center ${orderType === "HomeDelivery" ? `text-dark` : "text-muted"}`} onClick={() => setOrderType("HomeDelivery")} >

                    {orderType === "HomeDelivery" ?
                        <><MdDeliveryDining /> <div className="small fw-bold">Home Delivery</div></> :
                        <><MdDeliveryDining /> <div className="small">Home Delivery</div></>
                    }
                </div>
                <div className={`text-center ${orderType === "TakeAway" ? `text-dark` : "text-muted"}`} onClick={() => setOrderType("TakeAway")}>

                    {orderType === "TakeAway" ?
                        <><FaTruckMoving /> <div className="small fw-bold">TakeAway</div></> :
                        <><BsTruck /> <div className="small">TakeAway</div></>
                    }
                </div>
                <div className={`text-center ${orderType === "DineIn" ? `text-dark` : "text-muted"}`} onClick={() => setOrderType("DineIn")}>

                    {orderType === "DineIn" ?
                        <><BsFillPersonFill /> <div className="small bold">Dine-in</div></> :
                        <><BsFillPersonFill /> <div className="small">Dine-in</div></>
                    }
                </div>
            </div>
        </>
    )
}

export default BottomNav;