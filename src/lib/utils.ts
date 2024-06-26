import { nanoid } from 'nanoid';
import { getVramPercentAPI } from './service.ts';
import { ChatResponse, HistoryMessage } from './types.ts';

export const getModelShortName = (model?: string) => model?.split(':')[0];

export const getResponseInfo = async (response: ChatResponse) => {
  const tokenRate = (
    (response.eval_count * 1000000000) /
    response.eval_duration
  ).toFixed(2);

  const contextLength = response.eval_count;
  const userContextLength = response.prompt_eval_count;
  const usedModel = getModelShortName(response.model);
  const vramPercent = await getVramPercentAPI();

  return `model: ${usedModel}; user ctx: ${userContextLength}; ctx: ${contextLength}; rate: ${tokenRate}t/s; vram: ${vramPercent}%`;
};

export const removeBase64Prefix = (base64String: string): string => {
  return base64String.replace(/^data:image\/[a-z]+;base64,/, '');
};

export const updateHistory = (
  history: HistoryMessage[],
  systemMessage: string,
  userMessage: string,
  userImages: string[]
) => {
  const systemChatMessage: HistoryMessage = {
    id: nanoid(),
    message: { content: systemMessage, role: 'system' },
    info: '',
  };
  const userChatMessage: HistoryMessage = {
    id: nanoid(),
    message: { content: userMessage, images: userImages, role: 'user' },
    info: '',
  };

  const updatedHistory: HistoryMessage[] =
    history.length === 0 && systemMessage !== ''
      ? [systemChatMessage, userChatMessage]
      : [...history, userChatMessage];

  return updatedHistory;
};
