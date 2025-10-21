import type { Metadata } from "next";
import privacyEn from "@/src/i18n/pages/privacy/en.json";

export const metadata: Metadata = {
  title: "Privacy Policy | AI Wallpaper",
};

type Params = { locale: string };

export default function PrivacyPage({ params }: { params: Params }) {
  // Currently only English content; fallback to English for all locales
  const data = (privacyEn as any).Privacy;

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

      <Section heading={data.whatWeCollect.heading}>
        <ul className="list-disc pl-6 space-y-2">
          {data.whatWeCollect.items.map((item: any, idx: number) => (
            <li key={idx}>
              <span className="font-medium">{item.title}:</span> {item.content}
            </li>
          ))}
        </ul>
      </Section>

      <Section heading={data.howWeUse.heading}>
        <ul className="list-disc pl-6 space-y-2">
          {data.howWeUse.items.map((txt: string, idx: number) => (
            <li key={idx}>{txt}</li>
          ))}
        </ul>
      </Section>

      <Section heading={data.aiProcessing.heading}>
        <p>{data.aiProcessing.content}</p>
      </Section>

      <Section heading={data.legalBases.heading}>
        <ul className="list-disc pl-6 space-y-2">
          {data.legalBases.items.map((txt: string, idx: number) => (
            <li key={idx}>{txt}</li>
          ))}
        </ul>
      </Section>

      <Section heading={data.retention.heading}>
        <p>{data.retention.content}</p>
      </Section>

      <Section heading={data.sharing.heading}>
        <ul className="list-disc pl-6 space-y-2">
          {data.sharing.items.map((txt: string, idx: number) => (
            <li key={idx}>{txt}</li>
          ))}
        </ul>
      </Section>

      <Section heading={data.cookies.heading}>
        <p>{data.cookies.content}</p>
      </Section>

      <Section heading={data.security.heading}>
        <p>{data.security.content}</p>
      </Section>

      <Section heading={data.children.heading}>
        <p>{data.children.content}</p>
      </Section>

      <Section heading={data.international.heading}>
        <p>{data.international.content}</p>
      </Section>

      <Section heading={data.yourRights.heading}>
        <ul className="list-disc pl-6 space-y-2">
          {data.yourRights.items.map((txt: string, idx: number) => (
            <li key={idx}>{txt}</li>
          ))}
        </ul>
        {data.yourRights.note && (
          <p className="text-gray-600 mt-2">{data.yourRights.note}</p>
        )}
      </Section>

      <Section heading={data.payments.heading}>
        <p>{data.payments.content}</p>
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