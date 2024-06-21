import TextareaAutosize from 'react-textarea-autosize';
import Temperature from '../chatSettings/Temperature.tsx';
import ContextSize from '../chatSettings/ContextSize.tsx';
import SystemMessage from '../chatSettings/SystemMessage.tsx';
import { useContext, useEffect, useState } from 'react';
import {
  ChatOptions,
  ChatRequest,
  HistoryMessage,
  Model,
} from '../../lib/types.ts';
import Models from '../chatSettings/Models.tsx';
import {
  getAbortController,
  getChatApi,
  getModelsAPI,
  resetAbortController,
} from '../../lib/service.ts';
import {
  ERROR_CHAT_RESPONSE,
  ERROR_MODELS_LOADING,
  INITIAL_OPTIONS,
  INITIAL_SYSTEM_MESSAGE,
  WARNING_STOP_BY_USER,
} from '../../lib/constants.ts';
import { getModelShortName, updateHistory } from '../../lib/utils.ts';
import HistoryContext from '../../context/HistoryContext.ts';
import { useOutsideClick } from '../../lib/hooks.ts';
import ActionButton from '../ui/ActionButton.tsx';
import SettingsButton from '../ui/SettingsButton.tsx';
import ToastContext from '../../context/ToastContext.ts';
import ImageButton from '../ui/ImageButton.tsx';

type Props = {
  models: Model[];
  setModels: (models: Model[]) => void;
  selectedModel?: Model;
  setSelectedModel: (model: Model) => void;
  options: ChatOptions;
  setOptions: (options: ChatOptions) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

const ChatInput = (props: Props) => {
  const {
    models,
    setModels,
    selectedModel,
    setSelectedModel,
    options,
    setOptions,
    isLoading,
    setIsLoading,
  } = props;
  const { setAppToast } = useContext(ToastContext);
  const { history, setHistory } = useContext(HistoryContext);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [systemMessage, setSystemMessage] = useState<string>(
    INITIAL_SYSTEM_MESSAGE
  );
  const [userMessage, setUserMessage] = useState<string>('');
  const [userImages, setUserImages] = useState<string[]>([]);

  const initSettings = async () => {
    try {
      const modelList = await getModelsAPI();
      setModels(modelList);
      setSelectedModel(modelList[0]);

      const storedOptions = localStorage.getItem('options');
      if (storedOptions) {
        setOptions(JSON.parse(storedOptions));
      } else {
        localStorage.setItem('options', JSON.stringify(INITIAL_OPTIONS));
        setOptions(INITIAL_OPTIONS);
      }

      const storedSystemMessage = localStorage.getItem('systemMessage');
      if (storedSystemMessage) {
        setSystemMessage(JSON.parse(storedSystemMessage));
      } else {
        localStorage.setItem(
          'systemMessage',
          JSON.stringify(INITIAL_SYSTEM_MESSAGE)
        );
        setSystemMessage(INITIAL_SYSTEM_MESSAGE);
      }
    } catch (e) {
      setAppToast(ERROR_MODELS_LOADING);
    }
  };

  const handleInputChange = async (event: any) => {
    setUserMessage(event.target.value);
  };

  const getChatAnswer = async (history: HistoryMessage[]) => {
    setIsLoading(true);
    try {
      if (selectedModel) {
        const request: ChatRequest = {
          model: selectedModel.model,
          options,
          history,
          setHistory,
          controller: getAbortController(),
        };
        await getChatApi(request);
      }
    } catch (e: any) {
      if (e.name !== 'AbortError') {
        setAppToast(ERROR_CHAT_RESPONSE);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionButton = async () => {
    if (!isLoading) {
      const updatedHistory = updateHistory(
        history,
        systemMessage,
        userMessage,
        userImages
      );

      setHistory(updatedHistory);
      setUserMessage('');
      setUserImages([]);

      await getChatAnswer(updatedHistory);
    } else {
      resetAbortController();
      setAppToast(WARNING_STOP_BY_USER);
    }
  };

  const handleSettingButton = async () => {
    setShowSettings(!showSettings);
  };

  const ref = useOutsideClick<HTMLUListElement>(() => setShowSettings(false));

  const handleOutClick = (event: any) => {
    event.stopPropagation();
  };

  useEffect(() => {
    void initSettings();
  }, []);

  return (
    <div className='fixed bottom-6 flex w-full flex-row items-end justify-between pe-16'>
      <TextareaAutosize
        id='input-area'
        className='me-1.5 flex-auto resize-none rounded-3xl border-2 px-4 py-2'
        maxRows={10}
        placeholder={`Ask model ${getModelShortName(selectedModel?.name)}, temp: ${options?.temperature}, ctx: ${options?.num_ctx}`}
        value={userMessage}
        onChange={(event) => handleInputChange(event)}
      />
      <ActionButton
        loading={isLoading}
        onClick={handleActionButton}
        userMessage={userMessage}
      />
      <ImageButton
        userImages={userImages}
        setUserImages={setUserImages}
        selectedModel={selectedModel}
      />
      <SettingsButton onClick={handleSettingButton} />
      <ul
        ref={ref}
        className='fixed bottom-20 end-8 z-10 w-[350px] rounded-lg bg-gray-50 shadow'
        hidden={!showSettings}
        onClick={handleOutClick}
      >
        <SystemMessage
          systemMessage={systemMessage}
          setSystemMessage={setSystemMessage}
        />
        <Temperature options={options} setOptions={setOptions} />
        <ContextSize options={options} setOptions={setOptions} />
        <Models
          models={models}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          setUserImages={setUserImages}
        />
      </ul>
    </div>
  );
};
export default ChatInput;
