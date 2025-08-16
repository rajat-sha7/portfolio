'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'Instagram Management Website',
    category: 'website',
    image: '/Footer/instamanagement.svg'
  },
  {
    id: '2',
    title: 'Green Landing Page',
    category: 'landing',
    image: '/Footer/greenlanding.svg'
  },
  {
    id: '3',
    title: 'Financial Advisory Homepage',
    category: 'website',
    image: '/Footer/financial.svg'
  },
  {
    id: '4',
    title: 'N80 Landing Page',
    category: 'landing',
    image: '/Footer/ngoLanding.svg'
  },
  {
    id: '5',
    title: 'Findkare Dashboard Design',
    category: 'dashboard',
    image: '/Footer/findkare.svg'
  },
  {
    id: '6',
    title: 'Findkare Logo',
    category: 'design',
    image: '/Footer/findkare2.svg'
  }
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'website', label: 'Websites' },
  { id: 'dashboard', label: 'Dashboards' },
  { id: 'design', label: 'Mobile App' },
  { id: 'mobile', label: 'App Design' }
];

export const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div id="resume" className="bg-background py-12 md:py-[152px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1320px] px-4 md:px-5 mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-[52px] font-bruno-ace font-normal leading-[110%] tracking-0 text-foreground mb-4 md:mb-6 text-left">
            Let&apos;s have a look at my{' '}
            <span className="bg-[linear-gradient(180deg,#4C7DFE_0%,#001959_100%)] text-transparent bg-clip-text">Portfolio</span>
          </h1>
          
          {/* Navigation */}
          <div className="flex flex-wrap justify-start pb-6 md:pb-[52px] gap-2 sm:gap-4 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                onClick={() => setActiveCategory(category.id)}
                className={`
                  w-full sm:w-[180px] md:w-[229px] h-12 md:h-[58px] rounded-[150px] opacity-100 transition-all duration-200 hover:bg-portfolio-card-hover
                  ${activeCategory === category.id 
                    ? 'bg-[linear-gradient(180deg,#4C7DFE_0%,#001959_100%)] text-transparent bg-clip-text font-medium' 
                    : 'text-portfolio-nav hover:text-portfolio-nav-active'
                  }
                `}
                style={{
                  background: activeCategory === category.id 
                    ? 'linear-gradient(180deg, rgba(76, 125, 254, 0.32) 0%, rgba(0, 25, 89, 0.32) 100%)' 
                    : '#F0F0F0',
                  fontFamily: 'Bruno Ace',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '16px md:text-[20px]',
                  lineHeight: '140%',
                  letterSpacing: '0%',
                  padding: '8px 16px md:15px 32px',
                  gap: '8px md:10px',
                }}
              >
                <span className={activeCategory === category.id ? "bg-[linear-gradient(180deg,#4C7DFE_0%,#001959_100%)] text-transparent bg-clip-text" : ""}>
                {category.label}
                </span>
              
              </Button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {filteredItems.map((item) => (
            <Card 
              key={item.id}
              className="group overflow-hidden border-border p-2 md:p-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={596}
                  height={351}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-[8px]"
                  objectFit="cover"
                />
              </div>
              <div className="p-3 md:p-5">
                <h3 className="font-bruno-ace font-normal text-foreground text-lg md:text-[24px] leading-[140%] tracking-0">
                  {item.title}
                </h3>
              </div>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-8 md:mt-12">
          <Button className="font-bruno-ace font-normal text-lg md:text-[24px] leading-[140%] tracking-0 bg-gradient-to-b from-[#4C7DFE] to-[#001959] w-[180px] md:w-[242px] h-12 md:h-[64px] rounded-[50px]">
            <span className="text-sm md:text-[16px] leading-[150%] bg-clip-text text-white">Hire me</span>
          </Button>
        </div>
      </div>
    </div>
  );
};