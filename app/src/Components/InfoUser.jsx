import React from "react";
import "../Styles/InfoUser.css";
import img from "../assets/empl1.avif";
import { Link } from "react-router-dom";
export default function InfoUser() {
  return (
    <div className="container">
      <div className="image">
        <img src={img} alt="" />
      </div>
      <div className="infoUser">Arafet alaya 23 an</div>

      <Link>Historique</Link>
      <Link to={"/demande"}>Congés</Link>
    </div>
  );
}
