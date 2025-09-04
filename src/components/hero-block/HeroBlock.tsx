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

   useGSAP(
      () => {
         const title = document.querySelector(".hero-block__title");
         if (!title) return;
         const titleRect = title.getBoundingClientRect();
         const vw = window.innerWidth;
         const vh = window.innerHeight;
         const maxScaleX = vw / titleRect.width;
         const maxScaleY = vh / titleRect.height;
         const maxAllowedScale = Math.min(maxScaleX, maxScaleY);
         const preferredScale = 1.4;
         const startScale = Math.min(preferredScale, maxAllowedScale);
         gsap.set(".hero-block__title", {
            scale: startScale,
         });
         gsap
            .timeline({ defaults: { duration: 0.8 } })
            .from(".hero-block__title", {
               duration: 1,
               yPercent: 150,
               autoAlpha: 0,
            })
            .to(".hero-block__title", {
               scale: 1,
            })
            .from(
               ".hero-block__tagline-wrapper",
               {
                  scale: 0.5,
                  autoAlpha: 0,
               },
               "<"
            )
            .from(
               ".hero-block__showcase",
               {
                  scale: 0.5,
                  autoAlpha: 0,
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
            <h1 className="hero-block__title">
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
