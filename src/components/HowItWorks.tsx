import {
  Calendar,
  Car,
  CheckCircle2,
  Headphones,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      stepNumber: "1",
      title: "Choose Location",
      desc: "Select your pick-up location from multiple cities across the UK.",
      icon: <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-[#3563E9]" />,
    },
    {
      id: "02",
      stepNumber: "2",
      title: "Pick-up Date",
      desc: "Choose your preferred date and time that fits your travel plan.",
      icon: <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-[#3563E9]" />,
    },
    {
      id: "03",
      stepNumber: "3",
      title: "Book your car",
      desc: "Confirm your booking online and get ready for your luxury journey.",
      icon: <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#3563E9]" />,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="w-full bg-white pt-10 sm:pt-16 md:pt-36 pb-16 md:pb-20 px-5 sm:px-8 md:px-16 relative z-10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Mobile Value Pillars Bar */}
        <div className="lg:hidden grid grid-cols-3 gap-2 pb-6 pt-1 border-b border-slate-100 mb-8 text-center">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-9 h-9 rounded-full bg-blue-50 text-[#3563E9] flex items-center justify-center shadow-2xs border border-blue-100/60">
              <Car className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-[#0B132A] leading-tight">
              Wide Range <br />
              of Vehicles
            </span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="w-9 h-9 rounded-full bg-blue-50 text-[#3563E9] flex items-center justify-center shadow-2xs border border-blue-100/60">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-[#0B132A] leading-tight">
              Safe & Secure <br />
              Booking
            </span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="w-9 h-9 rounded-full bg-blue-50 text-[#3563E9] flex items-center justify-center shadow-2xs border border-blue-100/60">
              <Headphones className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-[#0B132A] leading-tight">
              24/7 Customer <br />
              Support
            </span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-[#0B132A] font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight mb-2 sm:mb-3">
            How it works
          </h2>
          <p className="text-[#596780] font-normal text-xs sm:text-base md:text-lg max-w-[540px] mx-auto leading-relaxed">
            Rent a car in 3 simple steps
          </p>
        </div>

        {/* 3 Step Process Container */}
        <div className="relative">
          {/* Connecting Wavy Arrow 1 (Desktop) */}
          <div className="hidden md:block absolute top-6 left-[21%] lg:left-[22%] xl:left-[23%] w-[24%] lg:w-[23%] xl:w-[22%] max-w-[280px] pointer-events-none z-0">
            <Image
              src="/line-arow.svg"
              alt="Connecting Line"
              width={356}
              height={85}
              className="w-full h-auto object-contain opacity-40 hover:opacity-60 transition-opacity"
            />
          </div>

          {/* Connecting Wavy Arrow 2 (Desktop) */}
          <div className="hidden md:block absolute top-6 left-[55%] lg:left-[55.5%] xl:left-[56%] w-[24%] lg:w-[23%] xl:w-[22%] max-w-[280px] pointer-events-none z-0">
            <Image
              src="/line-arow.svg"
              alt="Connecting Line"
              width={356}
              height={85}
              className="w-full h-auto object-contain opacity-40 hover:opacity-60 transition-opacity"
            />
          </div>

          {/* Steps Grid: Horizontal on Desktop, Clean Step Rows on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8 relative z-10">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex md:flex-col items-center md:text-center text-left gap-3.5 md:gap-0 px-3 md:px-4 bg-slate-50/70 md:bg-transparent p-3.5 md:p-0 rounded-[10px] md:rounded-none border md:border-none border-slate-100"
              >
                {/* Step Icon Container */}
                <div className="w-11 h-11 sm:w-16 sm:h-16 md:w-[100px] md:h-[100px] sm:md:w-[110px] sm:md:h-[110px] bg-blue-50 md:bg-[#F6F7F9] rounded-[10px] md:rounded-[24px] lg:rounded-[28px] flex items-center justify-center md:mb-7 shrink-0 shadow-2xs md:shadow-xs border border-blue-100/50 md:border-none">
                  {step.icon}
                </div>

                <div className="flex-1">
                  {/* Step Title */}
                  <h3 className="text-[#0B132A] font-bold text-xs sm:text-xl md:text-2xl tracking-tight leading-tight md:leading-9 mb-1 md:mb-3">
                    <span className="md:hidden">{step.stepNumber}. </span>
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-[#596780] font-normal text-[11px] sm:text-sm leading-relaxed md:leading-[24px] max-w-[290px] md:mx-auto">
                    {step.desc}
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
