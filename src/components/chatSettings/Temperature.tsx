import { ChatOptions } from '../../lib/types.ts';

type Props = {
  options: ChatOptions;
  setOptions: (_options: ChatOptions) => void;
};

const Temperature = (props: Props) => {
  const { options, setOptions } = props;
  const handleTemperatureChange = (event: any) => {
    const newTemperature = event.target.valueAsNumber;
    setOptions({ ...options, temperature: newTemperature });
    localStorage.setItem(
      'options',
      JSON.stringify({ ...options, temperature: newTemperature })
    );
  };

  return (
    <div className='mb-2 flex flex-col'>
      <small className='ms-2'>{`temperature: ${options.temperature}`}</small>
      <input
        type='range'
        className='w-84 mx-2'
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
