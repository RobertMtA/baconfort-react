import React, { useEffect, useState } from 'react';
import { API_URL } from '../services/api';

const ConfigTest = () => {
  const [testResults, setTestResults] = useState({
    envMode: import.meta.env.MODE,
    isProd: import.meta.env.PROD,
    viteApiUrl: import.meta.env.VITE_API_URL,
    finalApiUrl: API_URL,
    connectionTest: 'pending'
  });

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('🧪 Testing connection to:', `${API_URL}/api/health`);
        const response = await fetch(`${API_URL}/api/health`);
        
        if (response.ok) {
          const data = await response.json();
          setTestResults(prev => ({
            ...prev,
            connectionTest: { success: true, data }
          }));
        } else {
          setTestResults(prev => ({
            ...prev,
            connectionTest: { success: false, status: response.status }
          }));
        }
      } catch (error) {
        setTestResults(prev => ({
          ...prev,
          connectionTest: { success: false, error: error.message }
        }));
      }
    };

    testConnection();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>🔍 Configuración de API - BACONFORT</h1>
      
      <div style={{ background: '#f5f5f5', padding: '15px', marginBottom: '20px' }}>
        <h2>📋 Variables de Entorno</h2>
        <p><strong>Mode:</strong> {testResults.envMode}</p>
        <p><strong>Production:</strong> {testResults.isProd ? 'Yes' : 'No'}</p>
        <p><strong>VITE_API_URL:</strong> {testResults.viteApiUrl || 'No configurada'}</p>
        <p><strong>API_URL final:</strong> {testResults.finalApiUrl}</p>
      </div>

      <div style={{ background: '#e8f5e8', padding: '15px', marginBottom: '20px' }}>
        <h2>🧪 Test de Conexión</h2>
        {testResults.connectionTest === 'pending' && <p>⏳ Probando conexión...</p>}
        {testResults.connectionTest?.success === true && (
          <div>
            <p style={{ color: 'green' }}>✅ <strong>Conexión exitosa!</strong></p>
            <pre>{JSON.stringify(testResults.connectionTest.data, null, 2)}</pre>
          </div>
        )}
        {testResults.connectionTest?.success === false && (
          <div>
            <p style={{ color: 'red' }}>❌ <strong>Error de conexión</strong></p>
            <p>Status: {testResults.connectionTest.status}</p>
            <p>Error: {testResults.connectionTest.error}</p>
          </div>
        )}
      </div>

      <div style={{ background: '#fff3cd', padding: '15px' }}>
        <h2>📝 Diagnóstico</h2>
        {testResults.viteApiUrl ? (
          <p style={{ color: 'green' }}>✅ Variable VITE_API_URL configurada correctamente</p>
        ) : (
          <p style={{ color: 'orange' }}>⚠️ Variable VITE_API_URL no encontrada, usando fallback</p>
        )}
        
        {testResults.finalApiUrl.includes('localhost') ? (
          <p style={{ color: 'orange' }}>⚠️ Usando localhost, probablemente en desarrollo</p>
        ) : (
          <p style={{ color: 'green' }}>✅ Usando URL de producción</p>
        )}
      </div>
    </div>
  );
};

export default ConfigTest;
