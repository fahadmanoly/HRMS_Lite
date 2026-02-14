import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {API} from '../services/api';


const EmployeeDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  
  const [employee, setEmployee] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      
      //const empRes = await axios.get('http://127.0.0.1:8000/api/list/');
      const empRes = await API.get('list/');
      const currentEmp = empRes.data.find(e => e.id === parseInt(id));
      setEmployee(currentEmp);

      
      //const attRes = await axios.get(`http://127.0.0.1:8000/api/attendance/list/?employee_id=${id}`);
      const attRes = await API.get(`attendance/list/?employee_id=${id}`);
      setAttendance(attRes.data);
      setFilteredAttendance(attRes.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchData(); }, [fetchData]);


  useEffect(() => {
    if (filterDate) {
      setFilteredAttendance(attendance.filter(log => log.date === filterDate));
    } else {
      setFilteredAttendance(attendance);
    }
  }, [filterDate, attendance]);

  
  const totalPresent = attendance.filter(log => log.status === 'Present').length;
  const totalAbsent = attendance.filter(log => log.status === 'Absent').length;

  const handleMarkAttendance = async (statusType) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      //await axios.post(`http://127.0.0.1:8000/api/attendance/mark/${id}/`, {
      await API.post(`attendance/mark/${id}/`, {
        date: today,
        status: statusType 
      });
      alert(`Successfully marked ${statusType}`);
      fetchData(); 
    } catch (err) {
      alert(err.response?.data?.error || "Error updating attendance");
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;

  return (
    <div className="container mt-4">
      
      <button 
        className="btn btn-link text-decoration-none mb-3 p-0" 
        onClick={() => navigate(-1)}
      >
        <i className="bi bi-arrow-left"></i> ← Back to Employee List
      </button>

      <div className="row">
        
        <div className="col-md-4">
          <div className="card shadow-sm border-0 p-4 text-center mb-4">
            <div className="bg-light rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '70px', height: '70px'}}>
               <h2 className="mb-0 text-primary">{employee?.employee_name.charAt(0)}</h2>
            </div>
            <h4>{employee?.employee_name}</h4>
            <p className="text-muted small">Dept: {employee?.department}</p>
            <hr />
            
        
            <div className="row mb-3">
              <div className="col-6">
                <div className="p-2 border rounded bg-success bg-opacity-10">
                  <h5 className="text-success mb-0">{totalPresent}</h5>
                  <small className="text-muted">Present</small>
                </div>
              </div>
              <div className="col-6">
                <div className="p-2 border rounded bg-danger bg-opacity-10">
                  <h5 className="text-danger mb-0">{totalAbsent}</h5>
                  <small className="text-muted">Absent</small>
                </div>
              </div>
            </div>

            <div className="d-grid gap-2">
              <button className="btn btn-success btn-sm" onClick={() => handleMarkAttendance('Present')}>Mark Present</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleMarkAttendance('Absent')}>Mark Absent</button>
            </div>
          </div>
        </div>

        
        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
              <h5 className="mb-0">Attendance Log</h5>
              <div className="d-flex align-items-center">
                <input 
                  type="date" 
                  className="form-control form-control-sm" 
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
                {filterDate && (
                  <button className="btn btn-sm text-danger" onClick={() => setFilterDate('')}>Clear</button>
                )}
              </div>
            </div>
            <div className="card-body p-0">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendance.length > 0 ? (
                    filteredAttendance.map((log, i) => (
                      <tr key={i}>
                        <td>{log.date}</td>
                        <td>
                          <span className={`badge ${log.status === 'Present' ? 'bg-success' : 'bg-danger'}`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center py-4 text-muted">No records for this selection.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;