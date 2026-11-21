import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How the portfolio website of ${site.name} handles your information.`,
  alternates: { canonical: "/privacy" },
};

// Keep this in step with what the site actually does:
// contact form → src/app/api/contact/route.ts, theme → next-themes (localStorage), no analytics or cookies.
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="21 November 2026"
      intro={
        <p>
          This site collects as little as possible: only the email address you choose to send through the contact form.
          There are no analytics, no advertising and no tracking cookies.
        </p>
      }
      sections={[
        {
          heading: "What is collected",
          body: (
            <ul>
              <li>
                <strong>Your email address</strong>, if you submit the contact form. Nothing else is asked for.
              </li>
              <li>
                <strong>Your IP address</strong>, briefly, to stop the contact form being used for spam. It is held in
                the server&apos;s memory for about 10 minutes and is never saved or shared.
              </li>
              <li>
                <strong>Standard server logs</strong> kept by the hosting provider, Vercel, such as the pages requested,
                time and browser type. They are used to keep the site running and secure.
              </li>
            </ul>
          ),
        },
        {
          heading: "How your email is used",
          body: (
            <>
              <p>When you submit the contact form:</p>
              <ul>
                <li>I receive an email with your address so I can reply about your project;</li>
                <li>you receive one confirmation email saying your message arrived.</li>
              </ul>
              <p>
                Your address isn&apos;t added to any mailing list, used for marketing, or sold or shared with anyone
                else.
              </p>
            </>
          ),
        },
        {
          heading: "Services that handle your data",
          body: (
            <ul>
              <li>
                <strong>Google (Gmail)</strong> sends and stores the contact form emails.
              </li>
              <li>
                <strong>Vercel</strong> hosts the website and runs the contact form.
              </li>
            </ul>
          ),
        },
        {
          heading: "Cookies and browser storage",
          body: (
            <p>
              The site sets no cookies. If you switch between light and dark mode, that choice is saved in your own
              browser (local storage) so it&apos;s remembered next time. It never leaves your device, and you can clear it
              in your browser settings.
            </p>
          ),
        },
        {
          heading: "Other websites and live previews",
          body: (
            <p>
              Links to GitHub, LinkedIn and project websites take you to sites with their own privacy policies. On a
              project page, the live preview loads that project&apos;s website only after you choose &ldquo;Live
              desktop&rdquo; or &ldquo;Live mobile&rdquo;.
            </p>
          ),
        },
        {
          heading: "How long it is kept",
          body: (
            <p>
              Contact emails are kept in my inbox for as long as needed to talk about your project and keep a record of
              it. You can ask me to delete them at any time.
            </p>
          ),
        },
        {
          heading: "Your choices",
          body: (
            <p>
              You can ask what information I hold about you, ask me to correct it, or ask me to delete it. Just get in
              touch and I&apos;ll respond as soon as I can.
            </p>
          ),
        },
        {
          heading: "Changes to this policy",
          body: (
            <p>
              If the site starts collecting anything new, this page will be updated first. The date at the top shows when
              it last changed.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              For any privacy question or request, use the <Link href="/#contact">contact form</Link> or message me on{" "}
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>. See also the{" "}
              <Link href="/terms">Terms &amp; Conditions</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
