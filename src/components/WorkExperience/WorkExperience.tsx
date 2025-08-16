'use client'
const experiences = [
  {
    company: "RW InfoTech Pvt. Ltd.",
    period: "Jan 2024 - May 2025", 
    position: "UI/UX Designer",
    description: "Involved in the design process of mobile applications, website, and visual appeal. Responsible for creating and designing user experience and visual appeal. Participated in brainstorming sessions to develop creative concepts and visual strategies."
  },
  {
    company: "Radial Code Intern",
    period: "Dec 2022 - Nov 2023",
    position: "UI/UX Designer Intern", 
    description: "Worked on multiple web and app design projects, gaining practical experience in user experience design. Collaborated with senior designers to develop prototypes and design systems, ensuring high-quality user experience."
  },
  {
    company: "Radial Code Pvt. Ltd",
    period: "Sep 2022 - Dec 2023",
    position: "UI/UX Designing Diploma",
    description: "Began learning the fundamentals of UI/UX design, including user research, wireframing, and visual design principles. Gained hands-on experience with design tools and methodologies, developing a strong foundation for professional UI/UX work. Friendly and responsive interface. Collaborated with fellow designers to develop prototypes and design systems, laying the foundation for professional UI/UX work."
  }
];

const WorkExperience = () => {
  return (
    <div className="bg-background py-12 md:py-[152px] px-4 sm:px-6 lg:px-8 w-full max-w-[1440px] mx-auto">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-[52px] font-bruno-ace font-normal leading-[110%] tracking-0 text-foreground">
            My <span style={{ background: 'linear-gradient(180deg, #4C7DFE 0%, #001959 100%)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              Work Experience
            </span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {experiences.map((experience, index) => (
            <div key={index} className="relative flex flex-col md:flex-row gap-4 md:gap-8 pb-6 last:pb-0">
              {/* Left Content */}
              <div className="w-full md:w-1/2 pr-0 md:pr-8">
                <h3 className="font-bruno-ace font-normal text-xl sm:text-2xl md:text-[32px] leading-[130%] tracking-0 text-[#00070E] mb-1">
                  {experience.company}
                </h3>
                <p className="text-muted-foreground" style={{ color: 'rgba(152, 162, 179, 1)', fontFamily: 'Bruno Ace', fontWeight: 400, fontStyle: 'normal', fontSize: '16px', lineHeight: '140%', letterSpacing: '0%' }}>
                  {experience.period}
                </p>
              </div>
              
              {/* Right Content */}
              <div className="w-full md:w-1/2 pl-0 md:pl-8">
                <h4 className="font-bruno-ace font-normal text-primary text-lg sm:text-xl md:text-[24px] leading-[140%] tracking-0 mb-2">
                  {experience.position}
                </h4>
                <p className="text-muted-foreground" style={{ fontFamily:  "Plus Jakarta Sans, sans-serif" , fontWeight: 400, fontStyle: 'normal', fontSize: '14px', lineHeight: '150%', letterSpacing: '0%' }}>
                  {experience.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
