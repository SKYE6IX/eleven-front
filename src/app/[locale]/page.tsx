import HeroBlock from "@/components/hero-block/HeroBlock";
import WhyUsBlock from "@/components/why-us-block/WhyUsBlock";
import ProjectsShowcase from "@/components/projects-showcase/ProjectsShowcase";

export default function Home() {
   return (
      <div>
         <HeroBlock />
         <WhyUsBlock />
         <ProjectsShowcase />
      </div>
   );
}
