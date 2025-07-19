import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemCustomPopup = ({ show, onClose, data }) => {
    const [customOption, setCustomOption] = useState([]);
    useEffect(() => {
        if (show) {
            setCustomOption(data?.customization);
        }
    }, [show]);

    return (
        <>
            {/* Toggle Button */}
            {/* <button className="btn btn-primary" onClick={() => setshow(!show)}>
                {show ? 'Close' : 'Customize Thali'}
            </button>  */}

            {/* Overlay */}
            <div className={`popup-overlay ${show ? 'show' : ''}`} onClick={onClose} />

            {/* Modal Box */}
            <div className={`popup-box ${show ? 'show' : ''}`}>
                <div className="popup-content">
                    <h5 className="fw-bold">{data?.title}</h5>

                    {customOption?.map((itm) => {
                        return (
                            <div className="mb-3">
                                <div className="fw-semibold">{itm?.title}</div>
                                {
                                    itm?.customizationOptions?.map((item) => {
                                        return (
                                            <>
                                                <div className="form-check">
                                                    <input className="form-check-input" id={item?.id} type="radio" name={itm?.title} />
                                                    <label className="form-check-label">{item?.name} ( {Number(item?.price).toFixed(2)} )</label>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        )
                    })}

                    {/* <div className="mb-3">
                        <div className="fw-semibold">Gharelu Veg Gravy</div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gravy" />
                            <label className="form-check-label">Veg Makhanwala ( +₹0.00 )</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gravy" defaultChecked />
                            <label className="form-check-label">Veg Kolhapuri ( +₹0.00 )</label>
                        </div>
                    </div> */}

                    <div className="bottom-bar d-flex justify-content-between align-items-center">
                        <div className="fw-bold">Item Total ₹210.00</div>
                        <button className="btn btn-warning">Add Item</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ItemCustomPopup;
