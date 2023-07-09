import React, { useEffect, useRef } from "react";
import "./Gauge.css";

const Gauge = ({ value }) => {
  const gaugeRef = useRef(null);

  useEffect(() => {
    const gauge = gaugeRef.current;

    if (value < 0 || value > 1) {
      return;
    }

    const fillElement = gauge.querySelector(".gauge__fill");
    const coverElement = gauge.querySelector(".gauge__cover");

    fillElement.style.transform = `rotate(${value / 2}turn)`;
    coverElement.textContent = `${Math.round(value * 100)}%`;
  }, [value]);

  return (
    <div className="gauge bg-light" ref={gaugeRef}>
      <div className="gauge__body">
        <div className="gauge__fill"></div>
        <div className="gauge__start">0%</div>
        <div className="gauge__cover"></div>
        <div className="gauge__end">100%</div>
      </div>
    </div>
  );
};

export default Gauge;
