import { ChatResponse, HistoryMessage } from './types.ts';
import { nanoid } from 'nanoid';
import { getVramPercent } from './service.ts';

export const getShortName = (model?: string) => model?.split(':')[0];

export const getInfo = async (response: ChatResponse) => {
  const tokenRate = (
    (response.eval_count * 1000000000) /
    response.eval_duration
  ).toFixed(2);

  const contextLength = response.eval_count;
  const userContextLength = response.prompt_eval_count;
  const usedModel = getShortName(response.model);
  const vramPercent = await getVramPercent();

  return `model: ${usedModel}; user ctx: ${userContextLength}; ctx: ${contextLength}; rate: ${tokenRate}t/s; vram: ${vramPercent}%`;
};

export const updateHistory = (
  history: HistoryMessage[],
  systemMessage: string,
  userMessage: string
) => {
  const systemChatMessage: HistoryMessage = {
    id: nanoid(),
    message: { content: systemMessage, role: 'system' },
    info: '',
  };
  const userChatMessage: HistoryMessage = {
    id: nanoid(),
    message: { content: userMessage, role: 'user' },
    info: '',
  };

  const updatedHistory: HistoryMessage[] =
    history.length === 0 && systemMessage !== ''
      ? [systemChatMessage, userChatMessage]
      : [...history, userChatMessage];

  return updatedHistory;
};
