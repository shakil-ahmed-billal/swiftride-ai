import { MapPin, Calendar, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Choose Location",
      desc: "Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.",
      icon: <MapPin className="w-8 h-8 text-[#3563E9]" />,
    },
    {
      id: "02",
      title: "Pick-up Date",
      desc: "Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.",
      icon: <Calendar className="w-8 h-8 text-[#3563E9]" />,
    },
    {
      id: "03",
      title: "Book your car",
      desc: "Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.",
      icon: <CheckCircle2 className="w-8 h-8 text-[#3563E9]" />,
    },
  ];

  return (
    <section id="how-it-works" className="w-full bg-white pt-28 md:pt-36 pb-20 px-6 md:px-16 relative z-10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto text-center">
        {/* Section Heading */}
        <div className="text-center mb-14 sm:mb-16">
          <h2 className="text-[#0B132A] font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight mb-3 sm:mb-4">
            How it works
          </h2>
          <p className="text-[#596780] font-normal text-sm sm:text-base md:text-lg max-w-[540px] mx-auto leading-relaxed">
            A high-performing web-based car rental system for any rent-a-car company and website
          </p>
        </div>

        {/* 3 Step Process Container with Connecting Wavy Line Arrows */}
        <div className="relative">
          {/* Connecting Wavy Arrow 1: Between Step 1 & Step 2 */}
          <div className="hidden md:block absolute top-6 left-[21%] lg:left-[22%] xl:left-[23%] w-[24%] lg:w-[23%] xl:w-[22%] max-w-[280px] pointer-events-none z-0">
            <Image
              src="/line-arow.svg"
              alt="Connecting Line"
              width={356}
              height={85}
              className="w-full h-auto object-contain opacity-40 hover:opacity-60 transition-opacity"
            />
          </div>

          {/* Connecting Wavy Arrow 2: Between Step 2 & Step 3 */}
          <div className="hidden md:block absolute top-6 left-[55%] lg:left-[55.5%] xl:left-[56%] w-[24%] lg:w-[23%] xl:w-[22%] max-w-[280px] pointer-events-none z-0">
            <Image
              src="/line-arow.svg"
              alt="Connecting Line"
              width={356}
              height={85}
              className="w-full h-auto object-contain opacity-40 hover:opacity-60 transition-opacity"
            />
          </div>

          {/* 3 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 relative z-10">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex flex-col items-center text-center px-4"
              >
                {/* Step Icon Container */}
                <div className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] bg-[#F6F7F9] rounded-[24px] sm:rounded-[28px] flex items-center justify-center mb-7 shadow-xs">
                  {step.icon}
                </div>

                {/* Step Title */}
                <h3 className="text-[#0B132A] font-bold text-xl sm:text-2xl tracking-tight leading-9 mb-3">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-[#596780] font-normal text-sm leading-[24px] max-w-[290px] mx-auto">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
