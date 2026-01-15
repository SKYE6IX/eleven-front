"use client";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HyphenIcon from "../icons/HyphenIcon";
import "./why-us-block.scss";

function WhyUsBlock() {
   const t = useTranslations("WhyUsBlock");
   const containerRef = useRef<HTMLElement>(null);
   const innerWrapperRef = useRef<HTMLDivElement>(null);
   const titleWrapperRef = useRef<HTMLDivElement>(null);
   const tl = useRef<GSAPTimeline>(null);

   useGSAP(
      () => {
         const runAnimation = () => {
            if (!titleWrapperRef.current || !innerWrapperRef.current) {
               return;
            }

            if (tl.current) {
               tl.current.scrollTrigger?.kill();
               tl.current.kill();
               tl.current = null;
               gsap.set(".why-us-block__title-wrapper", {
                  clearProps: "all",
               });
            }

            const titleRect = titleWrapperRef.current.getBoundingClientRect();
            const vw = innerWrapperRef.current.offsetWidth;
            const vh = window.innerHeight;

            const maxScaleX = vw / titleRect.width;
            const maxScaleY = vh / titleRect.height;

            const maxAllowedScale = Math.min(maxScaleX, maxScaleY);
            const preferredScale = 2;
            const startScale = Math.min(preferredScale, maxAllowedScale);

            const left =
               titleWrapperRef.current.offsetLeft -
               innerWrapperRef.current.offsetLeft;

            gsap.set(".why-us-block__title-wrapper", {
               scale: startScale,
            });

            tl.current = gsap.timeline({
               defaults: {
                  duration: 0.6,
                  ease: "power2.out",
               },
               scrollTrigger: {
                  trigger: innerWrapperRef.current,
                  start: "clamp(top bottom)",
                  scrub: 1.5,
                  end: () => "+=750",
               },
            });

            tl.current.from(".why-us-block__title-wrapper", {
               yPercent: 150,
            });

            tl.current.to(".why-us-block__title-wrapper", {
               scale: 1,
            });

            tl.current
               .to(
                  ".why-us-block__title-wrapper",
                  {
                     x: -left,
                  },
                  "<"
               )
               .fromTo(
                  ".why-us-block__title-icon",
                  {
                     autoAlpha: 0,
                     xPercent: 50,
                  },
                  {
                     duration: 0.5,
                     autoAlpha: 1,
                     xPercent: 0,
                  }
               )
               .fromTo(
                  ".why-us-block__list-item",
                  {
                     autoAlpha: 0,
                     xPercent: 50,
                  },
                  {
                     duration: 0.5,
                     autoAlpha: 1,
                     xPercent: 0,
                     stagger: 0.3,
                  },
                  ">-0.5"
               );
         };

         runAnimation();

         let width = 0;

         const handleResize = () => {
            if (width !== window.innerWidth) {
               runAnimation();
               width = window.innerWidth;
            }
         };

         window.addEventListener("resize", handleResize);

         return () => window.removeEventListener("resize", handleResize);
      },
      { scope: containerRef }
   );
   return (
      <section className="why-us-block" ref={containerRef}>
         <div className="why-us-block__inner-wrapper" ref={innerWrapperRef}>
            <div className="why-us-block__title-wrapper" ref={titleWrapperRef}>
               <h1 className="why-us-block__title">{t("title")}</h1>
               <span className="why-us-block__title-icon">
                  <HyphenIcon />
               </span>
            </div>

            <div className="why-us-block__list">
               {["item1", "item2", "item3"].map((item, idx) => (
                  <div className="why-us-block__list-item" key={item}>
                     <h5 className="why-us-block__list-item-index">
                        0{idx + 1}
                     </h5>
                     <p
                        className="why-us-block__list-item-text"
                        data-testid="why-us-block-list-item-text"
                     >
                        {t(`whyUsItems.${item}`)}
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}

export default WhyUsBlock;
