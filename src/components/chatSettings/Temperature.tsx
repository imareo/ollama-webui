import { Options } from '../../lib/types.ts';

type Props = {
  options: Options;
  setOptions: (_options: Options) => void;
};

const Temperature = (props: Props) => {
  const { options, setOptions } = props;
  const handleTemperatureChange = (event: any) => {
    setOptions({ ...options, temperature: event.target.valueAsNumber });
    localStorage.setItem(
      'options',
      JSON.stringify({ ...options, temperature: event.target.valueAsNumber })
    );
  };

  return (
    <div className='mb-2 flex flex-col'>
      <small className='ms-2'>{`temperature: ${options.temperature}`}</small>
      <input
        type='range'
        className='w-50 mx-2'
        min={0}
        max={1}
        step={0.1}
        value={options.temperature}
        onChange={handleTemperatureChange}
      />
    </div>
  );
};

export default Temperature;
