"use client";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./hero-block.scss";

function HeroBlock() {
   const t = useTranslations("HeroBlock");
   const containerRef = useRef<HTMLElement>(null);
   const headingTextRef = useRef<HTMLHeadingElement>(null);

   useGSAP(
      () => {
         gsap.fromTo(
            ".hero-block__text-wrapper.left",
            {
               x: -150,
               opacity: 0,
            },
            {
               x: 0,
               opacity: 1,
               ease: "power2.out",
            }
         );
         gsap.fromTo(
            ".hero-block__text-wrapper.right",
            {
               x: 150,
               opacity: 0,
            },
            {
               x: 0,
               opacity: 1,
               ease: "power2.out",
            }
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
                  span: (chucks) => <span className="highlight">{chucks}</span>,
               })}
            </h1>
         </div>

         <div className="hero-block__bottom">
            <div className="hero-block__text-wrapper left">
               <h3 className="hero-block__text">{t("subTitle1")}</h3>
            </div>
            <div className="hero-block__text-wrapper right">
               <h3 className="hero-block__text">{t("subTitle2")}</h3>
            </div>
         </div>
      </section>
   );
}

export default HeroBlock;
