import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import otpImg from "../../../Assets/otpImg.jpg";

const OtpScreen = ({ mobileNumber, resend,onBack }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(60);
    const [resendEnabled, setResendEnabled] = useState(false);

    useEffect(() => {
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
    }, []);

    const navigate = useNavigate();

    const verifyOtp = async (otp) => {
        try {
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
                localStorage.setItem("secretKey", getRes.responsePacket.secretKey);
                localStorage.setItem("mobileNo", mobileNumber);
                navigate("/");
            }
        } catch (e) {
            console.log(e, "error in login api");
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
    };

    return (
        <div className="min-vh-100 bg-white d-flex flex-column">
            {/* Header */}
            <div className="d-flex align-items-center px-4 py-4 bg-black text-dark">
                <FaArrowLeft className="me-2" onClick={onBack}/>
                <h5 className="mb-0 text-dark fs-4">OTP</h5>
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
                <strong>{mobileNumber}</strong>

                {/* OTP Boxes */}
                <div className="d-flex justify-content-center gap-3 mt-4 p-3 rounded-4 shadow bg-white">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="number"
                            className="form-control text-center fw-bold"
                            style={{ width: '45px', fontSize: '24px' }}
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                        />
                    ))}
                </div>

                {/* Resend OTP */}
                <div className="mt-3">
                    {resendEnabled ? (
                        <button className="btn btn-link" onClick={handleResend}>
                            Resend OTP
                        </button>
                    ) : (
                        <span className="text-muted">
                            00:{timer.toString().padStart(2, '0')} Resend OTP
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OtpScreen;