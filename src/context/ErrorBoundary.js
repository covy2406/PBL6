// ErrorBoundary.js
import React, { Component } from "react";
import ErrorPage from "ErrorPage";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error, errorInfo) {
    // You can log the error to a logging service
    console.error("Error caught by error boundary:", error, errorInfo);
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      // You can customize this fallback UI
      return <ErrorPage />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
