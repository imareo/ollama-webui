import { HistoryMessage } from '../../lib/types.ts';
import Markdown from 'react-markdown';
import { TiDeleteOutline } from 'react-icons/ti';
import { TbCopy } from 'react-icons/tb';
import { useContext } from 'react';
import historyContext from '../../context/HistoryContext.ts';

type Props = { message: HistoryMessage };
const AssistantMessage = (props: Props) => {
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

  return (
    <div className='col-span-11 rounded-xl bg-green-50 p-2'>
      <Markdown className='prose max-w-none px-3 pt-3'>
        {message.message.content}
      </Markdown>
      <div className='flex pt-2 text-end text-slate-500'>
        <div className='grow justify-start self-center pl-1 text-start text-sm'>
          {message.info}
        </div>
        <TbCopy
          className='flextext-secondary fw-light ml-2 text-2xl'
          title='Copy message'
          onClick={handleCopyMessage(message.message.content)}
        />
        <TiDeleteOutline
          className='text-secondary fw-light justify-end text-2xl'
          title='Delete message'
          onClick={handleDeleteMessage(message.id)}
        />
      </div>
    </div>
  );
};

export default AssistantMessage;
