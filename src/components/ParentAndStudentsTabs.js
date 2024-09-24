import React, { useState } from 'react';
import StudentDataTwo from './StudentDataTwo';
import CocurricularActivitiewTwo from './CocurricularActivitiewTwo';
import FilterStudentMarksTwo from './FilterStudentMarksTwo';
import UploadMarksTwo from './UploadMarksTwo';
import SingleStudent from './SingleStudent';
import WholeStudentProfile from './WholeStudentProfile'
import FilterStudentMarks from './FilterStudentMarks'
import ActivityFilter from './ActivityFilter';
import StudentDetails from './studentDetails';
import ExtraCuricullarActivities from './ExtraCuricullarActivities';
import ExtraActivitiesForm from './ExtraActivitiesForm';
import ExtraActivityFilter from './ExtraActivityFilter';
const PasTab = ({ role }) => {
    const [newStudent, setNewStudent] = useState(null);
  const [rollNoFilter, setRollNoFilter] = useState('');

  const handleStudentAdded = (student) => {
    setNewStudent(student);
  };

  const handleRollNoChange = (e) => {
    setRollNoFilter(e.target.value);
  };

    const [activeForm, setActiveForm] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleForm = (formNumber) => {
        setActiveForm(formNumber);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <nav className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <button
                    type="button"
                    className="btn toggle-btn"
                    onClick={toggleSidebar}
                >
                    {sidebarOpen ? '←' : '→'}
                </button>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeForm === 1 ? 'active' : ''}`}
                            onClick={() => toggleForm(1)}
                        >
                            View Your Semester Marks
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeForm === 2 ? 'active' : ''}`}
                            onClick={() => toggleForm(2)}
                        >
                            View Your Academic Profile
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeForm === 3 ? 'active' : ''}`}
                            onClick={() => toggleForm(3)}
                        >
                            Co-curricular Activities
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeForm === 4 ? 'active' : ''}`}
                            onClick={() => toggleForm(4)}
                        >
                            Extra-curricular Activities
                        </button>
                    </li>
                </ul>
            </nav>
     
            {/* Main Content Area */}
            <main className={`main-content ${sidebarOpen ? 'with-sidebar' : 'full-width'}`}>
                <div className="content-wrapper pt-3">
                {role === 'student' && (<StudentDetails role={role} />)}
                <div className="student-details-container">
                    {activeForm === 1 && (
                        <div>
                            <FilterStudentMarks/>
                                  {/* <SingleStudent rollNoFilter={rollNoFilter} /> */}
                            {/* <UploadMarksTwo /> */}
                        </div>
                    )}
                    </div>
                    {activeForm === 2 && <WholeStudentProfile />}
                    {activeForm === 3 && (
                        <div className='border-top my-3'>
                        
                        <CocurricularActivitiewTwo/>
                       
                        <ActivityFilter />
                        
                        </div>
                        )}
                    {activeForm === 4 && (
                        <div className='border-top my-3'>
                        <ExtraActivitiesForm/>

                        <ExtraActivityFilter/>
                        </div>
                    )}

                </div>
            </main>
   
        </div>
    );
};

export default PasTab;
