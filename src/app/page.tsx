import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import { ScrollProgress } from "@/components/motion/primitives";
import WorkExperience from "@/components/WorkExperience/WorkExperience";
import WhyHireMe from "@/components/WhyHireMe/WhyHireMe";
import ProjectCTA from "@/components/projectCTA/projectCTA";

import { Portfolio } from "@/components/Portfolio/Portfolio";
import SlidingBanner from "@/components/slidingBanner/SlidingBanner";
import StructuredData from "@/components/StructuredData";

export default function Home() {
  return (
    <main className="min-h-screen">
      <StructuredData />
      <ScrollProgress />
      <Hero />
      <About />
      <WorkExperience />
      <SlidingBanner/>
      <WhyHireMe />
      <SlidingBanner reverse />
      <Portfolio />
      <ProjectCTA />
    </main>
  );
}
