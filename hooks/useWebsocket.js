import { useEffect, useState, useRef, useCallback } from 'react';
import pako from 'pako';

const useWebSocket = (url, retryInterval = 10000) => {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);
  const retryTimeout = useRef(null);

  const connectWebSocket = useCallback(() => {
    console.log(`Attempting to connect to WebSocket at ${url}`);
    const websocket = new WebSocket(url);
    websocket.binaryType = 'arraybuffer';  // Set binary type to handle binary data

    websocket.onopen = () => {
      console.log('WebSocket connection opened');
      setIsConnected(true);
      if (retryTimeout.current) {
        clearTimeout(retryTimeout.current);
        retryTimeout.current = null;
      }
    };

    websocket.onmessage = (event) => {
      console.log('Message received from server:', event.data);
      try {
        // Decompress the received message using pako library
        const inflatedData = pako.inflate(new Uint8Array(event.data), { to: 'string' });
        console.log('Decompressed data:', JSON.parse(inflatedData));
        setMessages(JSON.parse(inflatedData));
      } catch (e) {
        console.error('Failed to decompress message data:', e);
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    websocket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
      setIsConnected(false);
      retryConnection();
    };

    setWs(websocket);
    wsRef.current = websocket;
  }, [url]);

  const retryConnection = useCallback(() => {
    if (!retryTimeout.current) {
      retryTimeout.current = setTimeout(() => {
        console.log('Retrying WebSocket connection...');
        connectWebSocket();
      }, retryInterval);
    }
  }, [connectWebSocket, retryInterval]);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (retryTimeout.current) {
        clearTimeout(retryTimeout.current);
      }
    };
  }, [connectWebSocket]);

  const sendMessage = (message) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      console.log('Sending message:', message);
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open. ReadyState:', wsRef.current.readyState);
    }
  };

  const manualConnect = () => {
    if (!isConnected) {
      connectWebSocket();
    }
  };

  return {
    messages,
    sendMessage,
    isConnected,
    manualConnect,
  };
};

export default useWebSocket;
