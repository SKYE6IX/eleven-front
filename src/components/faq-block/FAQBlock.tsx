"use client";
import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowUpIcon from "../icons/ArrowUpIcon";
import oldComputerImage from "./old-computer.webp";
import "./faq-block.scss";

const faqList = ["q1", "q2", "q3", "q4", "q5", "q6"];

function FAQBlock() {
   const containerRef = useRef<HTMLElement>(null);
   const innerWrapperRef = useRef<HTMLDivElement>(null);
   const t = useTranslations("FAQBlock");
   const [currentOpenIdx, setCurrentOpenIdx] = useState(0);
   const handleToggleIsOpen = (newIdx: number) => {
      setCurrentOpenIdx((prvIdx) => (prvIdx === newIdx ? prvIdx : newIdx));
   };

   useGSAP(
      () => {
         const mm = gsap.matchMedia();
         const getClipPathValue = (radius: string) => {
            const innerWrapperLeft = innerWrapperRef.current!.offsetLeft;
            const moveX = innerWrapperLeft / 2;
            return `inset(0px ${moveX}px 0px ${moveX}px round 0px 0px ${radius}px ${radius}px)`;
         };
         const getEndValue = () => {
            const innerWrapperLeft = innerWrapperRef.current!.offsetLeft;
            return "+=" + innerWrapperLeft * 2;
         };
         mm.add("(min-width: 1100px)", () => {
            gsap.to(".faq-block__layer", {
               duration: 1.5,
               clipPath: () => getClipPathValue("60"),
               ease: "power1.out",
               scrollTrigger: {
                  trigger: innerWrapperRef.current,
                  start: "clamp(bottom 90%)",
                  end: () => getEndValue(),
                  scrub: 1,
                  invalidateOnRefresh: true,
               },
            });
         });
         mm.add("(max-width: 912px)", () => {
            gsap.to(".faq-block__layer", {
               duration: 1.5,
               clipPath: () => getClipPathValue("30"),
               ease: "power1.out",
               scrollTrigger: {
                  trigger: innerWrapperRef.current,
                  start: "clamp(bottom 90%)",
                  end: () => getEndValue(),
                  scrub: 1,
                  invalidateOnRefresh: true,
               },
            });
         });
         const split = SplitText.create(".faq-block__title", { type: "chars" });
         gsap.from(split.chars, {
            ease: "power4",
            xPercent: 100,
            duration: 0.6,
            opacity: 0,
            stagger: 0.15,
            onComplete: () => {
               split.revert();
            },
            scrollTrigger: {
               trigger: ".faq-block__title",
               start: "top 90%",
            },
         });
         SplitText.create(".faq-block__heading-text", {
            type: "lines",
            autoSplit: true,
            onSplit: (self) => {
               return gsap.from(self.lines, {
                  ease: "power4.out",
                  duration: 1,
                  yPercent: 100,
                  opacity: 0,
                  stagger: 0.15,
                  onComplete: () => {
                     self.revert();
                  },
                  scrollTrigger: {
                     trigger: ".faq-block__heading-text",
                     start: "top 90%",
                  },
               });
            },
         });
         gsap.set(".faq-block__card", {
            y: 60,
            autoAlpha: 0,
         });
         ScrollTrigger.batch(".faq-block__card", {
            batchMax: 6,
            onEnter: (batch) => {
               gsap.to(batch, {
                  duration: 1.2,
                  y: 0,
                  autoAlpha: 1,
                  ease: "power2.out",
                  stagger: 0.3,
               });
            },
            start: "top 95%",
            end: "+=500",
         });
      },
      { scope: containerRef }
   );
   return (
      <section className="faq-block" ref={containerRef}>
         <div className="faq-block__layer" />
         <div className="faq-block__inner-wrapper" ref={innerWrapperRef}>
            <div className="faq-block__left-container">
               {faqList.map((list, idx) => (
                  <div className="faq-block__card" key={list}>
                     <div
                        className={[
                           "faq-block__card-header",
                           idx === currentOpenIdx ? "open" : "close",
                        ].join(" ")}
                        onClick={() => handleToggleIsOpen(idx)}
                     >
                        <h4 className="faq-block__card-question">
                           {t(`faqList.${list}.question`)}
                        </h4>
                        <ArrowUpIcon />
                     </div>
                     <div
                        className={[
                           "faq-block__card-body",
                           idx === currentOpenIdx ? "open" : "close",
                        ].join(" ")}
                     >
                        <div className="faq-block__card-answer-wrapper">
                           <p
                              className={[
                                 "faq-block__card-answer",
                                 idx === currentOpenIdx ? "open" : "close",
                              ].join(" ")}
                              data-testid="faq-answer"
                           >
                              {t(`faqList.${list}.answer`)}
                           </p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            <div className="faq-block__right-container">
               <h3 className="faq-block__title">{t("title")}</h3>
               <h5 className="faq-block__heading-text">{t("headingText")}</h5>
               <div className="faq-block__image-container">
                  <Image
                     src={oldComputerImage}
                     alt="An old computer image"
                     fill={true}
                     className="faq-block__image"
                     data-testid="faq-block-image"
                  />
               </div>
            </div>
         </div>
      </section>
   );
}

export default FAQBlock;
