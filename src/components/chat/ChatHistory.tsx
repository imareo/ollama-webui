import { useContext, useEffect } from 'react';
import HistoryContext from '../../context/HistoryContext.ts';
import UserMessage from './UserMessage.tsx';
import AssistantMessage from './AssistantMessage.tsx';
import { Model, ChatOptions } from '../../lib/types.ts';

type Props = {
  selectedModel?: Model;
  options: ChatOptions;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

const ChatHistory = (props: Props) => {
  const { selectedModel, options, isLoading, setIsLoading } = props;
  const { history } = useContext(HistoryContext);

  useEffect(() => {
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
  }, [history]);

  return (
    <div className='overflow-hidden pb-10'>
      {history.length > 0 &&
        history.map((message) => (
          <div className='mb-2 grid grid-cols-12' key={message.id}>
            {message.message.role === 'user' && (
              <UserMessage
                message={message}
                selectedModel={selectedModel}
                options={options}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
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
