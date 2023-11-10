import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Pages/Login";
import AppLayout from "./Components/Layout";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Register from "./Pages/Register";
import EmployeesList from "./Pages/EmployeesList";
import AddEmployee from "./Pages/AddEmployee";
import EditEmployee from "./Pages/EditEmployee";
import History from "./Pages/History";
import Demande from "./Pages/demande";
import InfoUser from "./Components/InfoUser";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/employees" element={<EmployeesList />} />
          <Route path="/addemployee" element={<AddEmployee />} />
          <Route path="/editEmployee/:id" element={<EditEmployee />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/history" element={<History />} />
          <Route path="/demande" element={<Demande />} />
          <Route path="/infoUser" element={<InfoUser />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
