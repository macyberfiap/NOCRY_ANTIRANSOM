import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import NotificationContainer from '../ui/NotificationContainer';
import { useNotifications, useWebSocket } from '../../hooks/useRealTime';
import { cn } from '../../utils/helpers';

const Layout = ({ children, activeTab, onTabChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { notifications, addNotification, removeNotification } = useNotifications();
  const { isConnected, lastMessage } = useWebSocket('ws://localhost:8080');

  // Simular notificações baseadas em WebSocket
  React.useEffect(() => {
    if (lastMessage && lastMessage.type === 'alert') {
      addNotification({
        type: lastMessage.data.severity === 'critical' ? 'error' : 'warning',
        title: 'Nova Ameaça Detectada',
        message: lastMessage.data.message
      });
    }
  }, [lastMessage, addNotification]);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        onMenuToggle={handleMenuToggle}
        notifications={notifications.length}
        isConnected={isConnected}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={handleSidebarClose}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />

        {/* Main Content */}
        <main className={cn(
          "flex-1 min-h-[calc(100vh-4rem)] transition-all duration-300",
          "lg:ml-0 custom-scrollbar" // Sidebar é fixa no desktop
        )}>
          <div className="p-4 lg:p-6 animate-fade-in">
            {children}
          </div>
        </main>
      </div>

      {/* Notificações */}
      <NotificationContainer 
        notifications={notifications}
        onRemove={removeNotification}
      />
    </div>
  );
};

export default Layout;

