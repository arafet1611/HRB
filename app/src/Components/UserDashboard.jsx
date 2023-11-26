import React, { useState, useEffect } from "react";
import { BsPeopleFill, BsFillBellFill } from "react-icons/bs";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import "../Styles/UserDashboard.css";
import axios from "axios";
import HistoriqueDemande from "./HistoriqueDemande";

function UserDashboard() {
  const [historiqueDemandes, setHistoriqueDemandes] = useState([]);
  const [countRefused, setCountRefused] = useState(0);
  const [countAccepted, setCountAccepted] = useState(0);
  const [countProgress, setCountProgress] = useState(0);

  useEffect(() => {
    axios
      .get("/api/demandes")
      .then((response) => {
        setHistoriqueDemandes(response.data);
        setCountRefused(
          response.data.filter((demande) => demande.Status === "Refused").length
        );
        setCountAccepted(
          response.data.filter((demande) => demande.Status === "Accepted")
            .length
        );
        setCountProgress(
          response.data.filter((demande) => demande.Status === "Pending").length
        );
      })
      .catch((error) => {
        console.error(
          "Erreur lors du chargement de l'historique des demandes :",
          error
        );
      });
  }, []);

  const getCountByStatus = (status) => {
    switch (status) {
      case "ALL REQUESTS":
        return historiqueDemandes.length;
      case " Pending":
        return countProgress;
      case "Accepted":
        return countAccepted;
      case "Refused":
        return countRefused;
      default:
        return 0;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Refused":
        return "red";
      case "Accepted":
        return "green";
      case "In Progress":
        return "blue";
      default:
        return "orange"; // Default color or any other color you prefer
    }
  };

  return (
    <main className="main-container">
      <div className="main-cards">
        <div
          className="card"
          style={{ backgroundColor: getStatusColor("In Progress") }}
        >
          <div className="card-inner">
            <h3>Pending</h3>
            <VscGitPullRequestGoToChanges className="card_icon" />
            <p>{countProgress}</p>
          </div>
        </div>

        <div
          className="card"
          style={{ backgroundColor: getStatusColor("Accepted") }}
        >
          <div className="card-inner">
            <h3>ACCEPTED</h3>
            <VscGitPullRequestGoToChanges className="card_icon" />
            <p>{countAccepted}</p>
          </div>
        </div>

        <div
          className="card"
          style={{ backgroundColor: getStatusColor("Refused") }}
        >
          <div className="card-inner">
            <h3>REFUSED</h3>
            <BsPeopleFill className="card_icon" />
            <p>{countRefused}</p>
          </div>
        </div>

        <div
          className="card"
          style={{ backgroundColor: getStatusColor("ALL REQUESTS") }}
        >
          <div className="card-inner">
            <h3>ALL REQUESTS</h3>
            <BsFillBellFill className="card_icon" />
            <p>{getCountByStatus("ALL REQUESTS")}</p>
          </div>
        </div>
      </div>

      <HistoriqueDemande />
    </main>
  );
}

export default UserDashboard;
