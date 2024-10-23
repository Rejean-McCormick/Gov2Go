import { useEffect, useState } from 'react';

const useSocket = (url, eventHandlers) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  const connectSocket = () => {
    const ws = new WebSocket(url);
    
    ws.onopen = () => {
      setConnected(true);
      console.log('WebSocket connected');
    };
    
    ws.onclose = () => {
      setConnected(false);
      console.log('WebSocket disconnected');
    };
    
    // Subscribe to provided event handlers
    Object.keys(eventHandlers).forEach(event => {
      ws.addEventListener(event, eventHandlers[event]);
    });
    
    setSocket(ws);
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.close();
    }
  };

  const subscribeToEvents = (eventHandlers) => {
    if (socket) {
      Object.keys(eventHandlers).forEach(event => {
        socket.addEventListener(event, eventHandlers[event]);
      });
    }
  };

  useEffect(() => {
    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, [url]);

  return { socket, connected, subscribeToEvents };
};

export default useSocket;
 
