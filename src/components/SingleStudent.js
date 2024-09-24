import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SingleStudent = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudent, setFilteredStudent] = useState(null); // To hold the single filtered student
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [searchRollNo, setSearchRollNo] = useState('');

  const fetchStudentData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/studentdetails');
      setStudents(response.data);
    } catch (err) {
      console.error('Error fetching student data:', err);
      setError('Failed to fetch student data.');
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();  // Prevent page reload if the button is inside a form

    if (!searchRollNo) {
        setError('Please enter a Roll No to search.');
        return;
    }

    const foundStudent = students.find(student =>
        student.rollNo && student.rollNo.toLowerCase() === searchRollNo.toLowerCase()
    );

    if (foundStudent) {
        setFilteredStudent(foundStudent);
        setError('');
    } else {
        setFilteredStudent(null);
        setError('No student found with the given Roll No.');
    }
};


  useEffect(() => {
    fetchStudentData();
  }, []);

  return (
    <div className="mt-5 row">
      <div className='col-md-3'></div>
      <div className='col-md-6'>

      <div className="mb-4 d-flex gap-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Roll No"
          value={searchRollNo}
          onChange={(e) => setSearchRollNo(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>
      {message && <p className="p-3 mb-2 bg-success text-white">{message}</p>}
      {error && <p className="p-3 mb-2 bg-danger text-white">{error}</p>}
      </div>
      <div className='col-md-3'></div>

      {filteredStudent && (
        <div className="table-responsive mt-4">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Father Name</th>
                <th>Roll No</th>
                <th>Batch</th>
                <th>Branch</th>
                <th>Mobile Number</th>
                <th>Parent Number</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th>Address</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{filteredStudent.name}</td>
                <td>{filteredStudent.fatherName}</td>
                <td>{filteredStudent.rollNo}</td>
                <td>{filteredStudent.batch}</td>
                <td>{filteredStudent.branch}</td>
                <td>{filteredStudent.mobileNumber}</td>
                <td>{filteredStudent.parentNumber}</td>
                <td>{filteredStudent.email}</td>
                <td>{new Date(filteredStudent.dateOfBirth).toLocaleDateString()}</td>
                <td>{filteredStudent.address}</td>
                <td>{filteredStudent.gender}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SingleStudent;
