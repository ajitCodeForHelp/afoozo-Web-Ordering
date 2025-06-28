import React from "react";
import { Route, Routes } from "react-router-dom";
import CafeMenu from "../Components/Customer/Screens/CafeMenu";
import Restaurants from "../Components/Customer/Screens/Restaurants";

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
            <Route path="/cafe" element={<CafeMenu />} />
            {/* <Route path="/cafeMenu" element={<Home />} /> */}
            <Route path="/" element={<Restaurants/>}/>
        </Routes>
    )
}
export default Routing;