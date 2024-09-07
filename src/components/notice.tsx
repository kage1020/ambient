import { Alert } from 'flowbite-react';
import { toast } from 'sonner';
import { Alert as AlertIcon } from '@/components/icons';

const noticeColor = {
  info: 'blue',
  error: 'red',
  success: 'green',
  warning: 'yellow',
  default: 'gray',
};

export function showMessage(
  message: string,
  type: 'info' | 'error' | 'success' | 'warning' | 'default'
) {
  toast.custom((id) => <Notice message={message} type={type} id={id} />);
}

type NoticeProps = {
  message: string;
  type: 'info' | 'error' | 'success' | 'warning' | 'default';
  id: string | number;
};

export default function Notice({ message, type, id }: NoticeProps) {
  return (
    <Alert
      color={noticeColor[type]}
      onDismiss={() => toast.dismiss(id)}
      icon={() => <AlertIcon className='w-4 h-4' />}
    >
      <span className='font-medium'>{message}</span>
    </Alert>
  );
}
