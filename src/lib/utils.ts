import { INITIAL_OPTIONS, INITIAL_SYSTEM_MESSAGE } from './constants.ts';

export const getShortName = (model?: string) => model?.split(':')[0];

export const initLocalStorage = () => {
  if (!localStorage.getItem('options')) {
    localStorage.setItem('options', JSON.stringify(INITIAL_OPTIONS));
  }
  if (!localStorage.getItem('systemPrompt')) {
    localStorage.setItem(
      'systemPrompt',
      JSON.stringify(INITIAL_SYSTEM_MESSAGE)
    );
  }
};

export const getInfo = (part: any) => {
  const tokenRate = (
    (part.eval_count * 1000000000) /
    part.eval_duration
  ).toFixed(2);

  const contextLength = part.eval_count;
  const userContextLength = part.prompt_eval_count;
  const usedModel = getShortName(part.model);

  return `model: ${usedModel}; user ctx: ${userContextLength}; ctx: ${contextLength}; rate: ${tokenRate}t/s`;
};
