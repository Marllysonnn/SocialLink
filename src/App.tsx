import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Principal from './page/principal';
import UserForm from './login/UserForm';
import './App.scss'

const App: React.FC = () => {
  return (
    <div id='App'>
      <Router>
        <Routes>
          <Route path="/" element={<UserForm />} /> { }
          <Route path="/user/:uid" element={<Principal />} /> { }
        </Routes>
      </Router>
    </div>
  );
};

export default App;
