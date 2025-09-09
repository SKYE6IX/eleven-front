import HeroBlock from "@/components/hero-block/HeroBlock";
import WhyUsBlock from "@/components/why-us-block/WhyUsBlock";
import ProjectsShowcase from "@/components/projects-showcase/ProjectsShowcase";
import ServiceListBlock from "@/components/service-list-block/ServiceListBlock";

export default function Home() {
   return (
      <div>
         <HeroBlock />
         <WhyUsBlock />
         <ProjectsShowcase />
         <ServiceListBlock />
      </div>
   );
}
