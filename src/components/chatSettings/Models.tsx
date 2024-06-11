import { getShortName } from '../../lib/utils.ts';
import { Model } from '../../lib/types.ts';

type Props = {
  models: Model[];
  selectedModel?: Model;
  setSelectedModel: (model: Model) => void;
};

const Models = (props: Props) => {
  const { models, selectedModel, setSelectedModel } = props;

  const handleModelChange = (model: Model) => () => {
    setSelectedModel(model);
  };

  return (
    <div className='mb-2 flex flex-col'>
      <small className='ms-2'>models:</small>
      {models &&
        models.map((model: Model, index: number) => (
          <li
            className={`flex flex-row ${model.model === selectedModel?.model ? 'bg-blue-200' : ''}`}
            key={index}
            onClick={handleModelChange(model)}
          >
            <div className='mx-2 my-1'>{getShortName(model.name)}</div>
            <div
              className='my-1 me-2 ml-auto rounded-full bg-gray-600 px-2 py-0.5 text-sm font-semibold text-white'
              style={{ fontSize: '0.6em' }}
            >
              {model.details.quantization_level}
            </div>
          </li>
        ))}
    </div>
  );
};

export default Models;
