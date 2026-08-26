import Link from "next/link";

export default function PromoBanners() {
  return (
    <section className="w-full bg-[#F6F7F9] py-16 px-6 md:px-16">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Banner 1 - Exact wireframe rounded-[10px] */}
        <div className="bg-gradient-to-br from-[#3563E9] to-[#1E3A8A] rounded-[10px] p-8 md:p-10 text-white relative overflow-hidden flex flex-col justify-between min-h-[300px] shadow-lg">
          <div className="relative z-10 max-w-[300px]">
            <h3 className="font-bold text-2xl md:text-3xl leading-tight mb-3">
              The Best Platform for Car Rental
            </h3>
            <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6">
              Ease of doing a car rental safely and reliably. Of course at a low price.
            </p>
            <Link
              href="#booking"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#3563E9] hover:bg-white/90 font-semibold text-sm rounded shadow transition-all"
            >
              Rental Car
            </Link>
          </div>

          <div className="absolute right-[-20px] bottom-[-10px] w-64 md:w-80 opacity-40 pointer-events-none">
            <svg className="w-full h-auto text-white drop-shadow-2xl" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
            </svg>
          </div>
        </div>

        {/* Banner 2 - Exact wireframe rounded-[10px] */}
        <div className="bg-[#1E3A8A] rounded-[10px] p-8 md:p-10 text-white relative overflow-hidden flex flex-col justify-between min-h-[300px] shadow-lg">
          <div className="relative z-10 max-w-[300px]">
            <h3 className="font-bold text-2xl md:text-3xl leading-tight mb-3">
              Easy way to rent a car at a low price
            </h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6">
              Providing cheap car rental services and safe and comfortable facilities.
            </p>
            <Link
              href="#booking"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#1E3A8A] hover:bg-white/90 font-semibold text-sm rounded shadow transition-all"
            >
              Rental Car
            </Link>
          </div>

          <div className="absolute right-[-20px] bottom-[-10px] w-64 md:w-80 opacity-40 pointer-events-none">
            <svg className="w-full h-auto text-white drop-shadow-2xl" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
