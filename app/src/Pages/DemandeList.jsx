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
    <div className="container">
      <div className=" text-center" style={{
  backgroundColor: "#009578",
  padding: "20px 0",
  width: "100vh",  // Change from 100vh to 100%
}}>
          <h1 className="all-employees-heading">All Demandes</h1>
        </div>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndPaginatedDemandes.map((demande) => (
            <tr key={demande._id}>
              <td>{formatDate(demande.debut)}</td>
              <td>{formatDate(demande.fin)}</td>
              <td>{demande.reason}</td>
              <td>
                <select
                  className="form-select"
                  value={demande.Status}
                  onChange={(e) => changeDemandeStatus(demande._id, e.target.value)}
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
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-primary me-2"
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
        >
          Previous
        </button>
        <span className="align-self-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-primary ms-2"
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
