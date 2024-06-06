import { API_URL } from './constants.ts';
import { ChatRequest, Model } from './types.ts';
import { getInfo } from './utils.ts';

export const getChatResponse = async ({
  model,
  options,
  history,
  setHistory,
  controller,
}: ChatRequest): Promise<void> => {
  const messages = history.slice(0, -1);
  const requestMessage = messages.map((message) => message.message);
  let [lastMessage] = history.slice(-1);

  const stream = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    body: JSON.stringify({
      model,
      messages: requestMessage,
      options,
      stream: true,
    }),
    signal: controller.signal,
  });

  let response: any;

  const reader = stream.body?.getReader();
  if (reader) {
    let chatResponse = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const decoder = new TextDecoder().decode(value);
      response = JSON.parse(decoder);
      chatResponse = `${chatResponse}${response.message.content}`;
      lastMessage = {
        ...lastMessage,
        message: {
          content: chatResponse,
          role: lastMessage.message.role,
        },
      };
      setHistory([...messages, lastMessage]);
    }
    // after receive stream done can add info with stats
    setHistory([...messages, { ...lastMessage, info: getInfo(response) }]);
  }
};

export const getModelsAPI = async (): Promise<Model[]> => {
  const response = await fetch(`${API_URL}/tags`);
  const data = await response.json();
  return data.models;
};
