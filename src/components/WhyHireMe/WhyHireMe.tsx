'use client'

import Image from 'next/image';
import Reveal from '@/components/motion/Reveal';
import Tilt from '@/components/motion/Tilt';
import CountUp from '@/components/motion/CountUp';

const stats = [
  {
    value: '4+',
    label: 'Years of Experience'
  },
  {
    value: '25+',
    label: 'Projects on GitHub'
  },
  {
    value: '10+',
    label: 'Live Deployments'
  }
];

const WhyHireMe = () => {
  return (
    <div className="bg-[#F2F4F7] py-8 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-18 items-center">
          {/* Profile Image - Order first on mobile */}
          <div className="order-1 lg:order-none w-full flex justify-center lg:justify-end">
            {/* Light circle behind the photo; the head rises above the circle's top edge */}
            <Reveal variant="left" className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[460px]">
            <Tilt max={8} glare={false}>
            <div className="relative w-full aspect-[517/614] [transform-style:preserve-3d]">
              <div className="absolute inset-x-0 bottom-0 aspect-square rounded-full bg-[linear-gradient(180deg,rgba(76,125,254,0.25)_0%,rgba(0,25,89,0.25)_100%)] [transform:translateZ(-30px)]" />
              <div className="absolute inset-x-[8%] bottom-[4%] aspect-square rounded-full border-2 border-dashed border-[#4C7DFE]/30 animate-[spin_30s_linear_infinite] [transform:translateZ(-15px)]" />
              <div className="absolute inset-0 overflow-hidden rounded-b-[50%_42%] [transform:translateZ(40px)]">
                <Image
                  src="/avatar.png"
                  alt="Rajat Sharma"
                  fill
                  sizes="(min-width: 1024px) 460px, (min-width: 768px) 400px, 300px"
                  className="object-contain object-bottom"
                />
              </div>
            </div>
            </Tilt>
            </Reveal>
          </div>

          {/* Content */}
          <Reveal variant="right" delay={120} className="order-2 lg:order-none space-y-4 md:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-[52px] font-bruno-ace font-normal leading-[110%] tracking-0 text-foreground">
              Why <span style={{ background: 'linear-gradient(180deg, #4C7DFE 0%, #001959 100%)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                Hire Me
              </span> ?
            </h2>
            
            <p 
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              className="text-[#00070E] text-sm sm:text-[16px] font-plus-jakarta-display font-normal leading-[150%] tracking-0"
            >
              I build fast, accessible frontends that are easy for teams to maintain and for content editors to use. From server-rendered Next.js and Nuxt apps to headless CMS integrations with visual editing and previews, I care about Core Web Vitals, clean component architecture and shipping quickly, with AI-assisted workflows that speed up delivery without cutting corners.
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 md:pt-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-left">
                  <div className="font-bruno-ace font-normal text-2xl sm:text-[32px] leading-[130%] tracking-0 mb-1" style={{ background: 'linear-gradient(180deg, #4C7DFE 0%, #001959 100%)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                    <CountUp value={stat.value} />
                  </div>
                  <div 
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    className="text-xs sm:text-sm md:text-[16px] text-[#00070E] font-plus-jakarta-display font-normal leading-[150%] tracking-0"
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default WhyHireMe;