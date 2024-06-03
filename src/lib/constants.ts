import { Options } from './types.ts';

export const API_URL = 'http://localhost:11434/api';

export const INITIAL_SYSTEM_MESSAGE =
  'you typescript and react developer. ' +
  'first think step-by-step describe your plan. then output the code ' +
  'in a single code block. minimise any other prose.';

export const INITIAL_OPTIONS: Options = {
  temperature: 0.7,
  num_ctx: 2048,
};
