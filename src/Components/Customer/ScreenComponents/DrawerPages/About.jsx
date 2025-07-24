import React from 'react';
import { Modal } from 'react-bootstrap';
import { HiArrowNarrowLeft } from "react-icons/hi";
import logo from "../../../../Assets/notification_icon.png"

export default function AboutAppPopup({ show, onHide }) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            backdrop="static"
            keyboard={false}
            dialogClassName="about-app-modal modal-dialog-scrollable modal-fullscreen-sm-down"
        >
            <div className="">
                <div className="promo-header sticky-top them-bg-black d-flex align-items-center justify-content-between">
                    <HiArrowNarrowLeft className="ri-arrow-left-line fs-4 text-white" onClick={onHide} role="button" />
                    <h5 className="text-white m-auto">About</h5>
                    <span></span>
                </div>

                <div className="text-center mb-3 p-3">
                    <img
                        src={logo}
                        alt="App Logo"
                        className="about-logo mb-2"
                    />
                    <h6 className="fw-bold">~~ Afoozo Cafe App ~~</h6>
                </div>

                <div className="small text-muted p-3 h-65 overflow-scroll pb-5">
                    <p><strong>Dear Guest,</strong></p>

                    <p>
                        This application has been specially designed for you to have multiple ordering
                        options under a single roof, digitally!
                    </p>

                    <p>
                        You have the options of Home delivery, take away, dine-in, and also for Corporate
                        cafeterias. This easy to use app helps you manage your daily meal requirements
                        effortlessly.
                    </p>

                    <p className="fw-semibold text-dark mt-4 mb-1">Dine-In -:</p>
                    <p>
                        Dine-in feature is developed for use for restaurants, and in the corporate world
                        for use at guest houses, conference rooms and individual cabins. One can order
                        food directly from their table by just scanning the QR Code. This enables a
                        contactless ordering process, whereby your well being is taken care of.
                    </p>
                </div>
            </div>
        </Modal>
    );
}