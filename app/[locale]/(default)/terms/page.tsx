import type { Metadata } from "next";
import termsEn from "@/src/i18n/pages/terms/en.json";

export const metadata: Metadata = {
  title: "Terms of Service | AI Wallpaper",
};

type Params = { locale: string };

export default function TermsPage({ params }: { params: Params }) {
  // Currently only English content; fallback to English for all locales
  const data = (termsEn as any).Terms;

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 md:px-10 lg:px-20">
      <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl text-primary mb-6">
        {data.title}
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Brand: {data.brand} · Domain: {data.domain} · Last Updated: {data.lastUpdated}
      </p>

      <Section heading={data.intro.heading}>
        <p>{data.intro.content}</p>
      </Section>

      <Section heading={data.eligibility.heading}>
        <p>{data.eligibility.content}</p>
      </Section>

      <Section heading={data.account.heading}>
        <ul className="list-disc pl-6 space-y-2">
          {data.account.items.map((txt: string, idx: number) => (
            <li key={idx}>{txt}</li>
          ))}
        </ul>
      </Section>

      <Section heading={data.serviceOverview.heading}>
        <ul className="list-disc pl-6 space-y-2">
          {data.serviceOverview.items.map((txt: string, idx: number) => (
            <li key={idx}>{txt}</li>
          ))}
        </ul>
      </Section>

      <Section heading={data.acceptableUse.heading}>
        <ul className="list-disc pl-6 space-y-2">
          {data.acceptableUse.items.map((txt: string, idx: number) => (
            <li key={idx}>{txt}</li>
          ))}
        </ul>
      </Section>

      <Section heading={data.contentOwnership.heading}>
        <ul className="list-disc pl-6 space-y-2">
          {data.contentOwnership.items.map((txt: string, idx: number) => (
            <li key={idx}>{txt}</li>
          ))}
        </ul>
      </Section>

      <Section heading={data.payments.heading}>
        <ul className="list-disc pl-6 space-y-2">
          {data.payments.items.map((txt: string, idx: number) => (
            <li key={idx}>{txt}</li>
          ))}
        </ul>
      </Section>

      <Section heading={data.thirdParties.heading}>
        <p>{data.thirdParties.content}</p>
      </Section>

      <Section heading={data.privacy.heading}>
        <p>{data.privacy.content}</p>
      </Section>

      <Section heading={data.ip.heading}>
        <ul className="list-disc pl-6 space-y-2">
          {data.ip.items.map((txt: string, idx: number) => (
            <li key={idx}>{txt}</li>
          ))}
        </ul>
      </Section>

      <Section heading={data.warranty.heading}>
        <ul className="list-disc pl-6 space-y-2">
          {data.warranty.items.map((txt: string, idx: number) => (
            <li key={idx}>{txt}</li>
          ))}
        </ul>
      </Section>

      <Section heading={data.liability.heading}>
        <p>{data.liability.content}</p>
      </Section>

      <Section heading={data.termination.heading}>
        <ul className="list-disc pl-6 space-y-2">
          {data.termination.items.map((txt: string, idx: number) => (
            <li key={idx}>{txt}</li>
          ))}
        </ul>
      </Section>

      <Section heading={data.governingLaw.heading}>
        <p>{data.governingLaw.content}</p>
      </Section>

      <Section heading={data.changes.heading}>
        <p>{data.changes.content}</p>
      </Section>

      <Section heading={data.contact.heading}>
        <p>{data.contact.content}</p>
      </Section>
    </div>
  );
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold md:text-2xl mb-3">{heading}</h2>
      <div className="text-sm md:text-base leading-relaxed text-gray-800">{children}</div>
    </section>
  );
}