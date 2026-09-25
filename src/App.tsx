import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import WhyUs from "./components/WhyUs";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { business } from "./data/content";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="relative min-h-screen bg-sand">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-grain opacity-60 [background-size:22px_22px]"
      />

      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Services onSelect={setActiveCategory} />
          <Gallery activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          <WhyUs />
          <About />
          <Contact />
        </main>
        <Footer />

        <a
          href={business.phoneHref}
          aria-label="Καλέστε μας"
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-cream shadow-soft transition-transform hover:scale-105 lg:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 015 6a2 2 0 012-2z" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}
