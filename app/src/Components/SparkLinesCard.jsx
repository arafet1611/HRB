import React from "react";
import "../Styles/Dashboard.css";
const SparkLinesCard = ({ headingData, innerTextData }) => {
  return (
    <div className="top-card-analytics-box bg-white">
      <div className="top-card-box-txt">
        <strong>{innerTextData}</strong>
        <p>{headingData}</p>
      </div>
    </div>
  );
};

export default SparkLinesCard;
