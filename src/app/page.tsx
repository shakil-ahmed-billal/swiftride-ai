import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import PopularCars from "@/components/PopularCars";
import WhyChooseUs from "@/components/WhyChooseUs";
import PromoBanners from "@/components/PromoBanners";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* Integrated Header / Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1 w-full flex flex-col">
        {/* Hero Section with Floating Search Widget */}
        <Hero />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Most Popular Car Rental Deals Grid */}
        <PopularCars />

        {/* Why Choose Us Features */}
        <WhyChooseUs />

        {/* Promotional Banners */}
        <PromoBanners />

        {/* Happy Customer Reviews */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
