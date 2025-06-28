import React from "react";
import caticon from "../../../../Assets/Cafe-category.jpg";
import { Container } from 'react-bootstrap';

function CafeCategory() {
    const categories = [
        { name: 'South Indian', icon: caticon },
        { name: 'North Indian', icon: caticon },
        { name: 'Chinese', icon: caticon },
        { name: 'Sandwich', icon: caticon },
        { name: 'Pizza', icon: caticon }, // Extra for scroll test
        { name: 'Burger', icon: caticon } // Extra for scroll test
    ];
    return (
        <>
            <Container fluid className="py-3">
                <div className="d-flex justify-content-between align-items-center px-2 mb-3">
                    <h5 className="fw-bold mb-0">Categories</h5>
                    <span className="text-warning fw-semibold view-all">View All</span>
                </div>

                <div className="category-scroll px-2">
                    {categories.map((cat, index) => (
                        <div key={index} className="category-item text-center mx-2">
                            <div className="category-icon mb-2">
                                <img src={cat.icon} alt={cat.name} />
                            </div>
                            <div className="category-name small fw-semibold">{cat.name}</div>
                        </div>
                    ))}
                </div>
            </Container>
        </>
    )
}
export default CafeCategory;