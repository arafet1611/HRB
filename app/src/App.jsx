import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Pages/Login";
import AppLayout from "./Components/Layout"; // Rename the import to avoid conflictsimport About from "./Pages/About";
import Contact from "./Pages/Contact";
import Register from "./Pages/Register";
import EmployeesList from "./Pages/EmployeesList";
import About from "./Pages/About";
function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/employees" element={<EmployeesList />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
