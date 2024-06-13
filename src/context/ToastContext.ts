import { createContext } from 'react';
import { MyToast } from '../lib/types.ts';

const ToastContext = createContext({
  appToast: { message: '', type: 'info' } as MyToast,
  setAppToast: (_toast: any) => {},
});

export default ToastContext;
