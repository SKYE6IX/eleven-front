import HeroBlock from "@/components/hero-block/HeroBlock";
import WhyUsBlock from "@/components/why-us-block/WhyUsBlock";
import ProjectsShowcase from "@/components/projects-showcase/ProjectsShowcase";
import ServiceListBlock from "@/components/service-list-block/ServiceListBlock";
import AboutUsBlock from "@/components/about-us-block/AboutUsBlock";
import FAQBlock from "@/components/faq-block/FAQBlock";

export default function Home() {
   return (
      <div>
         <HeroBlock />
         <WhyUsBlock />
         <ProjectsShowcase />
         <ServiceListBlock />
         <AboutUsBlock />
         <FAQBlock />
      </div>
   );
}
