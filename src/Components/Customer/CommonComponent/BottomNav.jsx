import React from "react";
import { BsHouseDoor, BsTruck, BsFillPersonFill } from 'react-icons/bs';
import {  FaShoppingCart } from 'react-icons/fa';

function BottomNav() {
    return (
        <>
            <div className="fixed-bottom bg-white border-top d-flex justify-content-around py-2" >
                <div className="text-center"><BsHouseDoor /> <div className="small">Home</div></div>
                <div className="text-center"><BsTruck /> <div className="small">Delivery</div></div>
                <div className="text-center"><BsFillPersonFill /> <div className="small">Dine-in</div></div>
                <div className="text-center"><FaShoppingCart /> <div className="small">Orders</div></div>
            </div>
        </>
    )
}

export default BottomNav;
