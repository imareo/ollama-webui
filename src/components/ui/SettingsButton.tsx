import { useOutsideClick } from '../../lib/hooks.ts';
import { ChatOptions, Model } from '../../lib/types.ts';
import ContextSize from '../chatSettings/ContextSize.tsx';
import Models from '../chatSettings/Models.tsx';
import SystemMessage from '../chatSettings/SystemMessage.tsx';
import Temperature from '../chatSettings/Temperature.tsx';

type Props = {
  showSettings: boolean;
  setShowSettings: (showSettings: boolean) => void;
  systemMessage: string;
  setSystemMessage: (message: string) => void;
  options: ChatOptions;
  setOptions: (options: ChatOptions) => void;
  models: Model[];
  selectedModel?: Model;
  setSelectedModel: (model: Model) => void;
  setUserImages: (images: string[]) => void;
  onClick: () => Promise<void>;
};

const SettingsButton = (props: Props) => {
  const {
    showSettings,
    setShowSettings,
    systemMessage,
    setSystemMessage,
    options,
    setOptions,
    models,
    selectedModel,
    setSelectedModel,
    setUserImages,
    onClick,
  } = props;

  const ref = useOutsideClick<HTMLDivElement>(() => setShowSettings(false));

  const handleOutClick = (event: any) => {
    event.stopPropagation();
  };

  return (
    <div>
      <button
        type='button'
        className='h-11 w-11 rounded-full bg-gray-500 px-3 py-2 font-bold text-white shadow hover:bg-gray-700'
        data-bs-toggle='dropdown'
        aria-expanded='false'
        title='Model settings'
        onClick={onClick}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='27'
          height='26'
          fill='currentColor'
          className='bi bi-gear -ms-0.5'
          viewBox='0 0 18 16'
        >
          <path d='M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0' />
          <path d='M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z' />
        </svg>
      </button>
      <div
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
      </div>
    </div>
  );
};

export default SettingsButton;
