import TextareaAutosize from 'react-textarea-autosize';
import Temperature from '../chatSettings/Temperature.tsx';
import ContextSize from '../chatSettings/ContextSize.tsx';
import SystemMessage from '../chatSettings/SystemMessage.tsx';
import { useContext, useEffect, useState } from 'react';
import {
  ChatRequest,
  HistoryMessage,
  Model,
  Options,
} from '../../lib/types.ts';
import Models from '../chatSettings/Models.tsx';
import { getChatResponse, getModelsAPI } from '../../lib/service.ts';
import {
  INITIAL_OPTIONS,
  INITIAL_SYSTEM_MESSAGE,
} from '../../lib/constants.ts';
import { getShortName } from '../../lib/utils.ts';
import HistoryContext from '../../context/HistoryContext.ts';
import { nanoid } from 'nanoid';
import { useOutsideClick } from '../../lib/hooks.tsx';
import ActionButton from '../ui/ActionButton.tsx';
import SettingsButton from '../ui/SettingsButton.tsx';

let controller: AbortController;

const ChatInput = () => {
  const { history, setHistory } = useContext(HistoryContext);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | undefined>(
    undefined
  );
  const [options, setOptions] = useState<Options>(INITIAL_OPTIONS);
  const [systemMessage, setSystemMessage] = useState<string>(
    INITIAL_SYSTEM_MESSAGE
  );
  const [userMessage, setUserMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

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
      // TODO get models error toast
    }
  };

  const handleInputChange = async (event: any) => {
    setUserMessage(event.target.value);
  };

  const getChatAnswer = async (history: HistoryMessage[]) => {
    setIsLoading(true);
    try {
      controller = new AbortController();

      if (selectedModel) {
        const request: ChatRequest = {
          model: selectedModel.model,
          options,
          history,
          setHistory,
          controller,
        };
        await getChatResponse(request);
      }
    } catch (e) {
      // TODO get chat response error toast
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionButton = async () => {
    if (!isLoading) {
      const systemChatMessage: HistoryMessage = {
        id: nanoid(),
        message: { content: systemMessage, role: 'system' },
        info: '',
      };
      const userChatMessage: HistoryMessage = {
        id: nanoid(),
        message: { content: userMessage, role: 'user' },
        info: '',
      };

      const newHistory: HistoryMessage[] =
        history.length === 0 && systemMessage !== ''
          ? [systemChatMessage, userChatMessage]
          : [...history, userChatMessage];

      setHistory(newHistory);
      setUserMessage('');

      await getChatAnswer(newHistory);
    } else {
      controller.abort();
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
        placeholder={`Ask model ${getShortName(selectedModel?.name)}, temp: ${options?.temperature}, ctx: ${options?.num_ctx}`}
        value={userMessage}
        onChange={(event) => handleInputChange(event)}
      />
      <ActionButton
        loading={isLoading}
        onClick={handleActionButton}
        userMessage={userMessage}
      />
      <SettingsButton onClick={handleSettingButton} />
      <ul
        ref={ref}
        className='fixed bottom-20 end-8 z-10 w-64 rounded-lg bg-gray-50 shadow'
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
        />
      </ul>
    </div>
  );
};
export default ChatInput;
