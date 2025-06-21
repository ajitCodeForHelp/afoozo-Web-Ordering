import React from "react";
import Cafee from "../ScreenComponents/CafeComponent/Cafee";
import Header from "../CommonComponent/Navbar";
import Banner from "../CommonComponent/Banner";
import CafeCategory from "../ScreenComponents/CafeComponent/CafeCategory";

function Cafe() {
    return (
        <>
            <Header />
            
            <Banner />
            <CafeCategory />
            <Cafee />
        </>
    )
}
export default Cafe;
