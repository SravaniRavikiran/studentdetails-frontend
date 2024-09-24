
import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { useDropzone } from 'react-dropzone';
import ExtraCurricularTabs from './ExtraCurricularTabs';

const ExtraCuricullarActivities = ({ onEactivityAdded = () => {} }) => {
  const [excelData, setExcelData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [studentActivities, setStudentActivities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.xlsx, .xls',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);

    if (!excelData) {
      setErrors({ excel: 'Please upload an Excel file' });
      return;
    }

    setIsSubmitting(true); // Set submission state to true

    try {
      const response = await axios.post('http://localhost:5000/upload-eactivity', { eactivityData: excelData }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      onEactivityAdded(response.data);
      setSubmitted(true);
      setExcelData(null);
    } catch (error) {
      console.error('Error uploading activity data:', error.message);
      setSubmitted(false);
    }finally {
      setIsSubmitting(false); // Set submission state to false after upload is done
    }
  };

  const fetchStudentActivities = async (rollNo) => {
    try {
      const response = await axios.get(`http://localhost:5000/eactivity?rollNo=${rollNo}`);
      setStudentActivities(response.data);
    } catch (error) {
      console.error('Error fetching student activities:', error.message);
    }
  };

  return (
    <div>
      <div className='container width-35'>
        <h5 className='text-center'>Upload Extra-curicullar Activities Excel</h5>
        <form className='row' onSubmit={handleSubmit}>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p className='text-center'>Drag 'n' drop an Excel file here, or click to select one</p>
          </div>
          {errors.excel && <span  className='p-3 mb-2 bg-danger text-white text-center'>{errors.excel}</span>}
          
          <div className="col-12 text-center pt-4">
            <button className="btn btn-primary btn-text rounded-0" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
        {submitted && (
          <div className="col-12 pt-3">
            <div className="alert alert-success text-center" role="alert">
              Data Uploaded successfully!
            </div>
          </div>
        )}
      </div>
      <ExtraCurricularTabs/>
    </div>
  );
};

export default ExtraCuricullarActivities;


