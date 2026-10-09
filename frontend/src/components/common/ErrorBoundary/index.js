import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CRITICAL UI ERROR CAUGHT BY ERROR BOUNDARY:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0F172A',
          color: '#FFFFFF',
          fontFamily: 'Inter, system-ui, sans-serif',
          padding: '24px',
          boxSizing: 'border-box',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '540px',
            background: '#1E293B',
            borderRadius: '20px',
            padding: '36px',
            border: '1px solid #334155',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
            <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>
              Something went wrong loading this view
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
              {this.state.error?.message || 'An unexpected rendering error occurred.'}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  background: '#2563EB',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Reload Page
              </button>
              <button
                onClick={this.handleReset}
                style={{
                  background: '#334155',
                  color: '#F8FAFC',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Reset & Go to Login
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
