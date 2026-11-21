'use client'
import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Image as ImageIcon, Monitor, Smartphone } from 'lucide-react';

type Mode = 'screenshot' | 'desktop' | 'mobile';

const tabs: { id: Mode; label: string; icon: typeof Monitor }[] = [
  { id: 'screenshot', label: 'Screenshot', icon: ImageIcon },
  { id: 'desktop', label: 'Live desktop', icon: Monitor },
  { id: 'mobile', label: 'Live mobile', icon: Smartphone },
];

interface Props {
  title: string;
  image: string;
  demo: string;
}

// Screenshot by default; the live site only loads once a visitor asks for it
export default function ProjectPreview({ title, image, demo }: Props) {
  const [mode, setMode] = useState<Mode>('screenshot');
  const host = new URL(demo).host.replace(/^www\./, '');
  const live = mode !== 'screenshot';

  return (
    <div>
      <div role="tablist" aria-label="Preview mode" className="inline-flex gap-1 rounded-full border border-line bg-surface-muted p-1.5">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={mode === id}
            onClick={() => setMode(id)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-plus-jakarta text-xs font-bold transition-colors md:text-sm ${
              mode === id ? 'bg-ink text-background' : 'text-body-soft hover:text-ink'
            }`}
          >
            <Icon className="h-4 w-4" /> <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{label.replace('Live ', '')}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-surface-muted shadow-[0_40px_70px_-45px_rgba(76,125,254,0.55)]">
        <div className="flex items-center gap-1.5 border-b border-line bg-surface px-3 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-2 min-w-0 flex-1 truncate rounded-full bg-surface-muted px-3 py-0.5 font-plus-jakarta text-xs text-faint">{host}</span>
          {live && (
            <a href={demo} target="_blank" rel="noopener noreferrer" aria-label="Open live site in a new tab" className="text-faint hover:text-ink">
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>

        {mode === 'screenshot' && (
          <Image src={image} alt={`${title} screenshot`} width={2384} height={1404} quality={90} priority sizes="(min-width: 1000px) 1000px, 100vw" className="h-auto w-full" />
        )}
        {mode === 'desktop' && (
          <iframe src={demo} title={`${title} live preview`} loading="lazy" referrerPolicy="no-referrer" className="block h-[70vh] min-h-[480px] w-full bg-white" />
        )}
        {mode === 'mobile' && (
          <div className="flex justify-center bg-surface-muted py-6">
            <iframe src={demo} title={`${title} live mobile preview`} loading="lazy" referrerPolicy="no-referrer" className="block h-[70vh] min-h-[480px] w-[375px] max-w-full rounded-xl border border-line bg-white" />
          </div>
        )}
      </div>

      {live && (
        <p className="mt-3 font-plus-jakarta text-xs text-faint">
          Live preview is the real site, so it can be slow to load. If it looks blank, the site may not allow embedding:{' '}
          <a href={demo} target="_blank" rel="noopener noreferrer" className="font-bold underline">open it in a new tab</a>.
        </p>
      )}
    </div>
  );
}
