type Props = {
  systemMessage: string;
  setSystemMessage: (_message: string) => void;
};

const SystemMessage = (props: Props) => {
  const { systemMessage, setSystemMessage } = props;
  const handleSystemMessageChange = (event: any) => {
    setSystemMessage(event.target.value);
    localStorage.setItem('systemMessage', JSON.stringify(systemMessage));
  };

  return (
    <div className='mb-2 flex flex-col'>
      <small className='m-2'>system message:</small>
      <textarea
        id='system-message'
        className='w-54 mx-2 resize-none text-sm'
        rows={7}
        value={systemMessage}
        onChange={handleSystemMessageChange}
      />
    </div>
  );
};

export default SystemMessage;