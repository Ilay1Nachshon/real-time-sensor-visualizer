import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface WebSocketMessage {
  x: number;
  y: number;
  z: number;
  timestamp: number;
}

export const useWebSocket = (url: string) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);

  const connect = useCallback(() => {
    try {
      const websocket = new WebSocket(url);
      
      websocket.onopen = () => {
        setIsConnected(true);
        toast.success('Connected to sensor');
      };

      websocket.onclose = () => {
        setIsConnected(false);
        toast.error('Disconnected from sensor');
        // Attempt to reconnect after 5 seconds
        setTimeout(connect, 5000);
      };

      websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
        toast.error('Connection error');
      };

      websocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setLastMessage({
            x: data.x || 0,
            y: data.y || 0,
            z: data.z || 0,
            timestamp: Date.now()
          });
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      setWs(websocket);
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect');
    }
  }, [url]);

  useEffect(() => {
    connect();
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [connect]);

  const disconnect = useCallback(() => {
    if (ws) {
      ws.close();
      setWs(null);
      setIsConnected(false);
    }
  }, [ws]);

  return {
    isConnected,
    lastMessage,
    connect,
    disconnect
  };
};