import React, { Component } from 'react';
import type { ErrorInfo } from 'react';

// Interface for the props that the ErrorBoundary component expects.
interface ErrorBoundaryProps {
  children: React.ReactNode; // The children prop can be any valid React node
}

// Interface for the state of the ErrorBoundary component.
interface ErrorBoundaryState {
  hasError: boolean; // State to track if an error has occurred
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false }; // Initially, no error has occurred
  }

  // This lifecycle method is called when an error is thrown in any of the child components.
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }; // When an error occurs, set hasError to true to trigger a re-render
  }

  // This lifecycle method is called after an error is thrown.
  // You can log the error information here or send it to a logging service.
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo); 
    // Logs the error and error information for debugging purposes
  }

  render() {
    // If an error has occurred, render fallback UI (an error message in this case)
    if (this.state.hasError) {
      return <h2>Something went wrong! 😞</h2>;
    }

    // If no error, render the children components
    return this.props.children;
  }
}

export default ErrorBoundary;
// This ErrorBoundary component is used to catch JavaScript errors in the child component tree, log those errors, and display a fallback UI instead of crashing the entire app.
// It is a common pattern in React applications to handle errors gracefully and improve user experience.