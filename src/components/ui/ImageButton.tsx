import { useContext, useEffect, useState } from 'react';
import ToastContext from '../../context/ToastContext.ts';
import { ERROR_LOADING_IMAGE, VISION_MODELS } from '../../lib/constants.ts';
import { useOutsideClick } from '../../lib/hooks.ts';
import { Model } from '../../lib/types.ts';
import { hasAny, removeBase64Prefix } from '../../lib/utils.ts';
import ImagePreview from './ImagePreview.tsx';

type Props = {
  userImages: string[];
  selectedModel?: Model;
  setUserImages: (images: string[]) => void;
  showImage: boolean;
  setShowImage: (hide: boolean) => void;
};

const ImageButton = (props: Props) => {
  const { userImages, selectedModel, setUserImages, showImage, setShowImage } =
    props;
  const { setAppToast } = useContext(ToastContext);
  const [isHidden, setIsHidden] = useState(true);

  const ref = useOutsideClick<HTMLDivElement>(() => setShowImage(false));

  const handleOutClick = (event: any) => {
    event.stopPropagation();
  };

  const handleFileChange = (event: any) => {
    let file = event.target.files[0];
    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      setAppToast(ERROR_LOADING_IMAGE);
      file = null;
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setUserImages([...userImages, removeBase64Prefix(reader.result)]);
        setShowImage(true);
        // reset for load again same file
        event.target.value = null;
      }
    };
  };

  useEffect(() => {
    const isMultimodal =
      !!selectedModel && hasAny(selectedModel.details.families, VISION_MODELS);
    setIsHidden(!isMultimodal);
  }, [selectedModel]);

  return (
    <div
      ref={ref}
      className='me-1.5 h-11 w-11 rounded-full bg-amber-500 py-2 font-bold shadow hover:bg-amber-700'
      hidden={isHidden}
      onClick={handleOutClick}
    >
      <label
        htmlFor='input-image'
        className='cursor-pointer'
        title='Load image'
        onMouseEnter={() => setShowImage(!!userImages.length)}
      >
        <input
          type='file'
          id='input-image'
          onChange={handleFileChange}
          hidden
          // limited to one image https://github.com/haotian-liu/LLaVA/issues/197
          disabled={userImages.length > 0}
        ></input>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='26'
          height='26'
          viewBox='0 0 22 22'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className={`icon icon-tabler icons-tabler-outline icon-tabler-photo-scan ms-2 ${!!userImages.length ? 'text-green-700' : 'text-white'}`}
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M15 8h.01' />
          <path d='M6 13l2.644 -2.644a1.21 1.21 0 0 1 1.712 0l3.644 3.644' />
          <path d='M13 13l1.644 -1.644a1.21 1.21 0 0 1 1.712 0l1.644 1.644' />
          <path d='M4 8v-2a2 2 0 0 1 2 -2h2' />
          <path d='M4 16v2a2 2 0 0 0 2 2h2' />
          <path d='M16 4h2a2 2 0 0 1 2 2v2' />
          <path d='M16 20h2a2 2 0 0 0 2 -2v-2' />
        </svg>
      </label>
      <ImagePreview
        showImage={showImage}
        setShowImage={setShowImage}
        userImages={userImages}
        setUserImages={setUserImages}
      />
    </div>
  );
};

export default ImageButton;
