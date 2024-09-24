import React, { useState } from 'react';
import axios from 'axios';

const ExtraActivityFilter = () => {
  const [eactivities, setEactivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchRollNo, setSearchRollNo] = useState('');

  const fetchEactivities = async (rollNo) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/eactivity/rollNo?rollNo=${rollNo}`);
      setEactivities(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching activities');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchRollNo) {
      fetchEactivities(searchRollNo);
      setError(null); // Clear previous errors
    } else {
      setError('Please enter a roll number');
      setEactivities([]); // Clear previous data if any
    }
  };

  // Extract unique student information (first occurrence only)
  const uniqueStudentData = eactivities.length > 0
    ? { rollNo: eactivities[0].rollNo, sname: eactivities[0].sname, batches: eactivities[0].batches }
    : null;

  return (
    <div className="container-fluid border-top row mt-3">
      <div className='col-md-3'></div>
      <div className='col-md-6'>
        <h4 className='text-center mt-3'>View Activities</h4>

        <form onSubmit={handleSearch} className="d-flex justify-content-center gap-1 mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Roll Number"
            value={searchRollNo}
            onChange={(e) => setSearchRollNo(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>
        <div className='pt-4'>
        {loading && <p>Loading...</p>}
        {error && <p className="p-3 mb-2 bg-danger text-white">{error}</p>}
         {!loading && eactivities.length === 0 && searchRollNo && <p>No activities found for this roll number.</p>}
         </div>
      </div>
      <div className='col-md-3'></div>

      {/* Display student info table if activities are found */}
      {!loading && eactivities.length > 0 && uniqueStudentData && (
        <div className="mt-4">
          <div className="d-flex justify-content-between">

            <h6>Roll No : {uniqueStudentData.rollNo}</h6>
            <h6>Student Name : {uniqueStudentData.sname}</h6>
            <h6>Batch : {uniqueStudentData.batches}</h6>


          </div>
        </div>
      )}

      {/* Display activity details if available */}
      {!loading && eactivities.length > 0 && (
        <div className="mt-4">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Activity Name</th>
                <th>Activity Group</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Competition Level</th>
                <th>Host</th>
                <th>Prizes</th>
              </tr>
            </thead>
            <tbody>
              {eactivities.map((eactivity, index) => (
                <tr key={index}>
                  <td>{eactivity.aname}</td>
                  <td>{eactivity.agroup}</td>
                  {/* Display hyphen if date is empty */}
                  <td>{eactivity.fdate ? eactivity.fdate : 'NIL'}</td>
                  <td>{eactivity.tdate ? eactivity.tdate : 'NIL'}</td>
                  <td>{eactivity.competitionLevel}</td>
                  <td>{eactivity.host}</td>
                  <td>{eactivity.prizes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExtraActivityFilter;
