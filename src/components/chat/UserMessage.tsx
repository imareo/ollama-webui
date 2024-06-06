import { HistoryMessage } from '../../lib/types.ts';

type Props = {
  message: HistoryMessage;
};
const UserMessage = (props: Props) => {
  const { message } = props;
  return (
    <pre className='prose-sm col-span-11 col-start-2 max-w-none rounded-xl bg-blue-50 p-5'>
      {message.message.content}
    </pre>
  );
};

export default UserMessage;
