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
                    <div className="day-info">
                        <p>Saturday</p>
                        <ul>
                            <li>one</li>
                            <li>one</li>
                            <li>one</li>
                        </ul>
                    </div>
                    <div className="day-info">
                        <p>Sunday</p>
                        <ul>
                            <li>one</li>
                            <li>one</li>
                            <li>one</li>
                        </ul>
                    </div>
                    <div className="day-info">
                        <p>Monday</p>
                        <ul>
                            <li>one</li>
                            <li>one</li>
                            <li>one</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
