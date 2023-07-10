import { useState } from 'react'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'
import Contact from './Pages/Contact'
import About from './Pages/About'
 import Layout from './Components/Layout'
import './App.css'
import EmployeesList from './Pages/EmployeesList'
import EditEmployee from './Pages/EditEmployee'
import AddEmployee from './Pages/AddEmployee'
import Footer from './Components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
     <Router>
  
       {/* <Layout>  */}
        <Routes>
        <Route exact path="/" element={<Dashboard/>} />
        <Route exact path="/Login" element={<Login/>} />
        <Route exact path="/Contact" element={<Contact/>} />
        <Route exact path="/About" element={<About/>} />
        <Route exact path="/EmployeesList" element={<EmployeesList/>} />
        <Route exact path="/EditEmployee/:id" element={<EditEmployee/>} />
        <Route exact path="/AddEmployee" element={<AddEmployee/>} />
       </Routes>
         {/* </Layout>  */}
        {/* <h1 className="text-3xl font-bold underline">
    Hello world!
  </h1> */}
  <Footer/>
    </Router>
    
    </div>
    
  )
}

export default App
