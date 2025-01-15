import 'server-only';
import { headers } from 'next/headers';
import { SearchParams } from '@/types';

export async function getSearchParams(): Promise<SearchParams> {
  const searchParams = new URLSearchParams(headers().get('X-Search-Params') ?? '');
  return {
    p: searchParams.get('p') ?? undefined,
    c: searchParams.get('c') ?? undefined,
    m: searchParams.get('m') ?? undefined,
    s: searchParams.get('s') ?? new Date().getTime().toString(),
    f: searchParams.get('f') ?? undefined,
  };
}
