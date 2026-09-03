import { notFound } from "next/navigation";
import { getDictionary, isLang } from "@/content";
import { Journey } from "@/components/sections/Journey";
import { Canada } from "@/components/sections/Canada";
import { Brazil } from "@/components/sections/Brazil";
import { Contact } from "@/components/sections/Contact";
import { MiniMap } from "@/components/map/MiniMap";
import { SectionFade } from "@/components/ui/SectionFade";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <main>
        <Journey dict={dict} />
        <Canada dict={dict} />
        <SectionFade />
        <Brazil dict={dict} />
      </main>
      <Contact dict={dict} />
      <MiniMap dict={dict} />
    </>
  );
}
