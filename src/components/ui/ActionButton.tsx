import { useHotkeys } from 'react-hotkeys-hook';

type Props = {
  loading: boolean;
  onClick: () => Promise<void>;
  userMessage: string;
};

const ActionButton = (props: Props) => {
  const { loading, onClick, userMessage } = props;

  const disabled = userMessage.length === 0 && !loading;

  useHotkeys(
    'ctrl+enter',
    () => !disabled && onClick(),
    { enableOnFormTags: ['textarea'] },
  );

  return (
    <button
      className={`me-1.5 h-11 w-16 cursor-pointer rounded-full py-2 font-bold text-white shadow ${!props.loading ? 'bg-blue-500 hover:bg-blue-700' : 'bg-red-500 hover:bg-red-700'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {!loading ? 'Send' : 'Stop'}
    </button>
  );
};

export default ActionButton;
