"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { Rise, SectionHeading, SpotlightCard } from "@/components/motion/primitives";

type Status = "idle" | "sending" | "sent" | "error";

const ProjectCTA = () => {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // hidden spam trap
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("sent");
      setMessage("Thanks! Check your inbox for a confirmation. I'll get back to you soon.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="px-5 pb-12 md:pb-24">
      <section
        id="contact"
        className="relative mx-auto w-full max-w-[1280px] overflow-hidden rounded-[20px] bg-[#001959] md:rounded-[28px]"
      >
        {/* Background: blue gradient, drifting glows, grid and slowly turning rings */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#4C7DFE_0%,#1E3FAE_45%,#001959_100%)]" />
          <div className="absolute -left-[10%] -top-[50%] h-[110%] w-[50%] rounded-full bg-[#8EAAFF]/45 blur-[110px] animate-aurora" />
          <div className="absolute -bottom-[55%] -right-[10%] h-[110%] w-[50%] rounded-full bg-[#00070E]/60 blur-[110px] animate-aurora [animation-delay:-9s]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_80%_at_50%_50%,#000_10%,transparent_75%)]" />
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-2 border-dashed border-white/20 animate-orbit [animation-duration:50s] md:h-96 md:w-96" />
          <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full border border-white/15 md:h-96 md:w-96" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full border-2 border-dashed border-white/15 animate-orbit [animation-direction:reverse] [animation-duration:40s] md:h-72 md:w-72" />
        </div>

        <SpotlightCard glow="rgba(255,255,255,0.12)" className="rounded-[inherit] px-5 py-14 sm:px-10 md:px-16 md:py-24">
          <div className="relative mx-auto max-w-[860px] text-center">
            <SectionHeading
              eyebrow="Get in touch"
              tone="dark"
              parts={[{ text: "Have an Awesome Project Idea?" }, { text: "Let\u2019s Discuss", accent: true }]}
            />
            <Rise delay={0.25}>
              <p className="mx-auto mt-4 max-w-[560px] font-plus-jakarta text-sm leading-[1.65] text-[#DCE5FF] sm:text-base">
                Leave your email and I&apos;ll get back to you within 24&ndash;48 hours.
              </p>
            </Rise>

            <Rise delay={0.4}>
              <form onSubmit={handleSubmit} className="mx-auto mt-8 w-full max-w-[680px] md:mt-10">
                <div className="group/field relative w-full rounded-full bg-white p-1.5 shadow-[0_30px_60px_-25px_rgba(0,7,14,0.7)] ring-0 ring-white/40 transition-shadow duration-300 focus-within:ring-4 md:p-2">
                  <Mail aria-hidden className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4C7DFE] md:left-7 md:h-6 md:w-6" />
                  {/* Hidden from people; bots that fill it get ignored */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  />
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status !== "sending") setStatus("idle");
                    }}
                    aria-label="Your email address"
                    aria-describedby="contact-status"
                    className="h-12 w-full rounded-full border-0 bg-transparent pl-12 pr-[112px] font-plus-jakarta text-sm text-[#00070E] shadow-none placeholder:text-[#667085] focus-visible:ring-0 md:h-14 md:pl-16 md:pr-[160px] md:text-base"
                    required
                  />
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 md:right-2"
                  >
                    <Button
                      type="submit"
                      disabled={status === "sending"}
                      className="relative flex h-12 w-[100px] items-center justify-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-b from-[#4C7DFE] to-[#001959] font-plus-jakarta text-sm font-bold text-white transition-shadow duration-300 hover:shadow-[0_12px_28px_-10px_rgba(76,125,254,1)] disabled:cursor-wait disabled:opacity-90 md:h-14 md:w-[140px] md:text-base"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Sending
                        </>
                      ) : status === "sent" ? (
                        <>
                          <Check className="h-4 w-4" /> Sent
                        </>
                      ) : (
                        <>
                          Send <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                      {status === "idle" && (
                        <span aria-hidden className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-sheen" />
                      )}
                    </Button>
                  </motion.div>
                </div>
                <p
                  id="contact-status"
                  role="status"
                  aria-live="polite"
                  className={`mt-4 min-h-[1.5em] font-plus-jakarta text-sm md:text-base ${status === "error" ? "text-red-200" : "text-white"}`}
                >
                  {message}
                </p>
              </form>
            </Rise>
          </div>
        </SpotlightCard>
      </section>
    </div>
  );
};

export default ProjectCTA;
