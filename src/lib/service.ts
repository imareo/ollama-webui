import { nanoid } from 'nanoid';
import { API_URL } from './constants.ts';
import { ChatRequest, ChatResponse, HistoryMessage, Model } from './types.ts';
import { getResponseInfo } from './utils.ts';

let abortController = new AbortController();
export const getAbortController = () => abortController;
export const resetAbortController = (): void => {
  abortController.abort();
  abortController = new AbortController();
};

export const getChatApi = async ({
  model,
  options,
  history,
  setHistory,
  controller,
}: ChatRequest): Promise<void> => {
  const messages = history.map((message) => message.message);

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

  let lastMessage: HistoryMessage = {
    id: nanoid(),
    message: { content: '', role: 'assistant' },
    info: '',
  };

  let response: ChatResponse | undefined;

  const reader = stream.body?.getReader();
  if (reader) {
    let chatResponse = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const decoder = new TextDecoder().decode(value);
      response = JSON.parse(decoder);
      chatResponse = `${chatResponse}${response?.message.content}`;
      lastMessage = {
        ...lastMessage,
        message: {
          content: chatResponse,
          role: lastMessage.message.role,
        },
      };
      setHistory([...history, lastMessage]);
    }
    // after receive stream done can add info with stats
    setHistory([
      ...history,
      { ...lastMessage, info: await getResponseInfo(response as ChatResponse) },
    ]);
  }
};

export const getModelsAPI = async (): Promise<Model[]> => {
  const response = await fetch(`${API_URL}/tags`);
  const data: { models: Array<Model> } = await response.json();

  data.models.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    if (a.details.parameter_size < b.details.parameter_size) return -1;
    if (a.details.parameter_size > b.details.parameter_size) return 1;
    return 0;
  });

  return data.models;
};

export const getVramPercentAPI = async (): Promise<number> => {
  const response = await fetch(`${API_URL}/ps`);
  const data = await response.json();
  const model = data.models[0];
  return Math.round((model.size_vram * 100) / model.size);
};
