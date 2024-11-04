import { VISION_MODELS } from '../../lib/constants.ts';
import { Model } from '../../lib/types.ts';
import { getModelShortName, hasAny } from '../../lib/utils.ts';

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
    if (!hasAny(model.details.families, VISION_MODELS)) {
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
            <div className='mx-2 my-1'>{getModelShortName(model.name)}</div>
            <div className='ml-auto flex flex-row justify-end'>
              {hasAny(model.details.families, VISION_MODELS) && (
                <div
                  className='my-1 me-1 rounded-full bg-blue-500 px-2 py-0.5 text-sm font-semibold text-white'
                  style={{ fontSize: '0.6em' }}
                  title='multimodal model'
                >
                  Vision
                </div>
              )}
              <div
                className='bg--600 my-1 me-1 rounded-full bg-pink-800 px-2 py-0.5 text-sm font-semibold text-white'
                style={{ fontSize: '0.6em' }}
                title='parameter size'
              >
                {model.details.parameter_size}
              </div>
              <div
                className='my-1 me-2 rounded-full bg-gray-600 px-2 py-0.5 text-sm font-semibold text-white'
                style={{ fontSize: '0.6em' }}
                title='quantization level'
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
