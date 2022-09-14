import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notificationHandler = (
  message: string,
  type?: 'success' | 'error' | 'warning' | 'info' | 'default'
) => {
  switch (type) {
    case 'default':
      return toast(message);
    case 'success':
      return toast.success(message);
    case 'error':
      return toast.error(message);
    case 'warning':
      return toast.warn(message);
    case 'info':
      return toast.info(message);
  }
};
