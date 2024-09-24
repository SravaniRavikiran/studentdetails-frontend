import React, { useState } from 'react';
import axios from 'axios';

const ExtraActivitiesForm = ({ onActivityAdded = () => {} }) => {
  const [sname, setStudentname] = useState('');
  const [rollNo, setRollno] = useState('');
  const [batches, setBatches] = useState('');
  const [aname, setActivities] = useState('');
  const [agroup, setGroupName] = useState('');
  const [fdate, setFdate] = useState('');
  const [tdate, setTdate] = useState('');
  const [competitionLevel, setCompetitionLevel] = useState('');
  const [prizes, setPrizes] = useState('');
  const [host, setHost] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [studentActivities, setStudentActivities] = useState([]);


  const validateForm = () => {
    const newErrors = {};
    if (!sname) newErrors.sname = 'Student name is required';
    if (!rollNo) newErrors.rollNo = 'Roll number is required';
    if (!batches) newErrors.batches = 'Branch is required';
    if (!aname) newErrors.aname = 'Activity name is required';
    if (!fdate) newErrors.fdate = 'From Date is required';
    if (!tdate) newErrors.tdate = 'To Date is required';
    if (!agroup) newErrors.agroup = 'Activity group is required';
    if (!prizes) newErrors.prizes = 'Prizes are required';
    if (!host) newErrors.host = 'Host is required';
    if (!competitionLevel) newErrors.competitionLevel = 'Competition level is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);

    // Validate the form inputs
    const formValid = validateForm();
    if (!formValid) {
        return;  // Stop if the form is not valid
    }

    // Prepare the data from the form inputs
    const formActivityData = [{
      batches,
      rollNo,
      sname,
      aname,
      agroup,
      fdate,
      tdate,
      competitionLevel,
      host,
      prizes,
    }];

    try {
        const response = await axios.post('http://localhost:5000/upload-eactivity', { eactivityData: formActivityData }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        onActivityAdded(response.data);
        setSubmitted(true);

        // Clear form fields after successful submission
        setStudentname('');
        setRollno('');
        setBatches('');
        setActivities('');
        setGroupName('');
        setFdate('');
        setTdate('');
        setPrizes('');
        setCompetitionLevel('');
        setHost('');
    } catch (error) {
        console.error('Error uploading activity data:', error.message);
        setSubmitted(false);
    }
  };

  const fetchStudentActivities = async (rollNo) => {
    try {
      const response = await axios.get(`http://localhost:4000/eactivity?rollNo=${rollNo}`);
      setStudentActivities(response.data);
    } catch (error) {
      console.error('Error fetching student activities:', error.message);
    }
  };

  return (
    <div>
     <div className='container  pt-3'>
      <h4>Enter Activities</h4>
      <form className='row' onSubmit={handleSubmit}>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-3">
          <input
            type="text"
            className="form-control rounded-0"
            placeholder='Student Name'
            value={sname}
            onChange={(e) => setStudentname(e.target.value)}
          />
          {errors.sname && <span style={{ color: 'red' }}>{errors.sname}</span>}
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-3">
          <input
            type="text"
            className="form-control rounded-0"
            placeholder='Roll No'
            value={rollNo}
            onChange={(e) => setRollno(e.target.value)}
          />
          {errors.rollNo && <span style={{ color: 'red' }}>{errors.rollNo}</span>}
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-3">
          <input
            type="text"
            className="form-control rounded-0"
            placeholder='Batch'
            value={batches}
            onChange={(e) => setBatches(e.target.value)}
          />
          {errors.batches && <span style={{ color: 'red' }}>{errors.batches}</span>}
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-3">
          <input
            type="text"
            className="form-control rounded-0"
            placeholder='Activity Name'
            value={aname}
            onChange={(e) => setActivities(e.target.value)}
          />
          {errors.aname && <span style={{ color: 'red' }}>{errors.aname}</span>}
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-3">
          <input
            type="text"
            className="form-control rounded-0"
            placeholder='Activity Group Name'
            value={agroup}
            onChange={(e) => setGroupName(e.target.value)}
          />
          {errors.agroup && <span style={{ color: 'red' }}>{errors.agroup}</span>}
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-3">
          <input
            type="date"
            className="form-control rounded-0"
            placeholder='From Date'
            value={fdate}
            onChange={(e) => setFdate(e.target.value)}
          />
          {errors.fdate && <span style={{ color: 'red' }}>{errors.fdate}</span>}
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-3">
          <input
            type="date"
            className="form-control rounded-0"
            placeholder='To Date'
            value={tdate}
            onChange={(e) => setTdate(e.target.value)}
          />
          {errors.tdate && <span style={{ color: 'red' }}>{errors.tdate}</span>}
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-3">
          <input
            type="text"
            className="form-control rounded-0"
            placeholder='Competition Level'
            value={competitionLevel}
            onChange={(e) => setCompetitionLevel(e.target.value)}
          />
          {errors.competitionLevel && <span style={{ color: 'red' }}>{errors.competitionLevel}</span>}
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-3">
          <input
            type="text"
            className="form-control rounded-0"
            placeholder='Prizes you Won'
            value={prizes}
            onChange={(e) => setPrizes(e.target.value)}
          />
          {errors.prizes && <span style={{ color: 'red' }}>{errors.prizes}</span>}
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-3">
          <input
            type="text"
            className="form-control rounded-0"
            placeholder='Hosted By'
            value={host}
            onChange={(e) => setHost(e.target.value)}
          />
          {errors.host && <span style={{ color: 'red' }}>{errors.host}</span>}
        </div>

        <div className="col-12 text-center pt-4">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
        {submitted && (
          <div className="col-12 pt-3">
            <div className="alert alert-success text-center" role="alert">
              Details Submitted successfully!
            </div>
          </div>
        )}
      </form>
    </div>
    </div>
  );
};

export default ExtraActivitiesForm;
