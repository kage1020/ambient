import { toast } from 'sonner';
import Notice from '@/components/notice';

export default function useMessage() {
  function showMessage(
    message: string,
    type: 'default' | 'info' | 'warning' | 'error' | 'success',
    locale: string
  ) {
    toast.custom((id) => <Notice locale={locale} message={message} type={type} id={id} />);
  }

  return { showMessage };
}
