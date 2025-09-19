"use client";
import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import HyphenIcon from "@/components/icons/HyphenIcon";
import logo from "./logo.webp";
import "./about-us.scss";

type Props = {
   getMoveXAndStartScale: (headingText: HTMLDivElement) => {
      moveX: number;
      startScale: number;
   };
};
function WhoWeAre({ getMoveXAndStartScale }: Props) {
   const containerRef = useRef<HTMLDivElement>(null);
   const headingTextRef = useRef<HTMLHeadingElement>(null);
   const tl = useRef<GSAPTimeline>(null);
   const tl2 = useRef<GSAPTimeline>(null);
   const t = useTranslations("AboutUsPage");
   useGSAP(
      () => {
         const mm = gsap.matchMedia();
         //** DESKTOP ANINAMTIONS */
         mm.add("(min-width: 1200px)", () => {
            if (!headingTextRef.current) return;
            const { moveX, startScale } = getMoveXAndStartScale(
               headingTextRef.current
            );
            gsap.set(headingTextRef.current, {
               scale: startScale,
               x: moveX,
            });
            gsap.from(headingTextRef.current, {
               duration: 1.5,
               opacity: 0,
               yPercent: 300,
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
            tl.current.to(headingTextRef.current, {
               scale: 1,
            });
            tl.current.to(
               headingTextRef.current,
               {
                  x: 0,
               },
               "-=0.5"
            );
            tl.current.from(
               ".about-us-page__who-we-are-heading-icon",
               {
                  x: 150,
                  opacity: 0,
               },
               "-=0.15"
            );
            tl.current.from(".about-us-page__who-we-are-text", {
               y: 150,
               opacity: 0,
               stagger: 0.2,
            });
         });

         //** MOBILE ANINAMTIONS */
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
                  ".about-us-page__who-we-are-heading-icon",
                  {
                     duration: 1,
                     x: 50,
                     opacity: 0,
                  },
                  ">-=0.5"
               )
               .from(
                  ".about-us-page__who-we-are-text",
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
      <section className="about-us-page__who-we-are" ref={containerRef}>
         <div className="about-us-page__who-we-are-effect-wrapper">
            <div className="about-us-page__layer-effect" />
            <div className="about-us-page__logo-bg">
               <div className="about-us-page__image-container">
                  <Image
                     src={logo}
                     alt="Eleven Web Development Agency Logo"
                     fill={true}
                     className="about-us-page__image"
                     data-testid="about-us-page-image"
                  />
               </div>
            </div>
         </div>
         <div className="about-us-page__who-we-are-content-wrapper">
            <div className="about-us-page__who-we-are-heading-wrapper">
               <h3
                  className="about-us-page__who-we-are-heading-text heading-text"
                  ref={headingTextRef}
               >
                  {t("whoWeAreBlock.headingText")}
               </h3>
               <span className="about-us-page__who-we-are-heading-icon">
                  <HyphenIcon />
               </span>
            </div>
            <div className="about-us-page__who-we-are-text-wrapper">
               <p
                  className="about-us-page__who-we-are-text"
                  data-testid="about-us-page-text"
               >
                  {t("whoWeAreBlock.text1")}
               </p>
               <p
                  className="about-us-page__who-we-are-text"
                  data-testid="about-us-page-text"
               >
                  {t("whoWeAreBlock.text2")}
               </p>
               <p
                  className="about-us-page__who-we-are-text"
                  data-testid="about-us-page-text"
               >
                  {t("whoWeAreBlock.text3")}
               </p>
            </div>
         </div>
      </section>
   );
}

export default WhoWeAre;
