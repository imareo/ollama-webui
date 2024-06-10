import { HistoryMessage } from '../../lib/types.ts';
import { TbCopy, TbReload, TbSquareRoundedX } from 'react-icons/tb';
import { useContext } from 'react';
import historyContext from '../../context/HistoryContext.ts';

type Props = {
  message: HistoryMessage;
};

const UserMessage = (props: Props) => {
  const { message } = props;
  const { history, setHistory } = useContext(historyContext);

  const handleCopyMessage = (content: string) => async () => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (error) {}
  };

  const handleDeleteMessage = (id: string) => async () => {
    setHistory(history.filter((message) => message.id !== id));
  };

  const handleReloadChat = (id: string) => async () => {
    const indexLastMessage = history.findIndex((message) => message.id === id);
    if (indexLastMessage > 0) {
      setHistory(history.slice(0, indexLastMessage));
    }
  };

  return (
    <div className='col-span-11 col-start-2 max-w-none rounded-xl bg-blue-50 p-2'>
      <pre className='prose-sm px-3 pt-3'>{message.message.content}</pre>
      <div className='flex pt-2 text-end text-xs text-slate-500'>
        <div className='grow justify-start self-center pl-1 text-start'>
          {message.info}
        </div>
        <TbCopy
          className='flextext-secondary fw-light ml-2 text-2xl'
          title='Copy message'
          onClick={handleCopyMessage(message.message.content)}
        />
        <TbReload
          className='text-secondary fw-light text-2xl'
          title='Clear below and ask again from here'
          onClick={handleReloadChat(message.id)}
        />
        <TbSquareRoundedX
          className='text-secondary fw-light justify-end text-2xl'
          title='Delete message'
          onClick={handleDeleteMessage(message.id)}
        />
      </div>
    </div>
  );
};

export default UserMessage;
