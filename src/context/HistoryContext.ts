import { createContext } from 'react';
import { HistoryMessage } from '../lib/types.ts';

const HistoryContext = createContext({
  history: [] as HistoryMessage[],
  setHistory: (_messages: HistoryMessage[]) => {},
});

export default HistoryContext;
