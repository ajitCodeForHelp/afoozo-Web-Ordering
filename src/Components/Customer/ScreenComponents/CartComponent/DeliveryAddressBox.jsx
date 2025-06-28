import React from 'react';

const DeliveryAddressBox = ({ address, onChange }) => {

    return (
        <div className="delivery-box p-3 bg-white rounded shadow-sm mb-3">
            <div className="text-muted fw-medium mb-2">Delivering Food To</div>

            <div className="d-flex">
                <div className="me-2">
                    <span className="check-icon">&#x2705;</span>
                </div>

                <div className="flex-grow-1">
                    <div className="fw-semibold" style={{ fontSize: window.innerWidth < 768 ? "10px" : "16px" }}>{address}</div>
                </div>

                <div>
                    <button className="btn btn-link text-success fw-bold p-0 ms-2" onClick={onChange}>
                        Change
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeliveryAddressBox;
