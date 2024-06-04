import TextareaAutosize from 'react-textarea-autosize';
import Temperature from '../chatOptions/Temperature.tsx';
import ContextSize from '../chatOptions/ContextSize.tsx';
import SystemMessage from '../chatOptions/SystemMessage.tsx';
import { useEffect, useState } from 'react';
import { Model, Options } from '../../lib/types.ts';
import Models from '../chatOptions/Models.tsx';
import { getModelsAPI } from '../../lib/service.ts';
import {
  INITIAL_OPTIONS,
  INITIAL_SYSTEM_MESSAGE,
} from '../../lib/constants.ts';
import { getShortName } from '../../lib/utils.ts';

const ChatInput = () => {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | undefined>(
    undefined
  );
  const [options, setOptions] = useState<Options>(INITIAL_OPTIONS);
  const [systemMessage, setSystemMessage] = useState<string>(
    INITIAL_SYSTEM_MESSAGE
  );

  const initSettings = async () => {
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
  };

  const handleSettingButton = async () => {
    setShowSettings(!showSettings);
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
      />
      <button
        className='me-1.5 h-11 rounded-full bg-blue-500 px-4 py-2 font-bold text-white shadow hover:bg-blue-700'
        disabled
      >
        send
      </button>
      <button
        type='button'
        className='h-11 rounded-full bg-gray-500 px-3 py-2 font-bold text-white shadow hover:bg-gray-700'
        data-bs-toggle='dropdown'
        aria-expanded='false'
        title='Model settings'
        onClick={handleSettingButton}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='21'
          height='22'
          fill='currentColor'
          className='bi bi-gear'
          viewBox='0 0 16 16'
        >
          <path d='M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0' />
          <path d='M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z' />
        </svg>
      </button>
      <ul
        className='fixed bottom-20 end-8 z-10 w-64 rounded-lg bg-gray-50 shadow'
        hidden={!showSettings}
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
