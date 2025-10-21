"use client";

import { useContext, useEffect, useState } from "react";
import { useLocale } from 'next-intl';

import Hero from "@/components/hero";
import Input from "@/components/input";
/* import Producthunt from "@/components/producthunt"; */
import { Wallpaper } from "@/types/wallpaper";
import Wallpapers from "@/components/wallpapers";
import { toast } from "sonner";
import enLanding from "@/src/i18n/pages/landing/en.json";
import zhLanding from "@/src/i18n/pages/landing/zh.json";
import { AppContext } from "@/contexts/AppContext";

export default function Page() {
  const locale = useLocale();
  const pageMessages = locale === 'zh' ? (zhLanding as any) : (enLanding as any);
  const titleRaw = pageMessages.Hero.title as string;
  const descriptionRaw = pageMessages.Hero.description as string;
  const { user } = useContext(AppContext);
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWallpapers = async function (page: number) {
    try {
      const uri = "/api/get-wallpapers";
      const params = {
        page: page,
        limit: 50,
      };

      setLoading(true);
      const resp = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(params),
      });
      setLoading(false);

      if (resp.ok) {
        const res = await resp.json();
        if (res.data) {
          setWallpapers(res.data);
          return;
        }
      }

      toast.error("get wallpapers failed");
    } catch (e) {
      console.log("get wallpapers failed: ", e);
      toast.error("get wallpapers failed");
    }
  };

  useEffect(() => {
    fetchWallpapers(1);
  }, []);

  return (
    <div className="md:mt-16">
      <div className="max-w-3xl mx-auto">
        <Hero
          title={(function () {
            const raw = titleRaw;
            if (locale === 'en') {
              const parts = raw.split('Generator');
              if (parts.length > 1) {
                return (
                  <>
                    {parts[0]}
                    <span className="text-pink-500">Generator</span>
                    {parts.slice(1).join('Generator')}
                  </>
                );
              }
            }
            return raw;
          })()}
          description={descriptionRaw}
        />
        {/*
        <div className="my-4 md:my-6">
          <Producthunt />
        </div>
        */}
        <div className="mx-auto my-4 flex max-w-lg justify-center">
          <Input wallpapers={wallpapers} setWallpapers={setWallpapers} />
        </div>
      </div>

      <div className="pt-0">
        <Wallpapers wallpapers={wallpapers} loading={loading} />
      </div>
    </div>
  );
}