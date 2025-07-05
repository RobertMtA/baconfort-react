import React, { useState, useEffect } from 'react';
import { API_URL } from '../services/api';

const DebugTest = () => {
  const [debugInfo, setDebugInfo] = useState({
    apiUrl: API_URL,
    envVar: import.meta.env.VITE_API_URL,
    mode: import.meta.env.MODE,
    testResult: null
  });

  const testLogin = async () => {
    try {
      console.log('🧪 Testing login with URL:', `${API_URL}/api/auth/login`);
      
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@baconfort.com',
          password: 'admin123'
        })
      });

      console.log('📡 Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Login response:', data);
        setDebugInfo(prev => ({
          ...prev,
          testResult: { success: true, data }
        }));
      } else {
        const error = await response.text();
        console.log('❌ Login error:', error);
        setDebugInfo(prev => ({
          ...prev,
          testResult: { success: false, error, status: response.status }
        }));
      }
    } catch (error) {
      console.log('🚨 Network error:', error);
      setDebugInfo(prev => ({
        ...prev,
        testResult: { success: false, error: error.message }
      }));
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>🔍 Debug API Configuration</h1>
      
      <div style={{ background: '#f5f5f5', padding: '15px', marginBottom: '20px' }}>
        <h2>📋 Configuración Actual</h2>
        <p><strong>API_URL:</strong> {debugInfo.apiUrl}</p>
        <p><strong>VITE_API_URL:</strong> {debugInfo.envVar}</p>
        <p><strong>Mode:</strong> {debugInfo.mode}</p>
        <p><strong>Login URL:</strong> {debugInfo.apiUrl}/api/auth/login</p>
      </div>

      <button 
        onClick={testLogin}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        🧪 Test Login
      </button>

      {debugInfo.testResult && (
        <div style={{ 
          background: debugInfo.testResult.success ? '#d4edda' : '#f8d7da',
          padding: '15px',
          borderRadius: '5px'
        }}>
          <h3>🧪 Resultado del Test</h3>
          {debugInfo.testResult.success ? (
            <div>
              <p style={{ color: 'green' }}>✅ <strong>Login exitoso!</strong></p>
              <pre>{JSON.stringify(debugInfo.testResult.data, null, 2)}</pre>
            </div>
          ) : (
            <div>
              <p style={{ color: 'red' }}>❌ <strong>Login falló</strong></p>
              <p>Status: {debugInfo.testResult.status}</p>
              <p>Error: {debugInfo.testResult.error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DebugTest;
