import type { Metadata } from "next";
import ProjectPreview from "@/components/ProjectPreview";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { caseStudies, getProject } from "@/lib/projects";

type Params = { slug: string };

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `/projects/${project.id}`,
      images: [{ url: project.image, width: 2384, height: 1404, alt: `${project.title} screenshot` }],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const index = caseStudies.findIndex((p) => p.id === slug);
  if (index === -1) notFound();

  const project = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <main className="bg-background px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      <article className="mx-auto max-w-[1000px]">
        <Link
          href="/#resume"
          className="inline-flex items-center gap-2 font-plus-jakarta text-sm font-bold text-body-soft transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> All projects
        </Link>

        <p className="mt-8 font-plus-jakarta text-sm font-bold uppercase tracking-widest text-accent-ink">
          {project.repo ? "Personal project" : "Client project"}
        </p>
        <h1 className="mt-3 font-bruno-ace text-3xl font-normal leading-[1.2] text-ink md:text-5xl">{project.title}</h1>
        <p className="mt-4 max-w-[720px] font-plus-jakarta text-base leading-[1.6] text-body-soft md:text-xl">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-b from-[#4C7DFE] to-[#1E3FAE] px-8 font-plus-jakarta text-sm font-bold text-white shadow-[0_14px_34px_-12px_rgba(76,125,254,0.9)]"
          >
            Visit live site <ArrowUpRight className="h-4 w-4" />
          </a>
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-8 font-plus-jakarta text-sm font-bold text-body transition-colors hover:border-[#4C7DFE] hover:text-[#4C7DFE]"
            >
              <Github className="h-4 w-4" /> View code
            </a>
          )}
        </div>

        <div className="mt-10">
          <ProjectPreview title={project.title} image={project.image} demo={project.demo} />
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-[2fr_1fr]">
          <section>
            <h2 className="font-bruno-ace text-xl font-normal text-ink md:text-2xl">Overview</h2>
            <p className="mt-4 font-plus-jakarta text-base leading-[1.7] text-body-soft md:text-lg">{project.overview}</p>
          </section>
          <section>
            <h2 className="font-bruno-ace text-xl font-normal text-ink md:text-2xl">Tech stack</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.split(" · ").map((tech) => (
                <li key={tech} className="rounded-full bg-surface-muted px-3 py-1 font-plus-jakarta text-sm font-semibold text-body">
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <Link
          href={`/projects/${next.id}`}
          className="group mt-16 flex items-center justify-between gap-4 rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-[#4C7DFE]/50 md:p-8"
        >
          <span>
            <span className="block font-plus-jakarta text-xs font-bold uppercase tracking-widest text-faint">Next project</span>
            <span className="mt-1 block font-bruno-ace text-xl text-ink md:text-2xl">{next.title}</span>
          </span>
          <ArrowRight className="h-6 w-6 text-ink transition-transform group-hover:translate-x-1" />
        </Link>
      </article>
    </main>
  );
}
