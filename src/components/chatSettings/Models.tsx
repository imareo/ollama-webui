import { getModelShortName } from '../../lib/utils.ts';
import { Model } from '../../lib/types.ts';

type Props = {
  models: Model[];
  selectedModel?: Model;
  setSelectedModel: (model: Model) => void;
  setUserImages: (images: string[]) => void;
};

const Models = (props: Props) => {
  const { models, selectedModel, setSelectedModel, setUserImages } = props;

  const handleModelChange = (model: Model) => () => {
    setSelectedModel(model);
    if (!model.details.families.includes('clip')) {
      setUserImages([]);
    }
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
            <div className='mx-2 my-1' title={model.details.parameter_size}>
              {getModelShortName(model.name)}
            </div>
            <div className='ml-auto flex flex-row justify-end'>
              {model.details.families.includes('clip') && (
                <div
                  className='my-1 me-1 rounded-full bg-blue-500 px-2 py-0.5 text-sm font-semibold text-white'
                  style={{ fontSize: '0.6em' }}
                >
                  Img
                </div>
              )}

              <div
                className='my-1 me-2 rounded-full bg-gray-600 px-2 py-0.5 text-sm font-semibold text-white'
                style={{ fontSize: '0.6em' }}
              >
                {model.details.quantization_level}
              </div>
            </div>
          </li>
        ))}
    </div>
  );
};

export default Models;
