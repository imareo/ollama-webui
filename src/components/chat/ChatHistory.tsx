import { useContext } from 'react';
import HistoryContext from '../../context/HistoryContext.ts';
import OneMessage from './oneMessage.tsx';

const ChatHistory = () => {
  const { history } = useContext(HistoryContext);

  return (
    <div>
      {history.length > 0 &&
        history.map((message, index) => (
          <div key={index}>
            <OneMessage message={message} />
          </div>
        ))}
    </div>
  );
};

export default ChatHistory;
