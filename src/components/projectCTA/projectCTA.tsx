"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import BG from "../../../public/bg.svg"

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
    <section id="contact"
      className="mb-10 md:mb-20 px-4 sm:px-6 lg:px-8 w-[calc(100%-40px)] max-w-[1280px] h-auto md:h-[452px] rounded-2xl md:rounded-[24px] mx-auto py-12 md:py-0"
      style={{ 
        background: `url(${BG.src})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="mx-auto h-full">
        <div className="rounded-xl md:rounded-3xl px-0 py-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden h-full flex items-center">
          <Reveal variant="zoom" className="relative z-10 text-center w-full">
            <h2 className="w-full mx-auto font-bruno-ace font-normal text-2xl sm:text-3xl md:text-4xl lg:text-[52px] leading-[110%] text-center text-white px-2">
              Have an Awesome Project Idea? Let&apos;s Discuss
            </h2>
            
            <form onSubmit={handleSubmit} className="w-full max-w-full sm:max-w-[600px] md:max-w-[832px] mx-auto mt-6 md:mt-10">
              <div className="relative w-full">
                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Image 
                    src="/Footer/email.svg" 
                    alt="" 
                    width={40} 
                    height={36}
                    className="w-7 h-6 sm:w-12 sm:h-11 md:w-16 md:h-14"
                  />
                </div>
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
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "sending") setStatus("idle");
                  }}
                  aria-label="Your email address"
                  aria-describedby="contact-status"
                  className="w-full flex items-center pl-11 sm:pl-20 md:pl-[100px] pr-[84px] sm:pr-32 md:pr-[160px] py-4 sm:py-5 md:py-6 rounded-[40px] md:rounded-[60px] bg-white text-foreground placeholder:text-muted-foreground border-0 text-sm sm:text-base md:text-lg min-h-[60px] sm:min-h-[70px] md:min-h-[86px]"
                  required
                />
                <Button type="submit" disabled={status === "sending"} className="disabled:opacity-80 disabled:cursor-wait absolute top-1/2 -translate-y-1/2 right-2 sm:right-3 md:right-[11px] transition-all duration-300 hover:shadow-lg hover:brightness-110 font-bruno-ace font-normal text-white text-sm sm:text-base md:text-[24px] leading-[140%] bg-gradient-to-b from-[#4C7DFE] to-[#001959] w-[72px] sm:w-24 md:w-[126px] h-11 sm:h-12 md:h-[64px] rounded-[40px] md:rounded-[60px] flex items-center justify-center gap-1 sm:gap-2">
                  <span className="font-urbanist font-medium text-xs sm:text-sm md:text-[20px] leading-none tracking-[-1.5%]">
                    {status === "sending" ? "Sending…" : status === "sent" ? "Sent ✓" : "Send"}
                  </span>
                </Button>
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
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ProjectCTA;