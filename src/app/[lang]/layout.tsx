import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGUAGES, getDictionary, isLang } from "@/content";
import { HtmlLang } from "@/components/ui/HtmlLang";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { Intro } from "@/components/intro/Intro";

export function generateStaticParams() {
  return LANGUAGES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const dict = getDictionary(lang);
  return {
    // Social previews need absolute URLs. Set NEXT_PUBLIC_SITE_URL at build time to the
    // real domain — without it the OG image resolves against localhost and no link
    // preview will ever render.
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: dict.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <Intro name={dict.hero.name} />
      <HtmlLang locale={dict.locale} />
      <LanguageToggle current={lang} />
      {children}
    </>
  );
}
