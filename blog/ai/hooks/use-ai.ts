import { useState } from 'react';

export default function useAI() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  return {
    messages,
    setMessages,
    loading,
    setLoading,
  };
}
