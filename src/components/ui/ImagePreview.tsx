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
  };

  const handleCloseImage = () => {
    setShowImage(false);
  };

  return (
    <div
      className='fixed bottom-20 end-8 z-10 cursor-pointer'
      hidden={!showImage}
    >
      {userImages.length > 0 && (
        <>
          <div
            className='flex select-none justify-end pe-1 text-amber-800'
            onClick={clickDeleteImage}
            title='delete loaded image'
          >
            delete
          </div>
          {userImages.map((image, index) => (
            <img
              key={index}
              className='w-[244px] rounded-lg shadow'
              src={`data:image/png;base64,${image}`}
              alt={'user image'}
              title='close image'
              onClick={handleCloseImage}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ImagePreview;
