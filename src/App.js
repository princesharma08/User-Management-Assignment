import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import Navbar from './components/Navbar';
import UserView from './components/UserView';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<UserTable />} />
          <Route path="/add-user" element={<UserForm />} />
          <Route path="/edit-user/:id" element={<UserForm />} />
          <Route path="/user/:id" element={<UserView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
