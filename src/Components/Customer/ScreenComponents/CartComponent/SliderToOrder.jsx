import React, { useRef, useState, useEffect } from "react";

const SlideToOrder = ({ onComplete }) => {
  const sliderRef = useRef(null);
  const [isSliding, setIsSliding] = useState(false);
  const [slideX, setSlideX] = useState(5);
  const [completed, setCompleted] = useState(false);
  const [sliderWidth, setSliderWidth] = useState(0);
  const circleSize = 50; // diameter of circle

  // Update width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (sliderRef.current) setSliderWidth(sliderRef.current.offsetWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const startSlide = (clientX) => {
    if (!completed) {
      setIsSliding(true);
    }
  };

  const moveSlide = (clientX) => {
    if (!isSliding || completed) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const newX = clientX - rect.left - circleSize / 2;
    const clampedX = Math.max(0, Math.min(newX, rect.width - circleSize));
    setSlideX(clampedX);
  };

  const endSlide = () => {
    if (!isSliding) return;
    setIsSliding(false);

    if (slideX > sliderWidth * 0.6) {
      setSlideX(sliderWidth - circleSize);
      setCompleted(true);
      onComplete && onComplete();
    } else {
      setSlideX(0);
    }
  };

  // Mouse & touch event handlers
  const handleMouseDown = (e) => startSlide(e.clientX);
  const handleMouseMove = (e) => moveSlide(e.clientX);
  const handleTouchStart = (e) => startSlide(e.touches[0].clientX);
  const handleTouchMove = (e) => moveSlide(e.touches[0].clientX);
  const handleMouseUp = endSlide;
  const handleTouchEnd = endSlide;

  return (
    <div
      ref={sliderRef}
      className="slide-to-order"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "350px",
        height: "58px",
        borderRadius: "40px",
        backgroundColor: "#000",
        color: "#fff",
        overflow: "hidden",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "500",
        fontSize: "16px",
      }}
    >
      <span style={{ opacity: completed ? 0 : 1, transition: "opacity 0.3s" }}>
        Slide to order
      </span>
      <span style={{ opacity: completed ? 1 : 0, transition: "opacity 0.3s" }}>
        Order Placed!
      </span>

      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{
          position: "absolute",
          left: `${slideX}px`,
          top: "4px",
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          borderRadius: "50%",
          backgroundColor: "#fff",
          color: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          cursor: completed ? "default" : "grab",
          transition: isSliding ? "none" : "left 0.3s ease",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        }}
      >
        →
      </div>
    </div>
  );
};

export default SlideToOrder;
