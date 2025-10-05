import { useState, useEffect } from 'react';

// Hook para simular dados em tempo real
export const useRealTimeData = (initialData, updateInterval = 5000) => {
  const [data, setData] = useState(initialData);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      // Simular pequenas mudanças nos dados
      setData(prevData => {
        if (Array.isArray(prevData)) {
          return prevData.map(item => ({
            ...item,
            // Adicionar pequenas variações aleatórias
            value: typeof item.value === 'number' 
              ? Math.max(0, item.value + (Math.random() - 0.5) * 10)
              : item.value
          }));
        }
        return prevData;
      });
      setLastUpdate(new Date());
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval]);

  return { data, lastUpdate };
};

// Hook para notificações
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now();
    const newNotification = { ...notification, id };
    setNotifications(prev => [...prev, newNotification]);

    // Auto-remover após 5 segundos
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return { notifications, addNotification, removeNotification };
};

// Hook para WebSocket simulado
export const useWebSocket = (url) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    // Simular conexão WebSocket
    setIsConnected(true);
    
    // Simular mensagens periódicas
    const interval = setInterval(() => {
      const mockMessage = {
        type: 'alert',
        data: {
          id: Date.now(),
          severity: ['low', 'medium', 'critical'][Math.floor(Math.random() * 3)],
          message: 'Nova ameaça detectada',
          timestamp: new Date().toISOString()
        }
      };
      setLastMessage(mockMessage);
    }, 10000);

    return () => {
      clearInterval(interval);
      setIsConnected(false);
    };
  }, [url]);

  return { isConnected, lastMessage };
};

