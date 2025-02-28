import { useContext } from 'react';
import copy from 'copy-to-clipboard';
import { TbCopy, TbSquareRoundedX } from 'react-icons/tb';
import Markdown from 'react-markdown';
import historyContext from '../../context/HistoryContext.ts';
import ToastContext from '../../context/ToastContext.ts';
import {
  ERROR_COPY_TO_CLIPBOARD,
  SUCCESS_COPY_TO_CLIPBOARD,
} from '../../lib/constants.ts';
import { HistoryMessage } from '../../lib/types.ts';

type Props = { message: HistoryMessage };
const AssistantMessage = (props: Props) => {
  const { setAppToast } = useContext(ToastContext);
  const { history, setHistory } = useContext(historyContext);
  const { message } = props;

  const handleCopyMessage = (content: string) => async () => {
    try {
      copy(content);
      setAppToast(SUCCESS_COPY_TO_CLIPBOARD);
    } catch (e: any) {
      setAppToast(ERROR_COPY_TO_CLIPBOARD);
    }
  };

  const handleDeleteMessage = (id: string) => async () => {
    setHistory(history.filter((message) => message.id !== id));
  };

  return (
    <div className='col-span-11 rounded-xl bg-green-50 p-2'>
      <div className='prose max-w-none px-3 pt-3'>
        <Markdown>
          {message.message.content}
        </Markdown>
      </div>
      <div className='flex pt-2 text-end text-slate-500'>
        <div className='grow justify-start self-center pl-1 text-start text-sm'>
          {message.info}
        </div>
        <TbCopy
          className='flextext-secondary fw-light ml-2 text-2xl'
          title='Copy message'
          onClick={handleCopyMessage(message.message.content)}
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

export default AssistantMessage;
