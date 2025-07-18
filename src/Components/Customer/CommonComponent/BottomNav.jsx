import React from "react";
import { BsHouseDoor, BsTruck, BsFillPersonFill } from 'react-icons/bs';
import { MdDeliveryDining } from "react-icons/md";

function BottomNav({ orderType, setOrderType }) {
    return (
        <>
            <div className="fixed-bottom bg-dark border-top d-flex justify-content-around py-2 mb-0" >
                <div className={`text-center ${orderType === "Cafe" ? `text-warning` : "text-white"}`} onClick={() => setOrderType("Cafe")}><BsHouseDoor /> <div className="small">Home</div></div>
                <div className={`text-center ${orderType === "HomeDelivery" ? `text-warning` : "text-white"}`} onClick={() => setOrderType("HomeDelivery")} ><MdDeliveryDining /> <div className="small">Home Delivery</div></div>
                <div className={`text-center ${orderType === "TakeAway" ? `text-warning` : "text-white"}`} onClick={() => setOrderType("TakeAway")}><BsTruck /> <div className="small">TakeAway</div></div>
                <div className={`text-center ${orderType === "DineIn" ? `text-warning` : "text-white"}`} onClick={() => setOrderType("DineIn")}><BsFillPersonFill /> <div className="small">Dine-in</div></div>
            </div>
        </>
    )
}

export default BottomNav;