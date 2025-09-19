"use client";
import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HyphenIcon from "@/components/icons/HyphenIcon";
import "./about-us.scss";

type Props = {
   getMoveXAndStartScale: (headingText: HTMLDivElement) => {
      moveX: number;
      startScale: number;
   };
};
function WhoBelieve({ getMoveXAndStartScale }: Props) {
   const containerRef = useRef<HTMLDivElement>(null);
   const headingTextRef = useRef<HTMLHeadingElement>(null);
   const tl = useRef<GSAPTimeline>(null);
   const tl2 = useRef<GSAPTimeline>(null);
   const t = useTranslations("AboutUsPage");
   useGSAP(
      () => {
         const mm = gsap.matchMedia();
         mm.add("(min-width: 1200px)", () => {
            if (!headingTextRef.current) return;
            const { moveX, startScale } = getMoveXAndStartScale(
               headingTextRef.current
            );
            gsap.set(headingTextRef.current, {
               scale: startScale,
               x: moveX,
            });
            if (tl.current) {
               tl.current.kill();
            }
            tl.current = gsap.timeline({
               scrollTrigger: {
                  trigger: containerRef.current,
                  start: "camp(top 80px)",
                  end: "+=" + containerRef.current?.offsetHeight,
                  scrub: 1,
                  pin: true,
               },
            });
            tl.current.to(headingTextRef.current, { scale: 1, duration: 1 });
            tl.current.to(
               headingTextRef.current,
               { x: 0, duration: 1 },
               "-=0.9"
            );
            tl.current.from(
               ".about-us-page__who-believe-heading-icon",
               {
                  x: 150,
                  opacity: 0,
               },
               "-=0.15"
            );
            tl.current.from(".about-us-page__who-believe-text", {
               y: 150,
               opacity: 0,
               stagger: 0.2,
            });
         });
         mm.add("(max-width: 1024px)", () => {
            if (tl2.current) {
               tl2.current.kill();
            }
            tl2.current = gsap.timeline();
            tl2.current
               .from(headingTextRef.current, {
                  duration: 1,
                  x: 150,
                  opacity: 0,
               })
               .from(
                  ".about-us-page__who-believe-heading-icon",
                  {
                     duration: 1,
                     x: 50,
                     opacity: 0,
                  },
                  ">-=0.5"
               )
               .from(
                  ".about-us-page__who-believe-text",
                  {
                     y: 100,
                     opacity: 0,
                     stagger: 0.2,
                  },
                  "<"
               );
         });
      },
      { scope: containerRef }
   );
   return (
      <section className="about-us-page__who-believe" ref={containerRef}>
         <div className="about-us-page__who-believe-content-wrapper">
            <div className="about-us-page__who-believe-heading-wrapper">
               <h3
                  className="about-us-page__who-believe-heading-text"
                  ref={headingTextRef}
               >
                  {t("whoBelieveBlock.headingText")}
               </h3>
               <span className="about-us-page__who-believe-heading-icon">
                  <HyphenIcon />
               </span>
            </div>
            <div className="about-us-page__who-believe-text-wrapper">
               <p
                  className="about-us-page__who-believe-text"
                  data-testid="about-us-page-text"
               >
                  {t("whoBelieveBlock.text1")}
               </p>
               <p
                  className="about-us-page__who-believe-text"
                  data-testid="about-us-page-text"
               >
                  {t("whoBelieveBlock.text2")}
               </p>
            </div>
         </div>
      </section>
   );
}

export default WhoBelieve;
