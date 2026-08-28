import { Headphones, MapPin, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Customer Support",
      desc: "Extremely responsive customer support provided by the team at best car rental UK.",
      icon: <Headphones className="w-5 h-5 sm:w-6 sm:h-6 text-[#3563E9]" />,
    },
    {
      title: "Best Price Guarantted",
      desc: "Extremely best prices for all category people offered at the best car rental UK.",
      icon: <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#3563E9]" />,
    },
    {
      title: "Many Location",
      desc: "Extremely the best location and available near the big cities. Just visit best car rental UK.",
      icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#3563E9]" />,
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="w-full bg-white py-12 sm:py-16 md:py-20 px-5 sm:px-8 md:px-16"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Consistent Section Heading */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-[#0B132A] font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight mb-2 sm:mb-3">
            Why choose us
          </h2>
          <p className="text-[#596780] font-normal text-xs sm:text-base md:text-lg max-w-[540px] mx-auto leading-relaxed">
            A high-performing web-based car rental system for any rent-a-car company and website
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Graphic Showcase */}
          <div className="lg:col-span-6 w-full">
            <div className="w-full h-[260px] sm:h-[400px] md:h-[460px] lg:h-[490px] rounded-[10px] relative overflow-hidden shadow-[0px_10px_30px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col justify-end p-5 sm:p-9 group">
              {/* Background Image */}
              <Image
                src="/why-choose-us.jpg"
                alt="SwiftRide Verified Fleet - Safe Cars, Smoother Journeys"
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 700px"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132A]/85 via-[#0B132A]/30 to-transparent z-1" />

              {/* Bottom Left Card Content */}
              <div className="relative z-10 space-y-2">
                {/* Shield badge */}
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-[8px] bg-[#3563E9] flex items-center justify-center text-white shadow-md border border-blue-400/30">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>

                {/* Card Title & Subtitle */}
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight drop-shadow-sm leading-tight">
                    SwiftRide Verified Fleet
                  </h3>
                  <p className="text-xs sm:text-base font-normal text-white/85 tracking-wide mt-0.5">
                    Safe Cars. Smoother Journeys.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature List */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 sm:gap-5 group p-3 sm:p-0 bg-slate-50/70 sm:bg-transparent rounded-[10px] sm:rounded-none border sm:border-none border-slate-100"
              >
                <div className="w-10 h-10 sm:w-[51px] sm:h-[51px] bg-blue-50 sm:bg-[#3563E9]/10 group-hover:bg-[#3563E9] group-hover:text-white text-[#3563E9] rounded-[8px] flex items-center justify-center shrink-0 shadow-2xs transition-colors duration-200">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#0B132A] text-sm sm:text-xl md:text-[22px] tracking-tight leading-tight sm:leading-[33px] mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-[#596780] font-normal text-xs sm:text-base leading-relaxed sm:leading-7 max-w-[440px]">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
