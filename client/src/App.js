import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import DonutNavBar from './components/navbar';
import ControlButtons from './components/controlButtons';
function App() {
  return (
    <div className="App">
      <DonutNavBar />
      <ControlButtons />
    </div>
  );
}

export default App;
