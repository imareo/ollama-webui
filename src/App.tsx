import './App.css';
import ChatInput from './components/chat/ChatInput.tsx';
import ChatHistory from './components/chat/ChatHistory.tsx';
import HistoryContext from './context/HistoryContext.ts';
import { useState } from 'react';

function App() {
  const [history, setHistory] = useState([]);

  return (
    <HistoryContext.Provider value={{ history, setHistory }}>
      <ChatHistory />
      <ChatInput />
    </HistoryContext.Provider>
  );
}

export default App;
