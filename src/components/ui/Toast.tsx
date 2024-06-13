import { useContext, useEffect } from 'react';
import ToastContext from '../../context/ToastContext.ts';
import { toast, ToastContainer } from 'react-toastify';
import { MyToast } from '../../lib/types.ts';

const Toast = () => {
  const { appToast, setAppToast } = useContext(ToastContext);
  const emptyToast: MyToast = { message: '', type: 'info' };

  useEffect(() => {
    if (appToast.message) {
      toast(appToast.message, {
        type: appToast.type,
        theme: 'colored',
        hideProgressBar: true,
      });
      setAppToast(emptyToast);
    }
  }, [appToast]);

  return <ToastContainer autoClose={3000} />;
};

export default Toast;
