// import React from "react";
// import bur from "../../../../Assets/burgur.jpg";

// function PopularItem() {

//     const foodItems = [
//         {
//             name: "Cheeseburger Deluxe",
//             price: "₹8.99",
//             desc: "Juicy beef patty with melted cheese, fresh lettuce, tomato and special sauce.",
//             img: bur,
//         },
//         {
//             name: "Margherita Pizza",
//             price: "₹12.99",
//             desc: "Classic pizza with fresh basil, mozzarella, and tomato sauce.",
//             img: bur,
//         },
//         {
//             name: "Margherita Pizza",
//             price: "₹12.99",
//             desc: "Classic pizza with fresh basil, mozzarella, and tomato sauce.",
//             img: bur,
//         },
//         {
//             name: "Margherita Pizza",
//             price: "₹12.99",
//             desc: "Classic pizza with fresh basil, mozzarella, and tomato sauce.",
//             img: bur,
//         },
//     ];
//     return (
//         <>
//             <div className="p-3">
//                 <div className="d-flex justify-content-between align-items-center px-2 mb-3">
//                     <h5 className="fw-bold mb-0">Popular Items</h5>
//                     <span className="text-warning fw-semibold view-all">View All</span>
//                 </div>
//                 <div className="row g-4 justify-content-center">
//                     {foodItems.map((item, index) => (
//                         <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
//                             <div className="card h-100 shadow-sm border-0 rounded-4">
//                                 <img
//                                     src={item.img}
//                                     alt={item.name}
//                                     className="card-img-top rounded-top-4"
//                                     style={{ objectFit: "cover", height: "180px" }}
//                                 />
//                                 <div className="card-body d-flex flex-column">
//                                     <h6 className="card-title fw-bold mb-1">
//                                         {item.name.split(" ")[0]} <span className="text-warning">{item.price}</span>
//                                     </h6>
//                                     <p className="card-subtitle text-muted mb-2">
//                                         {item.name.split(" ").slice(1).join(" ")}
//                                     </p>
//                                     <p className="card-text text-muted small flex-grow-1">
//                                         {item.desc.length > 50 ? item.desc.slice(0, 50) + "..." : item.desc}
//                                     </p>
//                                     <button className="btn btn-danger them-bg-black border-dark text-warning w-100 mt-auto rounded-pill fw-semibold">
//                                         Add to Cart
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </>
//     );
// }

// export default PopularItem;

import React from "react";
import bur from "../../../../Assets/burgur.jpg";

function PopularItem() {
    const foodItems = [
        {
            name: "Cheeseburger Deluxe",
            price: "₹8.99",
            desc: "Juicy beef patty with melted cheese, fresh lettuce, tomato and special sauce.",
            img: bur,
        },
        {
            name: "Margherita Pizza",
            price: "₹12.99",
            desc: "Classic pizza with fresh basil, mozzarella, and tomato sauce.",
            img: bur,
        },
        {
            name: "Margherita Pizza",
            price: "₹12.99",
            desc: "Classic pizza with fresh basil, mozzarella, and tomato sauce.",
            img: bur,
        },
        {
            name: "Margherita Pizza",
            price: "₹12.99",
            desc: "Classic pizza with fresh basil, mozzarella, and tomato sauce.",
            img: bur,
        },
    ];

    return (
        <div className="p-3">
            <div className="d-flex justify-content-between align-items-center px-2 mb-3">
                <h5 className="fw-bold mb-0">Popular Items</h5>
                <span className="text-warning fw-semibold view-all">View All</span>
            </div>

            {/* Horizontal Scroll Wrapper */}
            <div className="horizontal-scroll-wrapper d-flex gap-3 overflow-auto px-2">
                {foodItems.map((item, index) => (
                    <div className="card h-100 shadow-sm border-0 rounded-4" style={{ minWidth: "250px" }} key={index}>
                        <img
                            src={item.img}
                            alt={item.name}
                            className="card-img-top rounded-top-4"
                            style={{ objectFit: "cover", height: "180px" }}
                        />
                        <div className="card-body d-flex flex-column">
                            <h6 className="card-title fw-bold mb-1">
                                {item.name.split(" ")[0]} <span className="text-warning">{item.price}</span>
                            </h6>
                            <p className="card-subtitle text-muted mb-2">
                                {item.name.split(" ").slice(1).join(" ")}
                            </p>
                            <p className="card-text text-muted small flex-grow-1">
                                {item.desc.length > 50 ? item.desc.slice(0, 50) + "..." : item.desc}
                            </p>
                            <button className="btn btn-danger them-bg-black border-dark text-warning w-100 mt-auto rounded-pill fw-semibold">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PopularItem;
