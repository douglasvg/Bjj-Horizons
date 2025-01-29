import React from 'react';
    import './Toggle.css';

    function Toggle({ filter, setFilter }) {
      return (
        <div className="toggle-container">
          <span className={filter === 'Gi' ? 'active' : ''}>Gi</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={filter === 'No-Gi'}
              onChange={() => setFilter(filter === 'Gi' ? 'No-Gi' : 'Gi')}
            />
            <span className="slider"></span>
          </label>
          <span className={filter === 'No-Gi' ? 'active' : ''}>No-Gi</span>
        </div>
      );
    }

    export default Toggle;
