import { API_URL } from './constants.ts';
import { ChatRequest, Model } from './types.ts';

export const getChatResponse = async ({
  model,
  messages,
  options,
  setAnswer,
  controller,
}: ChatRequest): Promise<void> => {
  const stream = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    body: JSON.stringify({
      model,
      messages,
      options,
      stream: true,
    }),
    signal: controller.signal,
  });

  const reader = stream.body?.getReader();
  if (reader) {
    let chatResponse = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const decoder = new TextDecoder().decode(value);
      const json = JSON.parse(decoder);
      chatResponse = `${chatResponse}${json.message.content}`;
      setAnswer(chatResponse);
    }
  }
};

export const getModelsAPI = async (): Promise<Model[]> => {
  const response = await fetch(`${API_URL}/tags`);
  const data = await response.json();
  return data.models;
};
