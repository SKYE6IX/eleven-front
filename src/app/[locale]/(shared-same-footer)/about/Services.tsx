"use client";
import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import HyphenIcon from "@/components/icons/HyphenIcon";
import "./about-us.scss";

type Props = {
   getMoveXAndStartScale: (headingText: HTMLDivElement) => {
      moveX: number;
      startScale: number;
   };
};

function Services({ getMoveXAndStartScale }: Props) {
   const containerRef = useRef<HTMLDivElement>(null);
   const innerWrapperRef = useRef<HTMLDivElement>(null);
   const headingTextRef = useRef<HTMLHeadingElement>(null);
   const tl = useRef<GSAPTimeline>(null);
   const t = useTranslations("AboutUsPage");

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

         const split = SplitText.create(".about-us-page__service-text", {
            type: "words",
         });
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
               duration: 1,
               ease: "none",
            });

            tl.current.to(
               headingTextRef.current,
               { x: 0, duration: 1, ease: "none" },
               "-=0.9"
            );

            tl.current
               .from(
                  ".about-us-page__service-heading-icon",
                  {
                     x: 150,
                     opacity: 0,
                  },
                  "-=0.15"
               )
               .from(
                  split.words,
                  {
                     ease: "none",
                     duration: 0.8,
                     opacity: 0.5,
                     stagger: 0.5,
                  },
                  "<"
               );
            tl.current.from(".about-us-page__service-item-container", {
               duration: 0.7,
               y: 150,
               opacity: 0,
               stagger: 0.2,
            });
            //** LAYER INWARD ANIMATION */
            gsap.to(".about-us-page__service-block-layer", {
               duration: 1.5,
               clipPath: () => getClipPathValue("60"),
               ease: "power1.out",
               scrollTrigger: {
                  trigger: containerRef.current,
                  start: "clamp(bottom 90%)",
                  end: () => getEndValue(),
                  scrub: 1,
                  invalidateOnRefresh: true,
               },
            });
         });

         //** MOBILE ANINAMTIONS */
         mm.add("(max-width: 1024px)", () => {
            gsap
               .timeline({
                  scrollTrigger: {
                     trigger: headingTextRef.current,
                     start: "top 90%",
                     toggleActions: "play none none reverse",
                  },
               })
               .from(headingTextRef.current, {
                  duration: 1,
                  x: 150,
                  opacity: 0,
               })
               .from(
                  ".about-us-page__service-heading-icon",
                  {
                     duration: 1,
                     x: 50,
                     opacity: 0,
                  },
                  ">-=0.5"
               );
            gsap.from(split.words, {
               ease: "none",
               duration: 0.8,
               opacity: 0.5,
               stagger: 0.5,
               scrollTrigger: {
                  trigger: ".about-us-page__service-text",
                  start: "clamp(top 90%)",
                  end: "+=300",
                  scrub: true,
               },
            });
            const serviceList = gsap.utils.toArray<HTMLDivElement>(
               ".about-us-page__service-item-container"
            );
            serviceList.forEach((el) => {
               gsap.from(el, {
                  duration: 1,
                  y: 150,
                  opacity: 0,
                  ease: "power2.out",
                  scrollTrigger: {
                     trigger: el,
                     start: "top 90%",
                     toggleActions: "play none none reverse",
                  },
               });
            });
         });
         //** MOBILE ANINAMTIONS FOR INWARD LAYER */
         mm.add("(max-width: 912px)", () => {
            gsap.to(".about-us-page__service-block-layer", {
               duration: 1.5,
               clipPath: () => getClipPathValue("30"),
               ease: "power1.out",
               scrollTrigger: {
                  trigger: containerRef.current,
                  start: "clamp(bottom 90%)",
                  end: () => getEndValue(),
                  scrub: 1,
                  invalidateOnRefresh: true,
               },
            });
         });
      },
      { scope: containerRef }
   );

   return (
      <div className="about-us-page__service-block" ref={containerRef}>
         <div className="about-us-page__service-block-layer" />
         <section className="about-us-page__service" ref={innerWrapperRef}>
            <div className="about-us-page__service-content-wrapper">
               <div className="about-us-page__service-heading-wrapper">
                  <h3
                     className="about-us-page__service-heading-text"
                     ref={headingTextRef}
                  >
                     {t("ourOfferingBlock.headingText")}
                  </h3>
                  <span className="about-us-page__service-heading-icon">
                     <HyphenIcon />
                  </span>
               </div>
               <div className="about-us-page__service-wrapper">
                  <h4
                     className="about-us-page__service-text"
                     data-testid="about-us-page-text"
                  >
                     {t("ourOfferingBlock.text")}
                  </h4>
                  <div>
                     <div className="about-us-page__service-item-container">
                        <h5 className="about-us-page__service-item-heading">
                           {t(
                              "ourOfferingBlock.serviceList.strategy.headingText"
                           )}
                        </h5>
                        <ul className="about-us-page__service-list">
                           {["item1", "item2", "item3", "item4"].map((item) => (
                              <li
                                 className="about-us-page__service-list-item"
                                 key={item}
                              >
                                 {t(
                                    `ourOfferingBlock.serviceList.strategy.list.${item}`
                                 )}
                              </li>
                           ))}
                        </ul>
                     </div>

                     <div className="about-us-page__service-item-container">
                        <h5 className="about-us-page__service-item-heading">
                           {t(
                              "ourOfferingBlock.serviceList.design.headingText"
                           )}
                        </h5>
                        <ul className="about-us-page__service-list">
                           {["item1", "item2", "item3"].map((item) => (
                              <li
                                 className="about-us-page__service-list-item"
                                 key={item}
                              >
                                 {t(
                                    `ourOfferingBlock.serviceList.design.list.${item}`
                                 )}
                              </li>
                           ))}
                        </ul>
                     </div>

                     <div className="about-us-page__service-item-container">
                        <h5 className="about-us-page__service-item-heading">
                           {t(
                              "ourOfferingBlock.serviceList.development.headingText"
                           )}
                        </h5>
                        <ul className="about-us-page__service-list">
                           {["item1", "item2", "item3", "item4", "item5"].map(
                              (item) => (
                                 <li
                                    className="about-us-page__service-list-item"
                                    key={item}
                                 >
                                    {t(
                                       `ourOfferingBlock.serviceList.development.list.${item}`
                                    )}
                                 </li>
                              )
                           )}
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}

export default Services;
