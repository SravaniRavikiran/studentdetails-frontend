import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentDetails = ({ role, studentExtra }) => {
  const [gitLink, setGitLink] = useState('');
  const [codeChef, setCodeChef] = useState('');
  const [hacker, setHacker] = useState('');
  const [leetCode, setLeetCode] = useState('');
  const [image, setImage] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [rollNo, setRollNo] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleGitLinkChange = (e) => setGitLink(e.target.value);
  const handleCodeChefChange = (e) => setCodeChef(e.target.value);
  const handleHackerChange = (e) => setHacker(e.target.value);
  const handleLeetCodeChange = (e) => setLeetCode(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleCertificateChange = (e) => setCertificate(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('githubLink', gitLink);
    formData.append('codeChef', codeChef);
    formData.append('hacker', hacker);
    formData.append('leetCode', leetCode);

    formData.append('profilePicture', image);
    formData.append('certificate', certificate);

    try {
      const response = await axios.put(`http://localhost:5000/student-extra/${rollNo}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Details successfully submitted!');
      console.log('Student extra details saved successfully:', response.data);
    } catch (error) {
      console.error('Failed to update student extra details:', error.message);
      setSuccessMessage('Failed to submit details. Please try again.');
    }
  };

  return (
    <div>
      {role === 'student' && (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group col-md-3 mb-3">
              <input
                type="text"
                className="form-control"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="Enter Roll Number"
                required
              />
              <label>Roll Number</label>
            </div>
            <div className="form-group col-md-3 mb-3">
              <input
                type="url"
                className="form-control"
                value={codeChef}
                onChange={handleCodeChefChange}
                placeholder="Provide your Codechef Proile Link"
              />
              <label>CodeChef</label>
            </div>
            <div className="form-group col-md-3 mb-3">
              <input
                type="url"
                className="form-control"
                value={hacker}
                onChange={handleHackerChange}
                placeholder="Provide your Hacker Rank profile Link"
              />
              <label>Hacker Rank</label>
            </div>
            <div className="form-group col-md-3 mb-3">
              <input
                type="url"
                className="form-control"
                value={gitLink}
                onChange={handleGitLinkChange}
                placeholder="Provide your GitHub Link"
              />
              <label>GitHub Profile</label>
            </div>
            <div className="form-group col-md-3 mb-3">
              <input
                type="url"
                className="form-control"
                value={leetCode}
                onChange={handleLeetCodeChange}
                placeholder="Provide your Leet Code profile Link"
              />
              <label>Leet Code</label>
            </div>
            <div className="form-group col-md-3 mb-3">
              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
              />
              <label>Upload Image</label>
            </div>

            <div className="form-group col-md-3 mb-3">
              <input
                type="file"
                className="form-control"
                onChange={handleCertificateChange}
              />
              <label>Upload Certificate</label>
            </div>
            <div className="col-md-3">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>

          </div>
        </form>
      )}

      {successMessage && <div className="alert alert-success">{successMessage}</div>}

   
    </div>
  );
};

export default StudentDetails;
