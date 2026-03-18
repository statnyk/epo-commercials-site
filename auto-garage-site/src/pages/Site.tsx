import Header from "../components/layout/Header.tsx";
import Footer from "../components/layout/Footer.tsx";
import ScrollToFooterBtn from "../components/ui/ScrollToFooterBtn.tsx";
import Hero from "../components/sections/Hero.tsx";
import About from "../components/sections/About.tsx";
import Services from "../components/sections/Services.tsx";
import WhyChoose from "../components/sections/WhyChoose.tsx";
import OurCommitment from "../components/sections/OurCommitment.tsx";
import WorkingHours from "../components/sections/WorkingHours.tsx";
import Parts from "../components/sections/Parts.tsx";
import Contact from "../components/sections/Contact.tsx";

export default function Site() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <WhyChoose />
        <OurCommitment />
        <WorkingHours />
        <Parts limit={4} showViewMore />
        <Contact />
      </main>
      <Footer />
      <ScrollToFooterBtn />
    </>
  );
}
