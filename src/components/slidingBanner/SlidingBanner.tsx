'use client'
import React from 'react'
import Image from 'next/image'

const bannerItems = [
  "User Reasearch",
  "UX/UI Design", 
  "App Design",
  "Dashboard Design",
  "Wireframing"
];

const SlidingBanner = () => {

  const  items = bannerItems
  const logo = "/star.svg"
  return (
    <div className="w-full h-[50px] bg-gradient-to-r from-[#4C7DFE] to-[#001959] overflow-hidden relative">
      <div className="absolute flex items-center h-full whitespace-nowrap">
        {/* First set for seamless looping */}
        <div className="flex items-center animate-[marquee_100s_linear_infinite]">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={`first-${i}`}>
              {items.map((item, index) => (
                <React.Fragment key={`first-item-${index}`}>
                  <span className="text-white text-4xl font-bruno-ace font-normal mx-8">{item}</span>
                  <Image 
                    src={logo}
                    alt="Logo" 
                    width={80} 
                    height={80} 
                    className="mx-8"
                    priority
                  />
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
        {/* Second identical set for seamless looping */}
        <div className="flex items-center animate-[marquee_100s_linear_infinite] ml-[100%]">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={`second-${i}`}>
              {items.map((item, index) => (
                <React.Fragment key={`second-item-${index}`}>
                  <span className="text-white text-4xl font-bruno-ace font-normal mx-8">{item}</span>
                  <Image 
                    src={logo}
                    alt="Logo" 
                    width={80} 
                    height={80} 
                    className="mx-8"
                    priority
                  />
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  )
}

export default SlidingBanner