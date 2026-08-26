import { Headphones, ShieldCheck, MapPin } from "lucide-react";

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
        {/* Section Heading - No uppercase */}
        <div className="text-center mb-16">
          <h2 className="text-[#0B132A] font-medium text-3xl md:text-5xl tracking-tight leading-[1.2] mb-4">
            Why choose us
          </h2>
          <p className="text-[#596780] font-normal text-base md:text-lg max-w-[530px] mx-auto leading-[27px]">
            A high-performing web-based car rental system for any rent-a-car company and website
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Graphic Showcase - Exact wireframe rounded-[10px] */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[566px] h-[360px] md:h-[440px] bg-[#1E3A8A] rounded-[10px] relative overflow-hidden flex flex-col items-center justify-center p-8 shadow-lg">
              <svg
                className="w-48 md:w-64 h-32 md:h-40 text-white drop-shadow-xl mb-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
              </svg>
              <div className="text-center">
                <span className="text-white font-bold text-xl block">SwiftRide Verified Fleet</span>
                <span className="text-white/80 text-sm">Safe & Comfortable Rental</span>
              </div>
            </div>
          </div>

          {/* Right Feature List - Exact wireframe w-[51px] h-[51px] rounded-[10px] */}
          <div className="lg:col-span-6 space-y-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-5">
                <div className="w-[51px] h-[51px] bg-[#3563E9]/10 rounded-[10px] flex items-center justify-center shrink-0 shadow-sm">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-[#0B132A] text-xl md:text-[22px] tracking-tight leading-[33px] mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-[#596780] font-normal text-base leading-7 max-w-[432px]">
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
