import Header from "@/components/header";
import Hero from "@/components/hero";
import BookingWizard from "@/components/booking-wizard";
import Services from "@/components/services";
import USPs from "@/components/usps";
import About from "@/components/about";
import Testimonials from "@/components/testimonials";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <BookingWizard />
      <Services />
      <USPs />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
