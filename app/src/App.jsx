import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Login from "./Pages/Login";
//import AppLayout from "./Components/Layout";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Register from "./Pages/Register";
import EmployeesList from "./Pages/EmployeesList";
import AddEmployee from "./Pages/AddEmployee";
import EditEmployee from "./Pages/EditEmployee";
import History from "./Pages/History";
import Demande from "./Pages/DemandeConge";
import InfoUser from "./Components/InfoUser";
import HistoriqueDemande from "./Components/HistoriqueDemande";
import AuthAdmin from "./AuthAdmin";
import AuthUser from "./authUser";
import DemandeList from "./Pages/DemandeList";

import { useState, useEffect } from "react";

function App() {
  const storedUser = window.localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const [isAdmin , setIsAdmin ]= useState(false);
  useEffect(() => {
    if (user && user.isAdmin) {
      setIsAdmin(true);
    }
  }, [user]);
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="layout-container">
        <Sidebar />
        </div>

        <Routes>
        
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<AuthAdmin allowedRoles={isAdmin }/>} >
            <Route path="/employees" element={<EmployeesList />} />
            <Route path="/addemployee" element={<AddEmployee />} />
            <Route path="/editEmployee/:id" element={<EditEmployee />} />
            <Route path="/history" element={<History />} />
            <Route path="/demandelist" element={<DemandeList />} />
          </Route>

          <Route element={<AuthUser allowedRoles={user}/>} />
          <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/demande" element={<Demande />} />
            <Route path="/infoUser" element={<InfoUser />} />
            <Route path="/historiqueDem" element={<HistoriqueDemande />} />
            <Route />

          </Routes>
          </div>
         
    </BrowserRouter>
  );
}
export default App;
