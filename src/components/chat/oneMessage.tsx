import { HistoryMessage } from '../../lib/types.ts';

type Props = {
  message: HistoryMessage;
};

const OneMessage = (props: Props) => {
  const { message } = props;
  return <div>{message.message.content}</div>;
};

export default OneMessage;
