// ------------------------------
// TermsConditionsPopup.jsx
// ------------------------------
import React from 'react';
import { Modal } from 'react-bootstrap';
import { HiArrowNarrowLeft } from "react-icons/hi";
import logo from "../../../../Assets/notification_icon.png";

export default function TermsConditionsPopup({ show, onHide }) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            backdrop="static"
            keyboard={false}
            dialogClassName="terms-modal modal-dialog-scrollable modal-fullscreen-sm-down"
        >
            <div className="">
                <div className="promo-header sticky-top them-bg-black d-flex align-items-center justify-content-between">
                    <HiArrowNarrowLeft className="ri-arrow-left-line fs-4 text-warning" onClick={onHide} role="button" />
                    <h5 className="text-warning m-auto">Terms & Conditions</h5>
                    <span></span>
                </div>

                <div className="text-center mb-3 p-3">
                    <img
                        src={logo}
                        alt="Afoozo Logo"
                        className="terms-logo mb-2"
                    />
                </div>

                <div className="small text-muted terms-text p-3">
                    <h6 className="text-dark fw-bold text-center">~~~Cancellations and Refunds~~~</h6>

                    <p className="fw-semibold mt-3 mb-1">1. Cancellation</p>

                    <ol type="i">
                        <li>
                            As a general rule, you shall not be entitled to cancel your order once you have
                            received confirmation of the same. If you cancel your order after it has been confirmed,
                            AFOOZO Café shall have a right to charge you a cancellation fee of a minimum INR 75 up
                            to the order value (inclusive of applicable taxes), with a right to either not to refund
                            the order value or recover from your subsequent order, the complete/deficit cancellation
                            fee, as applicable, to compensate our restaurant and delivery partners. AFOOZO Café shall also
                            have the right to charge you a cancellation fee for the orders canceled by AFOOZO Café for the
                            reasons specified under clause 1(iii) of this cancellation and refund policy. In case of
                            cancellations for the reasons attributable to AFOOZO Café or its restaurant and delivery partners,
                            AFOOZO Café shall not charge you any cancellation fee.
                        </li>

                        <li>
                            In the unlikely event of an item of your order being unavailable, we will contact you
                            on the phone number provided to us at the time of placing the order and inform you
                            of such unavailability.
                        </li>
                    </ol>
                </div>
            </div>
        </Modal>
    );
}