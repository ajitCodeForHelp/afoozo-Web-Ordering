import React from "react";
import { Link } from "react-router-dom";

function HomeCards() {
    const menuItems = [
        { title: "DINE IN", icon: "🍽️", path: "/cafeMenu" },
        { title: "DELIVERY", icon: "🛵", path: "/cafeMenu" },
        { title: "TAKE AWAY", icon: "🧺", path: "/cafeMenu" },
        { title: "Work Café", icon: "☕", path: "/cafeMenu" },
        { title: "Check -In", icon: "🚪", path: "/cafeMenu" },
    ];
    return (
        <>
            <div className="container py-5">
                <div className="row g-4 justify-content-center">
                    {menuItems.map((item, index) => (

                        <div
                            key={index}
                            className={`col-6 col-md-4 col-lg-3 ${index >= 3 ? "col-md-6 col-lg-4" : ""}`}
                        >
                            <Link to={item.path}>
                                <div className="card menu-card text-center">
                                    {item.icon && <div className="menu-icon mb-3 fs-1">{item.icon}</div>}
                                    <h5 className="menu-title">{item.title}</h5>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div >
        </>
    )
}
export default HomeCards;