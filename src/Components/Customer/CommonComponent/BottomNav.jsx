import React from "react";
import { BsHouseDoor, BsTruck, BsFillPersonFill } from 'react-icons/bs';
import { FaShoppingCart } from 'react-icons/fa';

function BottomNav({ orderType, setOrderType }) {
    return (
        <>
            <div className="fixed-bottom bg-white border-top d-flex justify-content-around py-2" >
                <div className={`text-center ${orderType === "HomeDelivery" && `text-warning`}`} onClick={()=>setOrderType("HomeDelivery")}><BsHouseDoor /> <div className="small">Delivery</div></div>
                <div className={`text-center ${orderType === "TakeAway" && `text-warning`}`} onClick={()=>setOrderType("TakeAway")}><BsTruck /> <div className="small">TakeAway</div></div>
                <div className={`text-center ${orderType === "DineIn" && `text-warning`}`} onClick={()=>setOrderType("DineIn")}><BsFillPersonFill /> <div className="small">Dine-in</div></div>
                <div className={`text-center ${orderType === "Cafe" && `text-warning`}`} onClick={()=>setOrderType("Cafe")}><FaShoppingCart /> <div className="small">Cafe</div></div>
            </div>
        </>
    )
}

export default BottomNav;