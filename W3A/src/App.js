import React from 'react'
import './App.css';

function App() {
  return (
    <div className="App">
        <div className="topbar">topbar</div>
        <div className="content-container">
            <div className="sidebar">sidebar</div>
            <div className="content">
                <div className="day-list">
                    <h4>Saturday</h4>
                    <ul>
                        <li>one</li>
                        <li>one</li>
                        <li>one</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
