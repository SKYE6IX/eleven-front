import HeroBlock from "@/components/hero-block/HeroBlock";
import WhyUsBlock from "@/components/why-us-block/WhyUsBlock";

export default function Home() {
   return (
      <div>
         <div
            id="navigation-trigger"
            style={{ height: "40px", marginTop: "40px" }}
         />
         <HeroBlock />
         <WhyUsBlock />
         <div style={{ height: "40px", marginTop: "40px" }}>Hello world</div>
      </div>
   );
}
