import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API from './api';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchEmployees = async () => {
    try {
      //const response = await axios.get('http://127.0.0.1:8000/api/list/');
      const response = await API.get('list/');
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  
  const deleteEmployee = async (dbId) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        //await axios.delete('http://127.0.0.1:8000/api/delete/', {
        await API.delete('delete/', {
          data: { id: dbId } 
        });
        
        setEmployees(employees.filter(emp => emp.id !== dbId));
        alert("Employee deleted successfully");
      } catch (error) {
        console.error("Delete Error:", error.response?.data);
        alert("Error deleting employee");
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="card shadow border-0">
      <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Employee Management</h4>
        <span className="badge bg-primary">{employees.length} Total</span>
      </div>
      <div className="card-body p-0">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>Emp ID</th>
              <th>Full Name (Click for Details)</th>
              <th>Email</th>
              <th>Department</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td className="fw-bold">{emp.employee_id}</td>
                  <td>
                    
                    <Link to={`/employee/${emp.id}`} className="text-decoration-none fw-bold text-primary">
                      {emp.employee_name}
                    </Link>
                  </td>
                  <td>{emp.email}</td>
                  <td>
                    <span className="badge bg-secondary">{emp.department}</span>
                  </td>
                  <td className="text-center">
                    <button 
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteEmployee(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-5 text-muted">
                  No employee records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
