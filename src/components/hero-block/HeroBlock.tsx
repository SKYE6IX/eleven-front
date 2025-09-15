"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import showcaseImage1 from "./assets/kasatkin.png";
import showcaseImage2 from "./assets/fast-car.png";
import "./hero-block.scss";

function HeroBlock() {
   const t = useTranslations("HeroBlock");
   const containerRef = useRef<HTMLElement>(null);
   const headingTextRef = useRef<HTMLHeadingElement>(null);

   useGSAP(
      () => {
         const headingTextRect =
            headingTextRef.current!.getBoundingClientRect();
         const vw = window.innerWidth;
         const vh = window.innerHeight;
         const maxScaleX = vw / headingTextRect.width;
         const maxScaleY = vh / headingTextRect.height;
         const maxAllowedScale = Math.min(maxScaleX, maxScaleY);
         const preferredScale = 1.4;
         const startScale = Math.min(preferredScale, maxAllowedScale);
         gsap.set(headingTextRef.current, {
            scale: startScale,
            y: "50%",
         });
         gsap.from(headingTextRef.current, {
            yPercent: 100,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
         });
         gsap
            .timeline({
               scrollTrigger: {
                  trigger: containerRef.current,
                  start: "clamp(top 80px)",
                  end: "+=" + containerRef.current?.offsetHeight,
                  scrub: true,
                  pin: true,
               },
            })
            .to(headingTextRef.current, {
               scale: 1,
            })
            .to(
               headingTextRef.current,
               {
                  y: 0,
               },
               "<"
            )
            .from(
               ".hero-block__tagline-wrapper",
               {
                  scale: 0.5,
                  opacity: 0,
               },
               "<"
            )
            .from(
               ".hero-block__showcase",
               {
                  scale: 0.5,
                  opacity: 0,
               },
               "<"
            );
      },
      { scope: containerRef }
   );
   return (
      <section className="hero-block" ref={containerRef}>
         <div className="hero-block__top">
            <div className="hero-block__tagline-wrapper">
               <h5 className="hero-block__tagline">{t("tagline")}</h5>
            </div>
            <h1 className="hero-block__title" ref={headingTextRef}>
               {t.rich("title", {
                  important: (chucks) => (
                     <span className="hero-block__title-city">{chucks}</span>
                  ),
               })}
            </h1>
         </div>

         <div className="hero-block__bottom">
            <div className="hero-block__showcase">
               <div className="hero-block__showcase-image-container">
                  <Image
                     src={showcaseImage1}
                     alt="An image of a landing page for kasatkin web agency"
                     fill={true}
                     className="hero-block__showcase-image"
                     data-testid="hero-block-image"
                  />
               </div>
               <h3 className="hero-block__showcase-text">
                  {t("showcaseText1")}
               </h3>
            </div>
            <div className="hero-block__showcase">
               <h3 className="hero-block__showcase-text">
                  {t("showcaseText2")}
               </h3>
               <div className="hero-block__showcase-image-container">
                  <Image
                     src={showcaseImage2}
                     alt="An image of a landing page for fast car sales company"
                     fill={true}
                     className="hero-block__showcase-image"
                     data-testid="hero-block-image"
                  />
               </div>
            </div>
         </div>
      </section>
   );
}

export default HeroBlock;
