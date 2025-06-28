// ------------------------------
// ProfileUpdate.jsx
// ------------------------------
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { HiArrowNarrowLeft } from "react-icons/hi";
import pic from "../../../../Assets/profilePic.jpg";

export default function ProfileUpdate({ show, onHide }) {
    const [form, setForm] = useState({
        name: 'Ajaj',
        email: 'azazk7809@gmail.com',
        phone: '8290780903',
        birthday: '2003-12-09', // ISO for date inputs
        anniversary: '1970-01-01',
        gender: 'male',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: send form to API
        console.log('Profile updated →', form);
        onHide();
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            backdrop="static"
            keyboard={false}
            dialogClassName="profile-modal modal-dialog-scrollable modal-fullscreen-sm-down"
        >
            <div className="">
                <div className="promo-header sticky-top them-bg-black d-flex align-items-center justify-content-between">
                    <HiArrowNarrowLeft className="ri-arrow-left-line fs-4 text-warning" onClick={onHide} role="button" />
                    <h5 className="text-warning m-auto">Profile</h5>
                    <span></span>
                </div>
                <div className="d-flex align-items-center mb-3 ps-3 pt-3">
                    <img
                        src={pic}
                        alt="Avatar"
                        className="rounded-circle me-3 avatar-lg"
                    />
                    <div>
                        <h6 className="mb-0 fw-bold">{form.name}</h6>
                        <small className="text-muted d-block">{form.email}</small>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-body p-3">
                            <div className="form-floating mb-3 border-bottom">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    className="form-control border-0"
                                />
                                <label htmlFor="name">Name*</label>
                            </div>

                            <div className="form-floating mb-3 border-bottom">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="form-control border-0"
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="form-floating mb-3 border-bottom">
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    className="form-control border-0"
                                />
                                <label htmlFor="phone">Phone Number</label>
                            </div>

                            <div className="form-floating mb-3 border-bottom">
                                <input
                                    type="date"
                                    name="birthday"
                                    id="birthday"
                                    value={form.birthday}
                                    onChange={handleChange}
                                    placeholder="Birthday"
                                    className="form-control border-0"
                                />
                                <label htmlFor="birthday">Birthday</label>
                            </div>

                            {/** Anniversary */}
                            <div className="form-floating mb-3 border-bottom">
                                <input
                                    type="date"
                                    name="anniversary"
                                    id="anniversary"
                                    value={form.anniversary}
                                    onChange={handleChange}
                                    placeholder="Anniversary"
                                    className="form-control border-0"
                                />
                                <label htmlFor="anniversary">Anniversary</label>
                            </div>

                            {/** Gender */}
                            <div className="mb-1 small text-muted ps-3">Gender :</div>
                            <div className="d-flex gap-4 ps-3">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        id="male"
                                        value="male"
                                        checked={form.gender === 'male'}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="male">
                                        Male
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        id="female"
                                        value="female"
                                        checked={form.gender === 'female'}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="female">
                                        Female
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-3">
                        <button type="submit" className="btn btn-dark w-100 rounded-pill py-2 fw-semibold">
                            UPDATE PROFILE
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
