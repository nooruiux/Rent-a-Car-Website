import { AppCta } from "@/components/sections/AppCta";
import { BookCars } from "@/components/sections/BookCars";
import { CarFind } from "@/components/sections/CarFind";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Navbar } from "@/components/sections/Navbar";
import { OfferBanner } from "@/components/sections/OfferBanner";
import { Statistics } from "@/components/sections/Statistics";
import { Testimonials } from "@/components/sections/Testimonials";
import { TopBar } from "@/components/sections/TopBar";

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-xs focus:bg-pure-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <TopBar />
      <Navbar />
      <main id="main">
        <Hero />
        <Statistics />
        <CarFind />
        <BookCars id="cars" variant="centered" />
        <OfferBanner />
        <Experience />
        <BookCars id="more-cars" variant="left" />
        <Testimonials />
        <Faq />
        <AppCta />
      </main>
      <Footer />
    </>
  );
}
