import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { useDropzone } from 'react-dropzone';
import CocurricularTabs from './CocurricularTabs';

const CocurricularActivities = ({ onActivityAdded = () => {} }) => {
  const [sname, setStudentname] = useState('');
  const [rno, setRollno] = useState('');
  const [branch, setBranch] = useState('');
  const [aname, setActivities] = useState('');
  const [date, setDate] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [host, setHost] = useState('');

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
      const response = await axios.post('http://localhost:5000/upload-activity', { activityData: excelData }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      onActivityAdded(response.data);
      setSubmitted(true);
      setExcelData(null);
    } catch (error) {
      console.error('Error uploading activity data:', error.message);
      setSubmitted(false);
    } finally {
      setIsSubmitting(false); // Set submission state to false after upload is done
    }
  };

  return (
    <div>
      <div className='container width-35'>
        <h5 className='text-center'>Upload Co-curricular Activities Excel</h5>
        <form className='row' onSubmit={handleSubmit}>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p className='text-center'>Drag 'n' drop an Excel file here, or click to select one</p>
          </div>
          {errors.excel && <span  className='p-3 mb-2 bg-danger text-white text-center'>{errors.excel}</span>}

          <div className="col-12 text-center pt-3">
            <button className="btn btn-primary btn-text rounded-0" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'} {/* Change button text */}
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
      <div className='pt-3'>
      <CocurricularTabs />
      </div>
    </div>
  );
};

export default CocurricularActivities;
