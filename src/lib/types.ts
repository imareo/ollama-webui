export type ChatMessage = {
  content: string;
  images?: string[];
  role: 'user' | 'assistant' | 'system';
};

export type HistoryMessage = {
  id: string;
  message: ChatMessage;
  info: string;
};

export type Options = {
  temperature: number;
  num_ctx: number;
};

export type ChatRequest = {
  model: string;
  options: Options;
  history: HistoryMessage[];
  setHistory: (history: HistoryMessage[]) => void;
  controller: AbortController;
};

export type Model = {
  name: string;
  model: string;
  details: {
    parameter_size: string;
    quantization_level: string;
  };
};

export type ChatResponse = {
  model: string;
  created_at: string;
  message: ChatMessage;
  done: boolean;
  done_reason: string;
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
};

export type MyToast = {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
};
