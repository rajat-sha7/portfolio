import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import WorkExperience from "@/components/WorkExperience/WorkExperience";
import WhyHireMe from "@/components/WhyHireMe/WhyHireMe";
import ProjectCTA from "@/components/projectCTA/projectCTA";

import { Portfolio } from "@/components/Portfolio/Portfolio";
import SlidingBanner from "@/components/slidingBanner/SlidingBanner";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <WorkExperience />
      <SlidingBanner/>
      <WhyHireMe />
          <SlidingBanner/>
      <Portfolio />
      <ProjectCTA />
    </div>
  );
}
