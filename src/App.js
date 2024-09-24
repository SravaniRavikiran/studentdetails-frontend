// import logo from './logo.svg';
import './App.css';
import Nav from '../src/navigations/nav'
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  
  return (
    <div>
      <Router>
        <Nav />
      </Router>
     
    </div>
  );
}

export default App;
