import { HistoryMessage } from '../../lib/types.ts';
import Markdown from 'react-markdown';

type Props = { message: HistoryMessage };
const AssistantMessage = (props: Props) => {
  const { message } = props;
  return (
    <div className='col-span-11 rounded-xl bg-green-50 p-5'>
      <Markdown className='prose max-w-none'>
        {message.message.content}
      </Markdown>
      <div className='text-end text-xs'>{message.info}</div>
    </div>
  );
};

export default AssistantMessage;
