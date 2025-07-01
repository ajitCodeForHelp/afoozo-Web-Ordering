import React, { useEffect, useRef } from "react";
import { Container } from 'react-bootstrap';

function Categories({ list, activeCategory, scrollToCategory }) {

    const topValue = window.innerWidth < 768 ? '70px' : '87px';

    const containerRef = useRef(null);
    const itemRefs = useRef({});
    useEffect(() => {
        if (itemRefs.current[activeCategory]) {
            itemRefs.current[activeCategory].scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest"
            });
        }
    }, [activeCategory]);

    return (
        <>
            <Container fluid className="py-3 sticky-top bg-white shadow-sm" style={{ top: topValue }}>
                <div className="d-flex justify-content-between align-items-center px-2 mb-3">
                    <h5 className="fw-bold mb-0">Categories</h5>
                    {/* <span className="text-warning fw-semibold view-all">View All</span> */}
                </div>

                <div className="category-scroll px-2"
                    ref={containerRef}
                    style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
                >
                    {list?.map((cat, index) => (
                        <div key={index} className={`category-item text-center mx-2 cursor-pointer p-2 shadow-sm fs-6 rounded-5 
                        ${activeCategory === cat.categoryUuid ? `text-warning bg-white border-warning` : `text-white bg-dark `}`}
                            onClick={() => scrollToCategory(cat.categoryUuid)}
                            ref={(el) => (itemRefs.current[cat.categoryUuid] = el)}
                        >
                            {/* <div className="category-icon mb-2">
                                <img src={cat?.cuisineImageUrl} alt={index} />
                            </div> */}
                            <div className="category-name fw-semibold">{cat?.categoryName}</div>
                        </div>
                    ))}
                </div>
            </Container>
        </>
    )
}
export default Categories;