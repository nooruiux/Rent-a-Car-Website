import { Hero } from "@/components/sections/Hero";
import { Navbar } from "@/components/sections/Navbar";
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
      </main>
    </>
  );
}
