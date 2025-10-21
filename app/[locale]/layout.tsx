
import { ClerkProvider } from "@clerk/nextjs";

import type { Metadata } from "next";
import { Toaster } from "sonner";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import Script from 'next/script';
import { ThemeProvider } from "@/components/theme-provider";



export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const messages = await getMessages({ locale }) as any;
  const site = messages?.Site || {};
  return {
    title: {
      template: site.titleTemplate || "%s by AI Wallpaper Generator | AI Wallpaper Shop",
      default: site.titleDefault || "AI Wallpaper Generator | AI Wallpaper Shop",
    },
    description:
      "AI Wallpaper Shop is an AI Wallpaper Generator, used to generate beautiful wallpapers with AI.",
    keywords:
      "AI Wallpaper, AI Wallpaper Shop, AI Wallpaper Generator, AI Wallpaper image",
  };
}

export default async function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = await getMessages({ locale });

  return (
        <>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClerkProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster position="top-center" richColors />
              {children}
            </ThemeProvider>
          </ClerkProvider>
        </NextIntlClientProvider>
        <Script
          async
          src="https://chatgpt-umami.vercel.app/script.js"
          data-website-id="def28550-20ea-49d8-9c1a-68dbfaba0134"
          strategy="afterInteractive"
        />
        </>
  );
}