import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRCodeScanner = ({ onScanSuccess, onClose }) => {
  const scannerRef = useRef(null);
  const scannedOnce = useRef(false);
  const [scannerId] = useState("qr-reader");

  useEffect(() => {
    const initScanner = async () => {
      if (scannerRef.current) return;
      const scanner = new Html5Qrcode(scannerId, { verbose: false });
      scannerRef.current = scanner;

      try {
        const cameras = await Html5Qrcode.getCameras();
        if (!cameras.length) throw new Error("No camera found");

        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          async (decodedText) => {
            if (!scannedOnce.current) {
              scannedOnce.current = true;
              await stopScanner();
              onScanSuccess(decodedText);
              handleClose();
            }
          },
          () => { } // ignore scan failures
        );
      } catch (err) {
        console.error("Error starting QR scanner:", err);
      }
    };

    initScanner();

    return () => {
      stopScanner();
    };
  }, [onScanSuccess, scannerId]);

  const stopScanner = async () => {
    const scanner = scannerRef.current;

    try {
      // html5-qrcode stop
      if (scanner?.isScanning) {
        await scanner.stop();
      }
      await scanner?.clear();
    } catch (err) {
      console.warn("html5-qrcode stop error:", err);
    }

    // Force stop all media tracks
    const videoElem = document.querySelector(`#${scannerId} video`);
    if (videoElem?.srcObject) {
      videoElem.srcObject.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch (e) {
          console.warn("Track stop failed:", e);
        }
      });
      videoElem.srcObject = null;
    }

    // Remove leftover DOM (canvas, etc.)
    const el = document.getElementById(scannerId);
    if (el) el.innerHTML = "";
  };

  const handleClose = async () => {
    await stopScanner();
    onClose();
  };

  return (
    <div className="qr-overlay">
      <div className="qr-container">
        <button className="qr-close-btn" onClick={handleClose}>×</button>
        <div id={scannerId} className="qr-reader-box" />
        <div className="qr-tip">Align the QR code within the frame</div>
      </div>
    </div>
  );
};

export default QRCodeScanner;