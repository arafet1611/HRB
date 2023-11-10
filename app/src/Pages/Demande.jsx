import React from "react";
import "../Styles/Demande.css";
export default function demande() {
  return (
    <>
      <div className="container">
        <div className="title">
          <h1>Create new demande</h1>
        </div>
        <div className="form">
          Start Date
          <input type="date" />
          End Date
          <input type="date" />
          leave type
          <select>
            <option>paid leave</option>
            <option>sick leave </option>
            <option>unpaid leave </option>
          </select>
          duration <input type="text" />
          Cause(duration) <input type="text" />
        </div>
      </div>
    </>
  );
}
