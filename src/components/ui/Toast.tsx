import { useContext, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import ToastContext from '../../context/ToastContext.ts';
import { EMPTY_TOAST } from '../../lib/constants.ts';

const Toast = () => {
  const { appToast, setAppToast } = useContext(ToastContext);

  useEffect(() => {
    if (appToast.message) {
      toast(appToast.message, {
        type: appToast.type,
        theme: 'colored',
        hideProgressBar: true,
      });
      setAppToast(EMPTY_TOAST);
    }
  }, [appToast]);

  return <ToastContainer autoClose={3000} />;
};

export default Toast;
