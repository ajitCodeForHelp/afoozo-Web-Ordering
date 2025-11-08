import React, { useEffect, useRef } from "react";
import { Container } from 'react-bootstrap';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useIsMobile from "../../../../Utilities/IsMobile";

function Categories({ list, activeCategory, scrollToCategory }) {

    const topValue = window.innerWidth < 768 ? '120px' : '72px';

    const navigate = useNavigate();

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

    const isMobile = useIsMobile();

    return (
        <>
            <Container fluid className="py-3 sticky-top bg-white shadow-sm" style={{ top: topValue, zIndex: "1000" }}>
                <div className={`d-flex justify-content-${isMobile ? "start" : "center"} align-items-center px-2 mb-3`}>
                    {!isMobile && <span className="text-dark fw-semibold view-all fs-4" onClick={() => navigate(-1)}><IoMdArrowRoundBack /></span>}
                    <h5 className={`fw-bold mb-0 text-${isMobile ? "start" : "center"} text-dark fs-5`} style={{ flex: 1 }}>Categories</h5>
                </div>

                {/* <div className="category-scroll px-2"
                    ref={containerRef}
                    style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
                >
                    {list?.map((cat, index) => (
                        <div key={index} className={`category-item text-center mx-2 cursor-pointer p-2 shadow-sm fs-6 rounded-5 
                        ${activeCategory === cat.categoryUuid ? `text-warning bg-white border-warning` : `text-white bg-dark `}`}
                            onClick={() => scrollToCategory(cat.categoryUuid)}
                            ref={(el) => (itemRefs.current[cat.categoryUuid] = el)}
                        >
                            <div className="category-icon mb-2">
                                <img src={cat?.cuisineImageUrl} alt={index} />
                            </div>
                            <div className="category-name fw-semibold">{cat?.categoryName}</div>
                        </div>
                    ))}
                </div> */}
                <div className="category-scroll px-2" ref={containerRef} style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}>
                    {list?.map((cat, index) => (
                        <div key={index} className={`category-item text-center mx-2 cursor-pointer ${activeCategory === cat.categoryUuid ? 'text-dark' : 'text-muted'}`}
                            onClick={() => scrollToCategory(cat.categoryUuid)}
                            ref={(el) => (itemRefs.current[cat.categoryUuid] = el)}
                        >
                            <div className="category-icon mb-2">
                                <img src={cat?.catImageUrl} alt={index} />
                            </div>
                            <div className="category-name small fw-semibold">{cat?.categoryName}</div>
                        </div>
                    ))}
                </div>
            </Container>
        </>
    )
}
export default Categories;