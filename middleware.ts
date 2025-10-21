import { authMiddleware } from "@clerk/nextjs";
import createIntlMiddleware from 'next-intl/middleware';

const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'zh'],
  defaultLocale: 'en',
  localeDetection: false,
  localePrefix: 'always'
});

export default authMiddleware({
  beforeAuth: (request) => {
    return intlMiddleware(request);
  },

  publicRoutes: [
    '/',
    '/pricing',
    '/api/get-wallpapers',
    '/api/get-user-info',
    '/en',
    '/zh',
    '/en/pricing',
    '/zh/pricing',
    '/en/sign-in',
    '/zh/sign-in',
    '/en/sign-up',
    '/zh/sign-up',
    '/en/pay-success',
    '/zh/pay-success',
    '/en/privacy',
    '/zh/privacy',
    '/en/terms',
    '/zh/terms',
    '/en/api/get-wallpapers',
    '/zh/api/get-wallpapers',
    '/en/api/get-user-info',
    '/zh/api/get-user-info',
    '/en/api/credits',
    '/zh/api/credits',
    '/en/api/generations',
    '/zh/api/generations',
    '/en/api/posts',
    '/zh/api/posts',
    '/en/api/posts/by-slug',
    '/zh/api/posts/by-slug',
    '/en/api/posts/(.*)',
    '/zh/api/posts/(.*)',
    '/en/api/api-keys',
    '/zh/api/api-keys',
    '/en/api/api-keys/(.*)',
    '/zh/api/api-keys/(.*)',
    '/en/api/protected/check',
    '/zh/api/protected/check'
  ],
});

export const config = {
  // Include all app routes and also API routes so Clerk can initialize auth context
  matcher: [
    '/((?!_next|.*\\..*).*)',
    '/(api|trpc)(.*)'
  ]
};