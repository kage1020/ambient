import { headers } from 'next/headers';
import { z } from 'zod';
// import { defaultLocale } from '@/libs/i18n';

const defaultLocale = 'en';

export const paramsSchema = z
  .object({
    locale: z.string().default('en'),
  })
  .catch({ locale: defaultLocale });
export const searchParamsSchema = z
  .object({
    playlist: z.string().nullable().default(null),
    category: z.string().nullable().default(null),
    mediaIndex: z
      .string()
      .nullable()
      .default(null)
      .transform((val) => {
        const parsed = Number.parseInt(val ?? '');
        return Number.isNaN(parsed) ? null : parsed;
      }),
    seed: z.string().transform((val) => {
      const parsed = Number.parseInt(val);
      return Number.isNaN(parsed) ? new Date().getTime() : parsed;
    }),
    shuffle: z
      .string()
      .default('false')
      .transform((val) => val === 'true'),
  })
  .catch({
    playlist: null,
    category: null,
    mediaIndex: null,
    seed: new Date().getTime(),
    shuffle: false,
  });

export type PageParams = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<
    Partial<{
      playlist: string;
      category: string;
      mediaIndex: string;
      seed: string;
      shuffle: string;
    }>
  >;
};

export type ParsedPageParams = {
  parsedParams: {
    locale: string;
  };
  parsedSearchParams: {
    playlist: string | null;
    category: string | null;
    mediaIndex: number | null;
    seed: number;
    shuffle: boolean;
  };
};

export async function parsePageParams(
  pageParams: Partial<{
    params: PageParams['params'];
    searchParams: URLSearchParams | PageParams['searchParams'];
  }>
) {
  const { params, searchParams } = pageParams;
  const resolvedParams = params instanceof Promise ? await params : params;

  return {
    parsedParams: paramsSchema.parse(resolvedParams),
    parsedSearchParams: searchParamsSchema.parse(
      searchParams instanceof URLSearchParams
        ? Object.fromEntries(searchParams.entries())
        : await searchParams
    ),
  };
}

export async function getPageParams() {
  const headerList = await headers();
  const locale = headerList.get('X-Locale');
  const searchParams = new URLSearchParams(headerList.get('X-Search-Params') ?? '');

  return {
    params: paramsSchema.parse({ locale }),
    searchParams: searchParamsSchema.parse(Object.fromEntries(searchParams.entries())),
  };
}

export function toSearchParams(parsedSearchParams: ParsedPageParams['parsedSearchParams']) {
  const searchParams = new URLSearchParams();
  if (parsedSearchParams.playlist !== null)
    searchParams.set('playlist', parsedSearchParams.playlist);
  if (parsedSearchParams.category !== null)
    searchParams.set('category', parsedSearchParams.category);
  if (parsedSearchParams.mediaIndex !== null)
    searchParams.set('mediaIndex', String(parsedSearchParams.mediaIndex));
  searchParams.set('seed', String(parsedSearchParams.seed));
  searchParams.set('shuffle', String(parsedSearchParams.shuffle));
  return searchParams;
}
