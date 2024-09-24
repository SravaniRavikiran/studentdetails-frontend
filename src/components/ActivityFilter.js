import React, { useState } from 'react';
import axios from 'axios';

const ActivityFilter = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchRollNo, setSearchRollNo] = useState('');

  const fetchActivities = async (rollNo) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/activity/rollNo?rollNo=${rollNo}`);
      setActivities(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching activities');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchRollNo) {
      fetchActivities(searchRollNo);
      setError(null); // Clear previous errors
    } else {
      setError('Please enter a roll number');
      setActivities([]); // Clear previous data if any
    }
  };

  // Filter to get unique student data (rollNo, name, batch) from activities
  const uniqueStudentData = activities.length > 0
    ? { rollNo: activities[0].rollNo, sname: activities[0].sname, batches: activities[0].batches }
    : null;

  return (
    <div className="container-fluid border-top row mt-3">
      <div className='col-md-3'></div>
      <div className='col-md-6'>

        <h4 className='text-center mt-3'>View Activities</h4>

        <form onSubmit={handleSearch} className="d-flex align-items-center gap-1 mt-3">
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
          {!loading && activities.length === 0 && searchRollNo && <p>No activities found for this roll number.</p>}
        </div>
      </div>
      <div className='col-md-3'></div>

      {/* Display student info table if activities are found */}
      {!loading && activities.length > 0 && uniqueStudentData && (
        <div className="mt-4">
          <div className="d-flex justify-content-between">

            <h6>Roll No : {uniqueStudentData.rollNo}</h6>
            <h6>Student Name : {uniqueStudentData.sname}</h6>
            <h6>Batch : {uniqueStudentData.batches}</h6>


          </div>
        </div>
      )}

      {/* Display activity details if available */}
      {!loading && activities.length > 0 && (
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
              {activities.map((activity, index) => (
                <tr key={index}>
                  <td>{activity.aname}</td>
                  <td>{activity.agroup}</td>
                  <td>{activity.fdate ? activity.fdate : 'NIL'}</td>
                  <td>{activity.tdate ? activity.tdate : 'NIL'}</td>
                  <td>{activity.competitionLevel}</td>
                  <td>{activity.host}</td>
                  <td>{activity.prizes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActivityFilter;
