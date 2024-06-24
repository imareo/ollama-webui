type Props = {
  isImageHidden: boolean;
  setIsImageHidden: (isImageHidden: boolean) => void;
  userImages: string[];
};

const ImagePreview = (props: Props) => {
  const { isImageHidden, setIsImageHidden, userImages } = props;
  return (
    <div className='fixed bottom-20 end-8 z-10' hidden={isImageHidden}>
      <img
        className='w-[244px] rounded-lg shadow'
        src={`data:image/png;base64,${userImages[0]}`}
        alt={'user image'}
        onClick={() => setIsImageHidden(true)}
      />
    </div>
  );
};

export default ImagePreview;
