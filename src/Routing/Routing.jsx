import React from "react";
import { Route, Routes } from "react-router-dom";
import CafeMenu from "../Components/Customer/Screens/CafeMenu";
import Restaurants from "../Components/Customer/Screens/Restaurants";
import LocationGate from "../Utilities/LocationGate";
import Login from "../Components/Customer/Screens/Login";
import AuthGate from "../Utilities/AuthGate";

function Routing() {

    return (
        // <LocationGate>
            <Routes>
                <Route path="/" element={<AuthGate/>}/>
                <Route path="/home" element={<Restaurants />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cafeMenu" element={<CafeMenu />} />

                {/* <Route path="/cafeMenu" element={<Home />} /> */}
            </Routes>
        // </LocationGate>
    )
}
export default Routing;