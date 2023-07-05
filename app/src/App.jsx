import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from "./Pages/dashboard";
import Login from "./Pages/Login";
import Layout from './Components/Layout';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Register from './Pages/Register';
function App() {
 

  return (
    <BrowserRouter>
      <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
      </Routes>
      </Layout>
      
    </BrowserRouter>
  )
}

export default App
