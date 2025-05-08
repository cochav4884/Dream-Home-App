import React from 'react';

// Functional component for rendering the app header
const Header: React.FC = () => {
  return (
    // Main header section
    <header className="header bg-info p-3">
      {/* Title of the app */}
      <h1 className='bg-info text-dark'>🌟 Dream Home Builder App</h1>
    </header>
  );
};

export default Header;
// This component serves as the header for the Dream Home Builder application, displaying the app title. It can be styled further with CSS to match the overall design of the app.
// The Header component is a simple functional component that displays the title of the application.
