import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Components/Customer/Screens/Home";
import CafeMenu from "../Components/Customer/Screens/CafeMenu";
import Cafe from "../Components/Customer/Screens/Cafe";

function Routing() {

//    navigator.geolocation.getCurrentPosition(
//   (position) => {
//     const { latitude, longitude } = position.coords;

//     fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
//       .then(res => res.json())
//       .then(data => {
//         console.log("Location:", data);
//       });
//   },
//   (error) => {
//     console.error("Location error:", error);
//   }
// );

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cafeMenu" element={<CafeMenu />} />
            <Route path="/cafe" element={<Cafe/>}/>
        </Routes>
    )
}
export default Routing;