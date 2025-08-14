import { useEffect, useRef, useState } from 'react';
import { WS_URL } from '../constants/authConstant';

export const useWebSocket = () => {
  const ws = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages(prev => [...prev, data]);
    };

    return () => ws.current.close();
  }, []);

  return { messages };
};
