import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import otpImg from "../../../Assets/otpImg.jpg";
import { setSecureItem } from '../../../Utilities/Storage';
import Loading from '../CommonComponent/LoadingWait';
import { useDispatch } from 'react-redux';
import { setCustomerData } from '../../../Redux/customerSlice';
import { Authorization } from '../../../Utilities/Authorization';

const OtpScreen = ({ mobileNumber, resend, onBack }) => {

    const dispatch = useDispatch();

    const [otp, setOtp] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(60);
    const [resendEnabled, setResendEnabled] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (resendEnabled) return;
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setResendEnabled(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [resendEnabled]);

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const userInfo = async () => {
        try {
            const BasicAuth = Authorization();
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/profileDetail`, {
                headers: {
                    'Authorization': `Basic ${BasicAuth}`
                }
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setSecureItem("customerData", getRes.responsePacket)
                dispatch(setCustomerData(getRes.responsePacket));

                if (getRes.responsePacket?.email && getRes.responsePacket?.fullName) {
                    navigate("/");
                } else {
                    navigate("/?modal=drawer&sub=updateProfile");
                }
            }
        } catch (error) {
            console.log(error, "error in user info api");
        } finally {
            setIsLoading(false);
        }
    };

    const verifyOtp = async (otp) => {
        try {
            setIsLoading(true);
            setErrorMsg("");
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/v1/api/loginUserByOtp`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mobileNumber: mobileNumber,
                    oneTimePassword: otp
                })
            });
            const getRes = await res.json();
            if (getRes.errorCode === 0) {
                setSecureItem("secretKey", getRes.responsePacket.secretKey);
                setSecureItem("mobileNo", mobileNumber);
                userInfo(getRes.responsePacket.secretKey)
                // localStorage.setItem("secretKey", getRes.responsePacket.secretKey);
                // localStorage.setItem("mobileNo", mobileNumber);

            } else {
                // ✅ Show invalid OTP message
                setErrorMsg(getRes.message || "Invalid OTP. Please try again.");
                setOtp(['', '', '', '']);
                document.getElementById("otp-0")?.focus();
            }

        } catch (e) {
            console.log(e, "error in login api");
            setErrorMsg("Something went wrong. Please try again later.");
        }
    };

    // Handle OTP input
    const handleOtpChange = (index, value) => {
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < 3) {
                document.getElementById(`otp-${index + 1}`)?.focus();
            }
        }
        setErrorMsg('');
    };

    useEffect(() => {
        const otps = otp.join("");
        if (otps.length === 4 && !otp.includes('')) {
            verifyOtp(otps);
        }
    }, [otp]);

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            if (otp[index] === '') {
                if (index > 0) {
                    document.getElementById(`otp-${index - 1}`)?.focus();
                }
            } else {
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
            }
        }
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault(); // Prevent default action for ArrowUp and ArrowDown
        }
    };

    // Resend OTP
    const handleResend = () => {
        if (!resendEnabled) return;
        setTimer(60);
        setResendEnabled(false);
        setOtp(['', '', '', '']);
        resend();
        setErrorMsg("");
    };

    return (
        <div className="min-vh-100 bg-white d-flex flex-column">
            {/* Header */}
            <div className="d-flex align-items-center px-4 py-4 bg-black text-light">
                <FaArrowLeft className="me-2" onClick={onBack} />
                <h5 className="mb-0 text-light fs-4 flex-grow-1 text-center">OTP</h5>
                <span className='me-2'> </span>
            </div>

            {/* Main Content */}
            <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 text-center px-3">
                <img
                    src={otpImg}
                    alt="SMS"
                    style={{ width: '250px', marginBottom: '20px' }}
                />

                <h5>Enter OTP</h5>
                <p className="text-muted mb-1">We have sent you an access code via SMS for mobile number verification</p>
                <strong className='text-muted'>{mobileNumber}</strong>

                {/* OTP Boxes */}
                <div className="rounded-4 shadow bg-white mt-4">
                    <div className="d-flex justify-content-center gap-3 mt-3 p-3 ">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="number"
                                className="form-control text-center"
                                style={{ width: '48px', fontSize: '24px', borderRadius: "50%" }}
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                            />
                        ))}
                    </div>
                    <div className="mb-3 mt-1 text-end me-2">
                        {resendEnabled ? (
                            <button className="btn " onClick={handleResend}>
                                Resend OTP
                            </button>
                        ) : (
                            <span className="text-muted">
                                00:{timer.toString().padStart(2, '0')} Resend OTP
                            </span>
                        )}
                    </div>
                </div>
                {errorMsg && (
                    <div className="text-danger mt-3 fw-semibold" style={{ fontSize: "15px" }}>
                        {errorMsg}
                    </div>
                )}
                {isLoading && <Loading />}

            </div>
        </div>
    );
};

export default OtpScreen;