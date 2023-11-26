import React, { useState } from "react";
import axios from "axios";
import { ToastContainer ,toast } from "react-toastify";
import "../Styles/Demande.css";
import img from "../assets/img.png";

export default function Demande() {
  const [formData, setFormData] = useState({
    debut: "",
    fin: "",
    reason: "",
    msg: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.debut > formData.fin) {
      toast.error("The start date must be before or equal to the end date!");
      return; 
    }
    try {
      const response = await axios.post("/api/demandes", formData);

      toast.success("Demande sent successfully!",{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

      console.log("Response:", response.data);

      setFormData({
        debut: "",
        fin: "",
        reason: "",
        msg: "",
      });
    
    } catch (error) {
      toast.error("Failed to send demande");

      console.error("Error:", error.message);
    }
  };

  return (
    <section id="appointement">
      <div className="container">
        <div className="formulaire">
          <h3>create new demande</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="date"
              className="begin-date"
              name="debut"
              value={formData.debut}
              onChange={handleChange}
            />
            <input
              type="date"
              className="end-date"
              name="fin"
              value={formData.fin}
              onChange={handleChange}
            />
            <select
              name="reason"
              className="leave-type"
              value={formData.reason}
              onChange={handleChange}
            >
              <option disabled value="">
                Reason
              </option>
              <option value="paid leave">Paid Leave</option>
              <option value="sick leave">Sick Leave</option>
              <option value="unpaid leave">Unpaid Leave</option>
            </select>
            <input
              type="text"
              placeholder="Message"
              className="horaire"
              name="msg"
              value={formData.msg}
              onChange={handleChange}
            />
            <button type="submit" className="submit-btn">
              Soumettre
            </button>
          </form>
        </div>
        <div className="formulaire-image">
          <img src={img} alt="" />
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
