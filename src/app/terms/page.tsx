import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms for using the portfolio website of ${site.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="21 November 2026"
      intro={
        <p>
          This is the personal portfolio website of {site.name}, a fullstack developer. By using this site you agree to
          these terms. If you don&apos;t agree, please don&apos;t use the site.
        </p>
      }
      sections={[
        {
          heading: "Using this site",
          body: (
            <>
              <p>You&apos;re welcome to browse the site, view the projects and get in touch about work. Please don&apos;t:</p>
              <ul>
                <li>try to break, overload or gain unauthorised access to the site or its servers;</li>
                <li>use the contact form to send spam, automated messages or someone else&apos;s email address;</li>
                <li>copy the site&apos;s design or content and present it as your own.</li>
              </ul>
            </>
          ),
        },
        {
          heading: "Content and ownership",
          body: (
            <>
              <p>
                The text, design and code of this website belong to {site.name}, unless stated otherwise. You may share
                links to it freely.
              </p>
              <p>
                Projects are shown to illustrate my work. Client projects are shown under placeholder names, and their
                screenshots, trademarks and content belong to their respective owners. The code of personal projects
                linked on GitHub is covered by the license in each repository.
              </p>
            </>
          ),
        },
        {
          heading: "Project enquiries",
          body: (
            <p>
              Sending your email through the contact form is only a request to talk. It doesn&apos;t create a contract or
              commit either of us to anything. Any paid work is agreed separately, in writing, including its scope,
              timeline and price.
            </p>
          ),
        },
        {
          heading: "Links to other websites",
          body: (
            <p>
              This site links to other websites, such as GitHub, LinkedIn and live project demos, and project pages can
              show a live preview of a project&apos;s website. Those sites aren&apos;t under my control, and I&apos;m not
              responsible for their content or their privacy practices.
            </p>
          ),
        },
        {
          heading: "No warranty",
          body: (
            <p>
              The site is provided &ldquo;as is&rdquo;. I try to keep it accurate and available, but I can&apos;t
              guarantee it will always be error-free or online. To the extent the law allows, I&apos;m not liable for any
              loss that results from using the site.
            </p>
          ),
        },
        {
          heading: "Privacy",
          body: (
            <p>
              How the contact form handles your email address is explained in the{" "}
              <Link href="/privacy">Privacy Policy</Link>.
            </p>
          ),
        },
        {
          heading: "Changes to these terms",
          body: (
            <p>
              I may update these terms from time to time. The date at the top shows when they last changed. Using the
              site after a change means you accept the updated terms.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about these terms? Reach me through the <Link href="/#contact">contact form</Link> or on{" "}
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
