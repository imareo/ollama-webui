import './App.css';
import ChatInput from './components/chat/ChatInput.tsx';
import ChatHistory from './components/chat/ChatHistory.tsx';
import HistoryContext from './context/HistoryContext.ts';
import { useState } from 'react';
import { HistoryMessage, Model, Options } from './lib/types.ts';
import { INITIAL_OPTIONS } from './lib/constants.ts';

function App() {
  const [history, setHistory] = useState<HistoryMessage[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | undefined>(
    undefined
  );
  const [options, setOptions] = useState<Options>(INITIAL_OPTIONS);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <HistoryContext.Provider value={{ history, setHistory }}>
      <ChatHistory
        selectedModel={selectedModel}
        options={options}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <ChatInput
        models={models}
        setModels={setModels}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        options={options}
        setOptions={setOptions}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </HistoryContext.Provider>
  );
}

export default App;
