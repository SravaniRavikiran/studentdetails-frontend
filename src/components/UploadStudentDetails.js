import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const UploadStudentDetails = () => {
  const [file, setFile] = useState(null);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [searchRollNo, setSearchRollNo] = useState('');
  const [isUploading, setIsUploading] = useState(false); // New state to track uploading

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage(''); // Clear previous messages
    setError('');
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError('Please select a file.');
      return;
    }

    // Set isUploading to true to indicate the start of upload
    setIsUploading(true);

    // Read and parse the Excel file
    const reader = new FileReader();
    reader.onload = async (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);

      // Validate data
      const invalidEntries = [];
      const uniqueEntries = new Set();
      const validData = [];

      data.forEach((row, index) => {
        if (!row.rollNo || !row.branch || !row.batch) {
          invalidEntries.push(index + 1); // Line number (1-based)
        } else if (uniqueEntries.has(row.rollNo)) {
          invalidEntries.push(`Duplicate entry found for Roll No ${row.rollNo} at line ${index + 1}`);
        } else {
          uniqueEntries.add(row.rollNo);
          validData.push(row);
        }
      });

      if (invalidEntries.length > 0) {
        setError(`Invalid data found at lines: ${invalidEntries.join(', ')}`);
        setIsUploading(false); // Stop the loading state
        return;
      }

      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`http://localhost:5000/upload-student-details`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Notify user of success
        setMessage(`Upload successful. ${validData.length} entries processed.`);
        setIsUploading(false); // Stop loading after success
        fetchStudentData(); // Fetch student data after successful upload
      } catch (err) {
        console.error('Error uploading file:', err);
        setError('Failed to upload file.');
        setIsUploading(false); // Stop loading on error
      }
    };
    reader.readAsBinaryString(file);
  };

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/studentdetails`);
      setStudents(response.data);
    } catch (err) {
      console.error('Error fetching student data:', err);
      setError('Failed to fetch student data.');
    }
  };

  const handleSearch = (e) => {
    setSearchRollNo(e.target.value);
    if (e.target.value === '') {
      setFilteredStudents([]);
    } else {
      const filtered = students.filter(student =>
        student.rollNo?.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  return (
    <div className="text-center row">
      <div className='col-md-3'></div>
      <div className='col-md-6'>
      <h4 className="mb-4">Upload Student Details</h4>
      <div className="d-flex gap-2 mb-3 align-items-center justify-content-center">
        <input type="file" className="form-control" onChange={handleFileChange} />
        <button
          className="btn btn-primary"
          onClick={handleFileUpload}
          disabled={isUploading} // Disable button during upload
        >
          {isUploading ? 'Uploading...' : 'Upload'} {/* Change button text dynamically */}
        </button>
      </div>
      {message && <p className="p-3 mb-2 bg-success text-white text-center">{message}</p>}
      {error && <p className="p-3 mb-2 bg-danger text-white text-center">{error}</p>}
      </div>

      <div className='col-md-3'></div>

    </div>
  );
};

export default UploadStudentDetails;
