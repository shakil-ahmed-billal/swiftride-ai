import { MapPin, Calendar, CheckCircle2 } from "lucide-react";

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
    <section id="how-it-works" className="w-full bg-white pt-28 md:pt-36 pb-20 px-6 md:px-16 relative z-10">
      <div className="max-w-[1440px] mx-auto text-center">
        {/* Section Heading - No uppercase */}
        <h2 className="text-[#0B132A] font-medium text-3xl md:text-5xl tracking-tight leading-[1.2] mb-4">
          How it works
        </h2>
        <p className="text-[#596780] font-normal text-base md:text-lg max-w-[530px] mx-auto mb-16 leading-[27px]">
          A high-performing web-based car rental system for any rent-a-car company and website
        </p>

        {/* 3 Step Process Cards - Exact wireframe rounded-[30px] */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-center">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center relative z-10 px-4">
              {/* Step Icon Badge with exact wireframe rounded-[30px] and subtle blue tint */}
              <div className="w-[106px] h-[106px] bg-[#3563E9]/10 rounded-[30px] flex items-center justify-center mb-6 shadow-sm">
                {step.icon}
              </div>

              {/* Step Title - No uppercase */}
              <h3 className="text-[#0B132A] font-semibold text-2xl tracking-tight leading-9 mb-3">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-[#596780] font-normal text-sm leading-[24.5px] max-w-[280px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
