import { AppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Tab } from "@/types/tab";
import { useContext, useState, useEffect } from "react";
import User from "@/components/user";
import { Sun, Moon, Globe } from "lucide-react";
import Social from "../social";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function () {
  const t = useTranslations("Header");
  const { user } = useContext(AppContext);
  const pathname = usePathname() || '/';
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();

  // Locale-safe switching: strip first locale segment, then prefix target
  const stripped = pathname.replace(/^\/(en|zh)(?=\/|$)/, '') || '/';
  const enLink = stripped === '/' ? '/en' : '/en' + stripped;
  const zhLink = stripped === '/' ? '/zh' : '/zh' + stripped;

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigations: Tab[] = [
    { name: "pricing", title: t("pricing"), url: "/pricing" as const },
  ];

  return (
    <header>
      <div className="h-auto w-screen">
        <nav className="font-inter mx-auto h-auto w-full max-w-[1600px] lg:relative lg:top-0">
          <div className="flex flex-row items-center px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-8 xl:px-20">
            <Link href={locale === 'zh' ? '/zh' : '/en'} className="text-xl font-medium flex items-center">
              <img
                src="/logo.png"
                className="w-10 h-10 rounded-full mr-3"
                alt="logo"
              />
              <span className="font-bold text-primary text-2xl">
                {t("brand")}
              </span>
            </Link>

            <div className="hidden md:flex ml-16">
              {navigations.map((tab: Tab, idx: number) => (
                <Link
                  key={idx}
                  href={`/${locale === 'zh' ? 'zh' : 'en'}${tab.url === '/' ? '' : tab.url}`}
                  className="text-md font-medium leading-6 text-gray-900"
                >
                  {tab.title}
                </Link>
              ))}
            </div>

            <div className="flex-1"></div>

            <div className="flex flex-row items-center lg:flex lg:flex-row lg:space-x-3 lg:space-y-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Globe className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    <span className="sr-only">Toggle language</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={enLink}>English</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={zhLink}>中文</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Toggle Button */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              )}

              {mounted && (
                <>
                  {user === undefined ? (
                    <>loading...</>
                  ) : (
                    <>
                      {user ? (
                        <>
                          {user.credits && (
                            <div className="hidden md:block mr-8 font-medium cursor-pointer">
                              {t("credits")}:{" "}
                              <span className="text-primary">
                                {user.credits.left_credits}
                              </span>
                            </div>
                          )}

                          <User user={user} />
                        </>
                      ) : (
                        <Link className="cursor-pointer" href={`/${locale === 'zh' ? 'zh' : 'en'}/sign-in`}>
                          <Button>{t("signIn")}</Button>
                        </Link>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
            <a href="#" className="absolute right-5 lg:hidden"></a>
          </div>
        </nav>
      </div>
    </header>
  );
}
