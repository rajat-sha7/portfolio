'use client'

import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const skills = [
  'User Research',
  'UX Design', 
  'App Design',
  'Dashboard',
  'Wireframing'
];

const stats = [
  {
    value: '1.5+',
    label: 'Years of Experience'
  },
  {
    value: '6+', 
    label: 'Completed Projects'
  },
  {
    value: '2+',
    label: 'Ongoing Projects'
  }
];

const WhyHireMe = () => {
  return (
    <div className="bg-[#F2F4F7] py-8 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-18 items-center">
          {/* Profile Image - Order first on mobile */}
          <div className="order-1 lg:order-none flex justify-center lg:justify-end">
            <Image 
              src="/Footer/hero2.svg" 
              alt="" 
              width={516} 
              height={613}
              className="w-full max-w-[300px] md:max-w-[400px] lg:w-auto"
            />
          </div>

          {/* Content */}
          <div className="order-2 lg:order-none space-y-4 md:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-[52px] font-bruno-ace font-normal leading-[110%] tracking-0 text-foreground">
              Why <span style={{ background: 'linear-gradient(180deg, #4C7DFE 0%, #001959 100%)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                Hire Me
              </span> ?
            </h2>
            
            <p 
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              className="text-#00070E text-sm sm:text-[16px] font-plus-jakarta-display font-normal leading-[150%] tracking-0"
            >
              With a strong foundation in UI/UX design and frontend development, I excel at creating user-centered digital products. I&apos;m passionate about solving design challenges and delivering meaningful user experiences that help businesses turn ideas into successful digital experiences.
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 md:pt-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-left">
                  <div className="font-bruno-ace font-normal text-2xl sm:text-[32px] leading-[130%] tracking-0 mb-1" style={{ background: 'linear-gradient(180deg, #4C7DFE 0%, #001959 100%)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                    {stat.value}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyHireMe;