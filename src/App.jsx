import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import AlertsPage from './components/alerts/AlertsPage';
import LogsPage from './components/logs/LogsPage';
import FilesPage from './components/files/FilesPage';
import SettingsPage from './components/settings/SettingsPage';
import './App.css';

// Componente de placeholder para monitoramento
const Monitoring = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900">Monitoramento em Tempo Real</h1>
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <p className="text-gray-500">Seção de monitoramento será implementada</p>
    </div>
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'alerts':
        return <AlertsPage />;
      case 'logs':
        return <LogsPage />;
      case 'files':
        return <FilesPage />;
      case 'monitoring':
        return <Monitoring />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;

