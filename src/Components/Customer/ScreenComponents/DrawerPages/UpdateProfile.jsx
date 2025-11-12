// ------------------------------
// ProfileUpdate.jsx
// ------------------------------
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { HiArrowNarrowLeft } from "react-icons/hi";
import pic from "../../../../Assets/profilePic.png";
import { Authorization } from '../../../../Utilities/Authorization';
import { getSecureItem, setSecureItem } from '../../../../Utilities/Storage';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCustomerData } from '../../../../Redux/customerSlice';

export default function ProfileUpdate({ show }) {

    const navigate = useNavigate();

    const mobile = getSecureItem("mobileNo");
    const customerData = useSelector((state) => state.customerData.customerData);
    // console.log(customerData, "customer")
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        mobileNumber: mobile,
        dateOfBirth: '', // ISO for date inputs
        anniversaryDate: '',
        gender: '',
    });

    useEffect(() => {
        const handlePopState = (event) => {
            if (!customerData?.fullName || !customerData?.email) {
                // Stop user from going back
                alert("Please update your name and email before leaving this page.");
                // Push same state again to lock user in current page
                window.history.pushState(null, null, window.location.href);
            } else {
                // If both name and email are filled, allow back navigation
                navigate('/');
            }
        };

        // Push new history state and block back initially
        window.history.pushState(null, null, window.location.href);
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };

    }, [navigate, form.fullName, form.email]);



    // useEffect(() => {
    //     if (modal === "drawer" && sub === "updateProfile") {
    //         const handleBeforeUnload = (e) => {
    //             if (!form.fullName || !form.email) {
    //                 e.preventDefault();
    //                 e.returnValue = ""; // Show browser confirm dialog
    //             }
    //         };

    //         const handlePopState = (e) => {
    //             if (!form.fullName || !form.email) {
    //                 e.preventDefault();
    //                 alert("Please update your name and email before leaving this page.");
    //                 navigate(0); // Stay on same page
    //             }
    //         };

    //         // Block page reload and tab close
    //         window.addEventListener("beforeunload", handleBeforeUnload);
    //         // Block navigation (back/forward)
    //         window.addEventListener("popstate", handlePopState);

    //         return () => {
    //             window.removeEventListener("beforeunload", handleBeforeUnload);
    //             window.removeEventListener("popstate", handlePopState);
    //         };
    //     }
    // }, [modal, sub, form, navigate]);


    const dateFormate = (timestamp) => {
        const get = new Date(timestamp);
        const date = get?.toISOString().split("T")[0];
        return date;
    };

    useEffect(() => {
        if (show && customerData) {
            setForm({
                fullName: customerData?.fullName || '',
                email: customerData?.email || '',
                mobileNumber: mobile,
                dateOfBirth: customerData?.dateOfBirth && dateFormate(customerData?.dateOfBirth) || '', // ISO for date inputs
                anniversaryDate: customerData?.anniversaryDate && dateFormate(customerData?.anniversaryDate) || '',
                gender: customerData?.gender || '',
            });
        }
    }, [show, customerData]);

    const updateProfile = async () => {
        try {
            // const mobile = localStorage.getItem("mobileNo");
            // const key = localStorage.getItem("secretKey");
            // const BasicAuth = btoa(`${mobile}:${key}`);
            const BasicAuth = Authorization();
            const payload = {
                fullName: form?.fullName || '',
                email: form?.email || '',
                mobileNumber: mobile,
                dateOfBirth: new Date(form?.dateOfBirth).getTime() || '', // ISO for date inputs
                anniversaryDate: new Date(form?.anniversaryDate).getTime() || '',
                gender: form?.gender || '',
            };

            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/updateProfile`, {
                method: "POST",
                headers: {
                    'Authorization': `Basic ${BasicAuth}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                // alert("update successfully !");
                // getData();
                setSecureItem("customerData", getRes.resposePacket)
                dispatch(setCustomerData(getRes.resposePacket));
                navigate(-1);
            }
        } catch (e) {
            console.log(e, "error in profileUpdate api");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile();
    };

    return (
        <Modal
            show={show}
            onHide={() => navigate(-1)}
            centered
            backdrop="static"
            keyboard={false}
            dialogClassName="profile-modal modal-dialog-scrollable modal-fullscreen-sm-down"
        >
            <div className="" style={{ paddingBottom: "74px" }}>
                <div className="promo-header sticky-top them-bg-black d-flex align-items-center justify-content-between">
                    <HiArrowNarrowLeft className="ri-arrow-left-line fs-4 text-white" onClick={() => { navigate(-1) }} role="button" />
                    <h5 className="text-white m-auto">Update Profile</h5>
                    <span></span>
                </div>
                <div className="d-flex align-items-center mb-3 ps-3 pt-3">
                    <img
                        src={pic}
                        alt="Avatar"
                        className="rounded-circle me-3 avatar-lg"
                    />
                    <div>
                        <h6 className="mb-0 fw-bold">{form.fullName}</h6>
                        <small className="text-muted d-block">{form.email}</small>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="card shadow-sm border-0 ">
                        <div className="card-body p-3 overflow-auto h-65">
                            <div className="form-floating mb-3 border-bottom">
                                <input
                                    type="text"
                                    name="fullName"
                                    id="name"
                                    required
                                    value={form.fullName}
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
                                    required
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="form-control border-0"
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="form-floating mb-3 border-bottom">
                                <input
                                    type="tel"
                                    name="mobileNumber"
                                    id="phone"
                                    value={form.mobileNumber}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    disabled={true}
                                    className="form-control border-0"
                                />
                                <label htmlFor="phone">Phone Number</label>
                            </div>

                            <div className="form-floating mb-3 border-bottom">
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    id="birthday"
                                    value={form.dateOfBirth}
                                    onChange={(e) => {
                                        // const date = new Date(e.target.value);
                                        // const timestamp = date.getTime(
                                        setForm({ ...form, dateOfBirth: e.target.value });
                                    }}
                                    placeholder="Birthday"
                                    className="form-control border-0"
                                />
                                <label htmlFor="birthday">Birthday</label>
                            </div>

                            {/** Anniversary */}
                            <div className="form-floating mb-3 border-bottom">
                                <input
                                    type="date"
                                    name="anniversaryDate"
                                    id="anniversary"
                                    value={form.anniversaryDate}
                                    onChange={(e) => {
                                        setForm({ ...form, anniversaryDate: e.target.value });
                                    }}
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
                                        value="MALE"
                                        checked={form.gender === 'MALE'}
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
                                        value="FEMALE"
                                        checked={form.gender === 'FEMALE'}
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
