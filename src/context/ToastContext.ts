import { createContext } from 'react';
import { MyToast } from '../lib/types.ts';

const ToastContext = createContext({
  appToast: { message: '', type: 'info' } as MyToast,
  setAppToast: (_toast: MyToast) => {},
});

export default ToastContext;
