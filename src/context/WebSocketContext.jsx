import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const WebSocketContext = createContext(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children, url }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketConnection = io(url, {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    setSocket(socketConnection);

    socketConnection.on('connect', () => {
      console.log('WebSocket connected');
    });

    socketConnection.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};