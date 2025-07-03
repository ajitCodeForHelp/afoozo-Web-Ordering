import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QRCodeScanner = ({ onScanSuccess }) => {
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;

    let isScanning = false;

    scanner.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: 250,
      },
      async (decodedText) => {
        if (!isScanning) {
          isScanning = true;
          console.log("QR Code detected:", decodedText);
          try {
            await scanner.stop(); // Only stop if it was running
            onScanSuccess(decodedText);
          } catch (err) {
            console.warn("Stop failed or already stopped:", err);
          }
        }
      },
      (errorMessage) => {
        // Optional: handle scanning errors here
      }
    ).catch((err) => {
      console.error("Camera start failed:", err);
    });

    // Cleanup
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, [onScanSuccess]);

  return (
    <div>
      <div id="qr-reader" style={{ width: '100%' }}></div>
    </div>
  );
};

export default QRCodeScanner;