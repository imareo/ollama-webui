import { HistoryMessage } from '../../lib/types.ts';
import { TbCopy, TbReload } from 'react-icons/tb';
import { TiDeleteOutline } from 'react-icons/ti';

type Props = {
  message: HistoryMessage;
};

const UserMessage = (props: Props) => {
  const { message } = props;

  const handleCopyMessage = (content: string) => async () => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (error) {}
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
          // onClick={handleReloadChat(message.id, message.content)}
        />
        <TiDeleteOutline
          className='text-secondary fw-light justify-end text-2xl'
          title='Delete message'
          // onClick={handleDeleteMessage(message.id)}
        />
      </div>
    </div>
  );
};

export default UserMessage;
