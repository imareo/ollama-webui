import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import ChatInput from './components/chat/ChatInput.tsx';
import ChatHistory from './components/chat/ChatHistory.tsx';
import HistoryContext from './context/HistoryContext.ts';
import { useState } from 'react';
import { HistoryMessage, Model, MyToast, Options } from './lib/types.ts';
import { INITIAL_OPTIONS } from './lib/constants.ts';
import ToastContext from './context/ToastContext.ts';
import Toast from './components/ui/Toast.tsx';

function App() {
  const [appToast, setAppToast] = useState<MyToast>({
    message: '',
    type: 'info',
  });
  const [history, setHistory] = useState<HistoryMessage[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | undefined>(
    undefined
  );
  const [options, setOptions] = useState<Options>(INITIAL_OPTIONS);
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
