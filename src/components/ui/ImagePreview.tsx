type Props = {
  showImage: boolean;
  setShowImage: (show: boolean) => void;
  userImages: string[];
  setUserImages: (images: string[]) => void;
};

const ImagePreview = (props: Props) => {
  const { showImage, setShowImage, userImages, setUserImages } = props;

  const clickDeleteImage = () => {
    setUserImages([]);
    setShowImage(false);
  };

  return (
    <div className='fixed bottom-20 end-8 z-10' hidden={!showImage}>
      <div
        className='flex cursor-pointer select-none justify-end pe-1 text-amber-800'
        onClick={clickDeleteImage}
        title='delete loaded image'
      >
        delete
      </div>
      <img
        className='w-[244px] rounded-lg shadow'
        src={`data:image/png;base64,${userImages[0]}`}
        alt='user image'
      />
    </div>
  );
};

export default ImagePreview;
