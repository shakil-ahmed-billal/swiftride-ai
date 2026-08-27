import Link from "next/link";
import Image from "next/image";

export default function PromoBanners() {
  return (
    <section className="w-full bg-[#F6F7F9] py-16 px-6 md:px-16">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Banner 1 - The Best Platform for Car Rental with car-image-left.jpg */}
        <div className="rounded-[10px] p-8 sm:p-10 text-white relative overflow-hidden flex flex-col justify-between min-h-[340px] sm:min-h-[360px] shadow-[0px_10px_30px_rgba(0,0,0,0.06)] group border border-slate-100/10">
          {/* Background Image */}
          <Image
            src="/car-image-left.jpg"
            alt="The Best Platform for Car Rental"
            fill
            priority
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 1024px) 100vw, 700px"
          />

          {/* Left Text Content */}
          <div className="relative z-10 max-w-[310px] space-y-3">
            <h3 className="font-bold text-2xl sm:text-3xl text-white leading-tight tracking-tight">
              The Best Platform for Car Rental
            </h3>
            <p className="text-white/90 text-sm sm:text-base font-normal leading-relaxed">
              Ease of doing a car rental safely and reliably. Of course at a low price.
            </p>
            <div className="pt-3">
              <Link
                href="#rental-details"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-[#3563E9] hover:bg-[#254EDB] text-white font-semibold text-sm rounded-[5px] shadow-sm transition-all active:scale-95"
              >
                Rental Car
              </Link>
            </div>
          </div>
        </div>

        {/* Banner 2 - Easy way to rent a car at a low price with car-image-right.jpg */}
        <div className="rounded-[10px] p-8 sm:p-10 text-white relative overflow-hidden flex flex-col justify-between min-h-[340px] sm:min-h-[360px] shadow-[0px_10px_30px_rgba(0,0,0,0.06)] group border border-slate-100/10">
          {/* Background Image */}
          <Image
            src="/car-image-right.jpg"
            alt="Easy way to rent a car at a low price"
            fill
            priority
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 1024px) 100vw, 700px"
          />

          {/* Left Text Content */}
          <div className="relative z-10 max-w-[310px] space-y-3">
            <h3 className="font-bold text-2xl sm:text-3xl text-white leading-tight tracking-tight">
              Easy way to rent a car at a low price
            </h3>
            <p className="text-white/90 text-sm sm:text-base font-normal leading-relaxed">
              Providing cheap car rental services and safe and comfortable facilities.
            </p>
            <div className="pt-3">
              <Link
                href="#rental-details"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-[#54A6FF] hover:bg-[#358be8] text-white font-semibold text-sm rounded-[5px] shadow-sm transition-all active:scale-95"
              >
                Rental Car
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
