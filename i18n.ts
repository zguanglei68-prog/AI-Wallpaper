import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

export const locales = ['en', 'zh'];
export const defaultLocale = 'en';
export const localePrefix = 'always';

export default getRequestConfig(async ({locale}) => {
  // Fallback to defaultLocale instead of throwing notFound
  const currentLocale = (locale && locales.includes(locale as any)) ? (locale as string) : defaultLocale;

  return {
    locale: currentLocale,
    messages: (await import(`./messages/${currentLocale}.json`)).default
  };
});