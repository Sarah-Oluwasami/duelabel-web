import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { StackMarquee } from "@/components/sections/stack-marquee";
import { Services } from "@/components/sections/services";
import { Why } from "@/components/sections/why";
import { Process } from "@/components/sections/process";
import { Work } from "@/components/sections/work";
import { Values } from "@/components/sections/values";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { FloatingButtons } from "@/components/sections/floating-buttons";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StackMarquee />
        {/* Services and Why share one white → navy gradient so they flow into each other. */}
        <div className="ground relative [&>section]:relative [&>section]:z-[1]">
          <Services />
          <Why />
        </div>
        <Process />
        <Work />
        <Values />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
