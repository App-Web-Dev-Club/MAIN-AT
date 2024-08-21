import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* Other routes */}
    </Routes>
  );
}

export default App;
