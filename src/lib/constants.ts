import { MyToast, Options } from './types.ts';

export const API_URL = 'http://localhost:11434/api';

export const INITIAL_SYSTEM_MESSAGE =
  'you typescript and react developer. ' +
  'first think step-by-step describe your plan. then output the code ' +
  'in a single code block. minimise any other prose.';

export const INITIAL_OPTIONS: Options = {
  temperature: 0.7,
  num_ctx: 2048,
};

export const ERROR_CHAT_RESPONSE = {
  message: 'Failed to get model answer',
  type: 'error',
};

export const ERROR_MODELS_LOADING = {
  message: 'Failed to load models list',
  type: 'error',
};

export const WARNING_STOP_BY_USER: MyToast = {
  message: 'Interrupted by the user',
  type: 'warning',
};

export const ERROR_COPY_TO_CLIPBOARD: MyToast = {
  message: 'Failed to copy to clipboard',
  type: 'error',
};

export const SUCCESS_COPY_TO_CLIPBOARD: MyToast = {
  message: 'Message copied to clipboard',
  type: 'success',
};
