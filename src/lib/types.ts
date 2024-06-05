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
