import React from 'react'; // Importing React to use JSX syntax
import App from './Components/App'; // Import the main App component from the components folder
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap's pre-built CSS for quick styling and components
import './index.css'; // Import your custom styles for the application
import './Styles/Form.css'
import './Components/Sidebar/Sidebar.module.css'

import { createRoot } from 'react-dom/client'; // Import createRoot from ReactDOM to render the app in a modern way

const root = createRoot(document.getElementById('root')!); // Get the root DOM element and ensure it's available, with non-null assertion (!)
root.render(
  <React.StrictMode> {/* StrictMode helps to identify potential problems in the app during development */}
    <App /> {/* Renders the main App component inside the StrictMode */}
  </React.StrictMode>
);