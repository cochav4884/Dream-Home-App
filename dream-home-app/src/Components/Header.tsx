import React from 'react';


// Functional component for rendering the app header
const Header: React.FC = () => {
  return (
    // Main header section with Bootstrap classes for styling
    <header className="header bg-info p-3 d-flex justify-content-between align-items-center">
      {/* Title of the app */}
      <h1 className="bg-info text-dark">🌟 Dream Home Builder App</h1>
    </header>
  );
};

export default Header;
