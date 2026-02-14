import React, { useState } from 'react';
import axios from 'axios';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';


const AddEmployee = () => {

  const [employee, setEmployee] = useState({
    employee_id: '',
    employee_name: '',
    email: '',
    department: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      //await axios.post('http://127.0.0.1:8000/api/create/', employee);
      await API.post('create/', employee);
      alert('Employee Added Successfully!');
      navigate('/'); 
    } catch (error) {
      console.error("Submission Error:", error.response?.data);
      alert('Error: ' + JSON.stringify(error.response?.data));
    }
  };

  return (
    <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Employee ID</label>
          <input type="text" name="employee_id" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" name="employee_name" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Department</label>
          <input type="text" name="department" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;