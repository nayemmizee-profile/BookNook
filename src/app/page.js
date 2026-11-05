import NewArrivals from "@/components/BookRender/NewArrivals";
import Hero from "@/components/hero/Hero";
import HomeExtraSections from "@/components/HomeExtra/HomeExtraSec";
import ReadingCorner from "@/components/ReadingCorner/ReadingCorner";

export default function Home() {
  return (
    <>
      <Hero />
      <NewArrivals />
      <HomeExtraSections />
      <ReadingCorner />
    </>
  );
}
