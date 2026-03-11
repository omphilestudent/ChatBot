const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

type ChatResponse = {
  response: string;
};

export const sendChatMessage = async (message: string): Promise<string> => {
  const response = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  let data: ChatResponse;
  try {
    data = (await response.json()) as ChatResponse;
  } catch {
    throw new Error('Invalid JSON response from backend.');
  }

  if (!response.ok) {
    throw new Error(data.response || 'Backend request failed.');
  }

  return data.response;
};

export const getApiBaseUrl = (): string => API_URL;
