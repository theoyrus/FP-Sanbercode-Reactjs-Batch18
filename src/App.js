import React from 'react';
// import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import Routes from './Route'
import { AuthProvider } from './AuthContext'

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Routes></Routes>
      </AuthProvider>
    </div >
  );
}

export default App;
