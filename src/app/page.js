import NewArrivals from "@/components/BookRender/NewArrivals";
import Hero from "@/components/hero/Hero";
import RegisterPage from "./register/page";

export default function Home() {
  return (
    <>
      <Hero />
      <NewArrivals />
      <RegisterPage />
    </>
  );
}
