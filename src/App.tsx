import { useState } from 'react';
import ChatHistory from './components/chat/ChatHistory.tsx';
import ChatInput from './components/chat/ChatInput.tsx';
import Toast from './components/ui/Toast.tsx';
import HistoryContext from './context/HistoryContext.ts';
import ToastContext from './context/ToastContext.ts';
import { EMPTY_TOAST, INITIAL_OPTIONS } from './lib/constants.ts';
import { ChatOptions, HistoryMessage, Model, MyToast } from './lib/types.ts';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [appToast, setAppToast] = useState<MyToast>(EMPTY_TOAST);
  const [history, setHistory] = useState<HistoryMessage[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | undefined>(
    undefined
  );
  const [options, setOptions] = useState<ChatOptions>(INITIAL_OPTIONS);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ToastContext.Provider value={{ appToast, setAppToast }}>
      <HistoryContext.Provider value={{ history, setHistory }}>
        <Toast />
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
    </ToastContext.Provider>
  );
}

export default App;
