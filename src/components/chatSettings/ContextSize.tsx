import { Options } from '../../lib/types.ts';

type Props = {
  options: Options;
  setOptions: (_options: Options) => void;
};

const ContextSize = (props: Props) => {
  const { options, setOptions } = props;
  const handleContextChange = async (event: any) => {
    setOptions({ ...options, num_ctx: event.target.valueAsNumber });
    localStorage.setItem(
      'options',
      JSON.stringify({ ...options, num_ctx: event.target.valueAsNumber })
    );
  };

  return (
    <div className='mb-2 flex flex-col'>
      <small className='ms-2'>{`context: ${options.num_ctx}`}</small>
      <input
        type='range'
        className='w-54 mx-2'
        min={2048}
        max={8192}
        step={1024}
        value={options.num_ctx}
        onChange={handleContextChange}
      />
    </div>
  );
};

export default ContextSize;
