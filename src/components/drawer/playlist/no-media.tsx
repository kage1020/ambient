import { getLocale, getTranslation } from '@/libs/locale';

export default async function NoMediaGroup() {
  const locale = await getLocale();
  const t = await getTranslation(locale);

  return (
    <div className='flex w-full h-full justify-center items-center text-base text-gray-500'>
      {t['No media available.']}
    </div>
  );
}
