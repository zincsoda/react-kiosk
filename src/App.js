import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="App offline-page">
        <div className="offline-container">
          <div className="offline-icon">📡</div>
          <h1 className="offline-title">You're Offline</h1>
          <p className="offline-message">
            It looks like you're not connected to the internet. 
            Please check your connection and try again.
          </p>
          <div className="offline-status">
            <span className="status-indicator offline"></span>
            <span className="status-text">No Internet Connection</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="online-indicator">
        <span className="status-indicator online"></span>
        <span className="status-text">Online</span>
      </div>
      <div className="quote-container">
        <h1 className="quote">"The way to get started is to quit talking and begin doing."</h1>
        <p className="author">— Walt Disney</p>
      </div>
    </div>
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default App;
