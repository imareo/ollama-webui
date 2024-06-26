import { useContext } from 'react';
import { TbCopy, TbReload, TbSquareRoundedX } from 'react-icons/tb';
import historyContext from '../../context/HistoryContext.ts';
import ToastContext from '../../context/ToastContext.ts';
import {
  ERROR_CHAT_RESPONSE,
  ERROR_COPY_TO_CLIPBOARD,
  SUCCESS_COPY_TO_CLIPBOARD,
} from '../../lib/constants.ts';
import { getAbortController, getChatApi } from '../../lib/service.ts';
import {
  ChatOptions,
  ChatRequest,
  HistoryMessage,
  Model,
} from '../../lib/types.ts';

type Props = {
  message: HistoryMessage;
  selectedModel?: Model;
  options: ChatOptions;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

const UserMessage = (props: Props) => {
  const { setAppToast } = useContext(ToastContext);
  const { message, selectedModel, options, isLoading, setIsLoading } = props;
  const { history, setHistory } = useContext(historyContext);

  const handleCopyMessage = (content: string) => async () => {
    try {
      await navigator.clipboard.writeText(content);
      setAppToast(SUCCESS_COPY_TO_CLIPBOARD);
    } catch (e: any) {
      setAppToast(ERROR_COPY_TO_CLIPBOARD);
    }
  };

  const handleDeleteMessage = (id: string) => async () => {
    setHistory(history.filter((message) => message.id !== id));
  };

  const handleReloadChat = (id: string) => async () => {
    const indexLastMessage = history.findIndex((message) => message.id === id);
    setIsLoading(true);
    try {
      if (indexLastMessage >= 0) {
        const newHistory = history.slice(0, indexLastMessage + 1);
        setHistory(newHistory);

        if (selectedModel) {
          const request: ChatRequest = {
            model: selectedModel.model,
            options,
            history: newHistory,
            setHistory,
            controller: getAbortController(),
          };
          await getChatApi(request);
        }
      }
    } catch (e: any) {
      if (e.name !== 'AbortError') {
        setAppToast(ERROR_CHAT_RESPONSE);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='col-span-11 col-start-2 max-w-none rounded-xl bg-blue-50 p-2'>
      {!!message.message.images?.length &&
        message.message.images.map((image) => (
          <img
            className='w-[244px] rounded-lg shadow'
            src={`data:image/png;base64,${image}`}
            alt={'user image'}
          />
        ))}
      <pre className='prose-sm whitespace-break-spaces px-3 pt-3'>
        {message.message.content}
      </pre>
      <div className='flex pt-2 text-end text-xs text-slate-500'>
        <div className='grow justify-start self-center pl-1 text-start'>
          {message.info}
        </div>
        <TbCopy
          className='flextext-secondary fw-light ml-2 text-2xl'
          title='Copy message text'
          onClick={handleCopyMessage(message.message.content)}
        />
        <div onClick={!isLoading ? handleReloadChat(message.id) : undefined}>
          <TbReload
            className='text-secondary fw-light text-2xl'
            title='Clear below and ask again from here'
          />
        </div>
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
