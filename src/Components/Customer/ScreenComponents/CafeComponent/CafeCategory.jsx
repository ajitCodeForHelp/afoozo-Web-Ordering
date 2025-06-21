import React from "react";
import caticon from "../../../../Assets/Cafe-category.jpg";

function CafeCategory() {
    const categories = [
        { name: 'South Indian', icon: caticon },
        { name: 'North Indian', icon: caticon },
        { name: 'Chinese', icon: caticon },
        { name: 'Sandwiches', icon: caticon },
    ];
    return (
        <>
            <div className="p-3">
                <div className="mb-2 d-flex justify-content-between">
                    <h5 className="fw-semibold">Categories</h5><a href="#">View All</a>
                </div>
                <div className="d-flex overflow-auto mb-3">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="text-center me-3" style={{width:"8%"}}>
                            <div className="bg-light p-2 rounded-circle d-flex justify-content-center align-items-center catImg-container w-100">
                                {/* {cat.icon} */}
                                <img src={cat.icon} alt={idx} className="w-100 catImg" />
                            </div>
                            <small>{cat.name}</small>
                        </div>
                    ))}
                    
                </div>
            </div>
        </>
    )
}
export default CafeCategory;