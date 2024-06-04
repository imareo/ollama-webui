export const getShortName = (model?: string) => model?.split(':')[0];

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
