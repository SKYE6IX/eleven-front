"use client";
import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import Button from "../button/Button";
import Logo from "../logo/Logo";
import "./about-us-block.scss";

function AboutUsBlock() {
   const t = useTranslations("AboutUsBlock");
   const containerRef = useRef<HTMLElement>(null);

   useGSAP(
      () => {
         const START = "top 85%";
         SplitText.create(".about-us-block__heading-text", {
            type: "lines",
            wordDelimiter: ",",
            autoSplit: true,
            onSplit: (self) => {
               return gsap.from(self.lines, {
                  duration: 1,
                  yPercent: 100,
                  ease: "power3.out",
                  stagger: 0.15,
                  autoAlpha: 0,
                  onComplete: () => {
                     self.revert();
                  },
                  scrollTrigger: {
                     trigger: ".about-us-block__text",
                     start: START,
                  },
               });
            },
         });
         SplitText.create(".about-us-block__text", {
            type: "lines",
            autoSplit: true,
            onSplit: (self) => {
               return gsap.from(self.lines, {
                  duration: 1,
                  yPercent: 100,
                  ease: "power3.out",
                  stagger: 0.2,
                  autoAlpha: 0,
                  onComplete: () => {
                     self.revert();
                  },
                  scrollTrigger: {
                     trigger: ".about-us-block__text",
                     start: START,
                  },
               });
            },
         });
      },
      { scope: containerRef }
   );
   return (
      <section className="about-us-block" ref={containerRef}>
         <div className="about-us-block__inner-wrapper">
            <div className="about-us-block__logo-wrapper">
               <Logo />
            </div>
            <div className="about-us-block__text-wrapper">
               <h3 className="about-us-block__heading-text">
                  {t("headingText")}
               </h3>
               <p
                  className="about-us-block__text"
                  data-testid="about-us-block-text"
               >
                  {t.rich("text", {
                     important: (chuck) => (
                        <span className="highlight">{chuck}</span>
                     ),
                  })}
               </p>
               <Button textKey="contact" href="/contact" type="link" />
            </div>
         </div>
      </section>
   );
}

export default AboutUsBlock;
