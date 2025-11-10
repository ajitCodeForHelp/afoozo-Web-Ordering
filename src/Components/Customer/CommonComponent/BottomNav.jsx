import React from "react";
import { BsHouseDoor } from 'react-icons/bs';
import { MdDeliveryDining } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { IoRestaurant } from "react-icons/io5";
import { setOrderTypeee } from "../../../Redux/orderTypeSlice";
import { GiShoppingBag } from "react-icons/gi";

function BottomNav({ orderType, setOrderType, getList }) {
    return (
        <>
            <div className="fixed-bottom bg-dark shadow-sm border-top d-flex justify-content-around py-2 mb-0" >
                <div className={`text-center ${orderType === "Cafe" ? `text-white` : "text-white"}`} onClick={() => { setOrderType(setOrderTypeee("Cafe")); getList("Cafe") }}>
                    {orderType === "Cafe" ?
                        <><GoHomeFill /> <div className="small fw-bold text-white border-bottom border-2 border-white">Home</div></> :
                        <><BsHouseDoor /> <div className="small text-white">Home</div></>}
                </div>
                <div className={`text-center ${orderType === "HomeDelivery" ? `text-white` : "text-white"}`} onClick={() => { setOrderType(setOrderTypeee("HomeDelivery")); getList("HomeDelivery") }} >

                    {orderType === "HomeDelivery" ?
                        <><MdDeliveryDining /> <div className="small fw-bold border-bottom border-2 border-white">Delivery</div></> :
                        <><MdDeliveryDining /> <div className="small">Delivery</div></>
                    }
                </div>

                <div className={`text-center ${orderType === "DineIn" ? `text-white` : "text-white"}`} onClick={() => { setOrderType(setOrderTypeee("DineIn")) }}>
                    {orderType === "DineIn" ?
                        <><IoRestaurant /> <div className="small bold border-bottom border-2 border-white">Dine-in</div></> :
                        <><IoRestaurant /> <div className="small">Dine-in</div></>
                    }
                </div>

                <div className={`text-center ${orderType === "TakeAway" ? `text-white` : "text-white"}`} onClick={() => { setOrderType(setOrderTypeee("TakeAway")); getList("TakeAway") }}>

                    {orderType === "TakeAway" ?
                        <><GiShoppingBag /> <div className="small fw-bold border-bottom border-2 border-white">TakeAway</div></> :
                        <><GiShoppingBag /> <div className="small">TakeAway</div></>
                    }
                </div>

            </div>
        </>
    )
}

export default BottomNav;