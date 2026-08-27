import Image from "next/image";
import { Headphones, ShieldCheck, MapPin, Shield } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Customer Support",
      desc: "Extremely responsive customer support provided by the team at best car rental UK.",
      icon: <Headphones className="w-6 h-6 text-[#3563E9]" />,
    },
    {
      title: "Best Price Guarantted",
      desc: "Extremely best prices for all category people offered at the best car rental UK.",
      icon: <ShieldCheck className="w-6 h-6 text-[#3563E9]" />,
    },
    {
      title: "Many Location",
      desc: "Extremely the best location and available near the big cities. Just visit best car rental UK.",
      icon: <MapPin className="w-6 h-6 text-[#3563E9]" />,
    },
  ];

  return (
    <section id="why-choose-us" className="w-full bg-white py-20 px-6 md:px-16">
      <div className="max-w-[1440px] mx-auto">
        {/* Consistent Section Heading */}
        <div className="text-center mb-14 sm:mb-16">
          <h2 className="text-[#0B132A] font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight mb-3 sm:mb-4">
            Why choose us
          </h2>
          <p className="text-[#596780] font-normal text-sm sm:text-base md:text-lg max-w-[540px] mx-auto leading-relaxed">
            A high-performing web-based car rental system for any rent-a-car company and website
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Graphic Showcase - Full Column Width */}
          <div className="lg:col-span-6 w-full">
            <div className="w-full h-[360px] sm:h-[420px] md:h-[460px] lg:h-[490px] rounded-[18px] sm:rounded-[22px] relative overflow-hidden shadow-[0px_15px_40px_rgba(0,0,0,0.12)] border border-slate-100 flex flex-col justify-end p-7 sm:p-9 group">
              {/* Background Image - Full Width & Height */}
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
              <div className="relative z-10 space-y-2.5">
                {/* Glowing Blue Squircle Badge */}
                <div className="w-12 h-12 rounded-[14px] bg-[#3563E9] flex items-center justify-center text-white shadow-[0_4px_20px_rgba(53,99,233,0.5)] border border-blue-400/30">
                  <Shield className="w-6 h-6 fill-white text-white" />
                </div>

                {/* Card Title & Subtitle */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-sm">
                    SwiftRide Verified Fleet
                  </h3>
                  <p className="text-sm sm:text-base font-normal text-white/85 tracking-wide mt-0.5">
                    Safe Cars. Smoother Journeys.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Feature List */}
          <div className="lg:col-span-6 space-y-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-5 group">
                <div className="w-[52px] h-[52px] bg-[#3563E9]/10 group-hover:bg-[#3563E9] group-hover:text-white text-[#3563E9] rounded-[12px] flex items-center justify-center shrink-0 shadow-xs transition-colors duration-200">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#0B132A] text-xl md:text-[22px] tracking-tight leading-[33px] mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-[#596780] font-normal text-base leading-7 max-w-[440px]">
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
