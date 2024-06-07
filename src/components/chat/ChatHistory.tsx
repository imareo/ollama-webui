import { useContext } from 'react';
import HistoryContext from '../../context/HistoryContext.ts';
import UserMessage from './UserMessage.tsx';
import AssistantMessage from './AssistantMessage.tsx';

const ChatHistory = () => {
  const { history } = useContext(HistoryContext);

  return (
    <div className='pb-10'>
      {history.length > 0 &&
        history.map((message) => (
          <div className='mb-2 grid grid-cols-12' key={message.id}>
            {message.message.role === 'user' && (
              <UserMessage message={message} />
            )}
            {message.message.role === 'assistant' && (
              <AssistantMessage message={message} />
            )}
          </div>
        ))}
    </div>
  );
};

export default ChatHistory;
