import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-8">
          <div className="bg-red-900/50 p-6 rounded-xl border border-red-500 max-w-lg">
            <h1 className="text-2xl font-bold mb-4">Something went wrong.</h1>
            <p className="font-mono text-sm bg-black/50 p-4 rounded mb-4 overflow-auto">
              {this.state.error && this.state.error.toString()}
            </p>
            <button 
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold"
            >
              Reset App Data (Fix Crash)
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
