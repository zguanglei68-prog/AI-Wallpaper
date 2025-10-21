import Social from "@/components/social";
import { useTranslations } from "next-intl";

export default function () {
  const t = useTranslations("Footer");

  return (
    <section>
      <div className="w-screen flex-col px-6 py-20 lg:flex lg:px-10 xl:px-24">
        <div className="lg:flex lg:flex-row lg:justify-between">
          <div>
            <p>{t("brand")}</p>
            <p className="font-inter mt-4 max-w-[350px] text-base font-light text-gray-500">
              {t("description")}
            </p>
            <div className="mb-8 mt-6">
              <Social />
            </div>
          </div>
          <div className="flex grow flex-row flex-wrap lg:mx-10 lg:flex-nowrap lg:justify-center">
            <div className="my-5 mr-8 flex max-w-[200px] grow basis-[100px] flex-col space-y-5 lg:mx-10 lg:mt-0">
              <p className="font-inter font-medium text-black">{t("friends")}</p>
              <a
                href="https://gpts.works"
                target="_blank"
                className="font-inter font-light text-gray-500"
              >
                GPTs Works
              </a>
              <a
                href="https://gptalk.one"
                target="_blank"
                className="font-inter font-light text-gray-500"
              >
                GPTalk
              </a>
              <a
                href="https://readknown.cn"
                target="_blank"
                className="font-inter font-light text-gray-500"
              >
                ZKnown
              </a>
            </div>
            <div className="my-5 mr-8 flex max-w-[200px] grow basis-[100px] flex-col space-y-5 lg:mx-10 lg:mt-0">
              <p className="font-inter font-medium text-black">{t("creditTo")}</p>
              <a
                href="https://aiwallpaper.shop"
                target="_blank"
                className="font-inter font-light text-gray-500"
              >
                {t("brand")}
              </a>
            </div>
          </div>
          <div className="mt-10 flex flex-col lg:mt-0">
            <div className="mb-4 flex flex-row items-center">
              <p className="block">{t("contact")}</p>
              <p className="font-inter ml-4 text-black">me@idoubi.cc</p>
            </div>

          </div>
        </div>
        <div className="mx-auto my-12 w-full border border-[#E4E4E7] lg:my-20"></div>
        <div className="mb-4">
          <p className="font-inter text-right text-sm">
            <a href="/en/privacy" className="text-gray-600 hover:text-black">Privacy Policy</a>
            <span className="mx-2 text-gray-400">/</span>
            <a href="/en/terms" className="text-gray-600 hover:text-black">Terms of Service</a>
          </p>
        </div>
        <div>
          <p className="font-inter text-center text-sm text-gray-500 lg:mt-0">
            {t("copyright")}{" "}
            <a
              href="https://aiwallpaper.shop"
              target="_blank"
              className="text-primary hidden md:inline-block"
            >
              aiwallpaper.shop
            </a>{" "}
            {t("rights")}
          </p>
        </div>
      </div>
    </section>
  );
}
