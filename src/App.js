import React from 'react';
import './App.css'
import C1 from './components/C1';
import C2 from './components/C2';
import C3 from './components/C3';
import C4 from './components/C4';
import C5 from './components/C5';
import AppfocusedProvider from './context/AppfocusedContext';

function App() {
  return (
    <AppfocusedProvider>
      <div className="container">
        <C1 timeRange="Put your code here" refreshInterval_Secs={60} />
        <C2 timeRange="Put your code here" refreshInterval_Secs={10} />
        <C3 timeRange="Put your code here" refreshInterval_Secs={15} />
        <C4 timeRange="Put your code here" refreshInterval_Secs={42} />
        <C5 timeRange="Put your code here" refreshInterval_Secs={30} />
      </div>
    </AppfocusedProvider>
  );
}

export default App;