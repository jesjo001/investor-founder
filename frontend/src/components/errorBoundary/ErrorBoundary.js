import React, { Component } from "react";
import "./errorBoundary.css";
import error from "../../assets/images/errorIcon.svg";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="muon-error">
          <section>
            <div className="text-center">
              <img src={error} alt="error" />
            </div>
            <p> Something went wrong</p>
            <span>It is not you it is us, please try again</span>
          </section>
        </div>
      );
    }

    return this.props.children;
  }
}
