import React from 'react';
import './Header.css';

// PUBLIC_INTERFACE
function Header({ search, onSearchChange }) {
  return (
    <header className="notes-header">
      <span className="app-title" role="img" aria-label="Notes Logo">📝 Simple Notes</span>
      <input
        type="text"
        className="search-bar"
        placeholder="Search notes..."
        value={search}
        onChange={onSearchChange}
        aria-label="Search notes"
      />
    </header>
  );
}

export default Header;
