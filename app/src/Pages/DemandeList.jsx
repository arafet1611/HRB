import React, { useState, useEffect } from "react";
import axios from "axios";

const DemandeList = () => {
  const [historiqueDemandes, setHistoriqueDemandes] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("/api/demandes")
      .then((response) => {
        setHistoriqueDemandes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching demandes:", error);
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

  const changeDemandeStatus = async (id, status) => {
    try {
      await axios.put("/api/demandes/status", { id, status });
      setHistoriqueDemandes((prevDemandes) =>
        prevDemandes.map((demande) =>
          demande._id === id ? { ...demande, Status: status } : demande
        )
      );
    } catch (error) {
      console.error("Error changing demande status:", error);
    }
  };

  const filteredAndPaginatedDemandes = historiqueDemandes
    .filter(
      (demande) =>
        demande.reason.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedStatus === "" || demande.Status === selectedStatus)
    )
    .slice((currentPage - 1) * perPage, currentPage * perPage);

  const totalPages = Math.ceil(filteredAndPaginatedDemandes.length / perPage);

  return (
    <div style={{ paddingLeft: "200px" }}>
      {/* ... (unchanged) */}
      <table
        style={{
          width: "900px",
          borderCollapse: "collapse",
          margin: "20px 0",
          backgroundColor: "lightblue",
        }}
      >
        <tbody>
          {filteredAndPaginatedDemandes.map((demande) => (
            <tr key={demande._id} style={{ border: "1px solid " }}>
              <td style={{ padding: "10px" }}>{formatDate(demande.debut)}</td>
              <td style={{ padding: "10px" }}>{formatDate(demande.fin)}</td>
              <td style={{ padding: "10px" }}>{demande.reason}</td>
              <td style={{ padding: "10px" }}>
                <select
                  value={demande.Status}
                  onChange={(e) => changeDemandeStatus(demande._id, e.target.value)}
                  style={{ marginLeft: "10px", padding: "5px" }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Refused">Refused</option>
                </select>
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

export default DemandeList;
