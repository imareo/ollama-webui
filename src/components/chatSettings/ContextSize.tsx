import { ChatOptions } from '../../lib/types.ts';

type Props = {
  options: ChatOptions;
  setOptions: (_options: ChatOptions) => void;
};

const ContextSize = (props: Props) => {
  const { options, setOptions } = props;
  const handleContextChange = async (event: any) => {
    const newContext = event.target.valueAsNumber;
    setOptions({ ...options, num_ctx: newContext });
    localStorage.setItem(
      'options',
      JSON.stringify({ ...options, num_ctx: newContext })
    );
  };

  return (
    <div className='mb-2 flex flex-col'>
      <small className='ms-2'>{`context: ${options.num_ctx}`}</small>
      <input
        type='range'
        className='w-54 mx-2'
        min={2048}
        max={32768}
        step={2048}
        value={options.num_ctx}
        onChange={handleContextChange}
      />
    </div>
  );
};

export default ContextSize;
