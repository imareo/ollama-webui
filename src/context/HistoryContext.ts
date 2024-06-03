import { createContext } from 'react';
import { HistoryMessage } from '../lib/types.ts';

const HistoryContext = createContext({
  history: [] as HistoryMessage[],
  setHistory: (_message: any) => {},
});

export default HistoryContext;
