import FaqSection from "@/components/FaqSection";
import { FeaturedJobs } from "@/components/FeaturedJobs";
import { FilterSection } from "@/components/FilterSection";
import Footer from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import SuccessStories from "@/components/SuccessStories";

export default function Home() {
  return (
    <main className="inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] space-y-5 mx-auto">
      <HeroSection />
      <FilterSection />
      <FeaturedJobs />
      <HowItWorks />
      <SuccessStories />
      <FaqSection />
      <Footer />
    </main>
  );
}
