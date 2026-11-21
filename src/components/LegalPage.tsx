import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export interface LegalSection {
  heading: string;
  body: React.ReactNode;
}

interface Props {
  title: string;
  updated: string;
  intro: React.ReactNode;
  sections: LegalSection[];
}

// Shared layout for the Terms & Conditions and Privacy Policy pages
export default function LegalPage({ title, updated, intro, sections }: Props) {
  return (
    <main className="bg-background px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      <article className="mx-auto max-w-[760px]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-plus-jakarta text-sm font-bold text-body-soft transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <h1 className="mt-8 font-bruno-ace text-3xl font-normal leading-[1.2] text-ink md:text-5xl">{title}</h1>
        <p className="mt-3 font-plus-jakarta text-sm text-faint">Last updated: {updated}</p>
        <div className="mt-6 font-plus-jakarta text-base leading-[1.7] text-body-soft md:text-lg">{intro}</div>

        <div className="mt-10 space-y-10">
          {sections.map((s, i) => (
            <section key={s.heading}>
              <h2 className="font-bruno-ace text-xl font-normal text-ink md:text-2xl">
                {i + 1}. {s.heading}
              </h2>
              <div className="mt-3 space-y-3 font-plus-jakarta text-base leading-[1.7] text-body-soft [&_a]:font-bold [&_a]:text-accent-ink [&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
                {s.body}
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
