import React, { useState, useEffect } from "react";
import axios from "axios";
import { LuSearch } from "react-icons/lu";

const HistoriqueDemande = () => {
  const [historiqueDemandes, setHistoriqueDemandes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState(5); 
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("/api/demandes")
      .then((response) => {
        setHistoriqueDemandes(response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors du chargement de l'historique des demandes :",
          error
        );
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return dateString; 
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Refused":
        return "red";
      case "Accepted":
        return "green";
      default:
        return "blue"; // Default color or any other color you prefer
    }
  };

  // Filter and paginate the data based on the search query, number of items per page, and current page
  const filteredAndPaginatedDemandes = historiqueDemandes
    .filter((demande) =>
      demande.reason.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice((currentPage - 1) * perPage, currentPage * perPage);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredAndPaginatedDemandes.length / perPage);

  return (
    <div style={{ paddingLeft: "100px" }}>
      <div
        style={{
          marginBottom: "20px",
          margin: "20px",
          marginTop: "100px",
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <LuSearch
          style={{ position: "absolute", marginLeft: "10px", color: "black" }}
        />
        <input
          type="text"
          placeholder="Search Request "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ paddingLeft: "40px", width: "300px", borderRadius: "5px" }}
        />
      </div>
      <div style={{ paddingLeft: "600px" }}>
        <label style={{ marginRight: "10px", color: "black" }}>
          Items per page:
        </label>
        <select
          style={{ backgroundColor: "white", color: "black", width: "200px" }}
          value={perPage}
          onChange={(e) => {
            setPerPage(Number(e.target.value));
            setCurrentPage(1); // Reset to the first page when changing items per page
          }}
        >
          {[2, 4, 6].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <table
        style={{
          width: "900px",
          borderCollapse: "collapse",
          margin: "20px 0",
          backgroundColor: "lightblue",
        }}
      >
        <thead style={{ backgroundColor: "lightblue" }}>
          <tr style={{ textAlign: "center", color: "black", width: "100%" }}>
            <th colSpan="4">Leave Request History</th>
          </tr>
          <tr>
            <th style={{ padding: "10px", textAlign: "left", color: "black" }}>
              Start date
            </th>
            <th style={{ padding: "10px", textAlign: "left", color: "black" }}>
              End date
            </th>
            <th style={{ padding: "10px", textAlign: "left", color: "black" }}>
              Reason
            </th>
            <th style={{ padding: "10px", textAlign: "left", color: "black" }}>
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredAndPaginatedDemandes.map((demande) => (
            <tr key={demande._id} style={{ border: "1px solid " }}>
              <td style={{ padding: "10px" }}>{formatDate(demande.debut)}</td>
              <td style={{ padding: "10px" }}>{formatDate(demande.fin)}</td>
              <td style={{ padding: "10px" }}>{demande.reason}</td>
              <td
                style={{
                  padding: "10px",
                  color: getStatusColor(demande.Status),
                }}
              >
                {demande.Status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
          }
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HistoriqueDemande;
