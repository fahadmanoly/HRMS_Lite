import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import EmployeeList from './pages/EmployeeList';
import AddEmployee from './pages/AddEmployee';
import EmployeeDetail from './pages/EmployeeDetail';

function App() {
  return (
    <Router>

      <Navbar />
      
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/employee/:id" element={<EmployeeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;