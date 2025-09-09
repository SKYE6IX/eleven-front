"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../button/Button";
import coffeeImage from "./service-stock.webp";
import "./service-list-block.scss";

const serviceList = [
   { key: "design", items: ["Web Design", "eCommerce", "Landing Pages"] },
   {
      key: "develop",
      items: ["Web Development", "eCommerce", "Technical SEO"],
   },
   {
      key: "support",
      items: ["SEO", "Web Hosting", "PPC(Pay-per-click)"],
   },
   {
      key: "technologies",
      items: ["React", "Next.js", "Spring Boot", "Express"],
   },
];

function ServiceListBlock() {
   const t = useTranslations("ServiceListBlock");
   const containerRef = useRef<HTMLElement>(null);
   const START = "top 90%";
   const TOGGLE_ACTION = "play none none reverse";
   useGSAP(
      () => {
         const split1 = SplitText.create(".service-list-block__title", {
            type: "chars",
         });
         const split2 = SplitText.create(".service-list-block__heading-text", {
            type: "words",
         });
         gsap.from(split1.chars, {
            y: "50%",
            autoAlpha: 0,
            stagger: {
               each: 0.05,
               from: "center",
               ease: "none",
            },
            scrollTrigger: {
               trigger: ".service-list-block__title",
               start: START,
               toggleActions: TOGGLE_ACTION,
            },
         });
         gsap.from(split2.words, {
            duration: 1.5,
            opacity: 0.3,
            stagger: 0.5,
            scrollTrigger: {
               trigger: ".service-list-block__heading-text",
               start: START,
               end: "+=500",
               scrub: 1,
            },
         });
         gsap.from(".service-list-block__image-wrapper", {
            duration: 1,
            ease: "power2.out",
            y: "50%",
            autoAlpha: 0,
            scrollTrigger: {
               trigger: ".service-list-block__image-wrapper",
               start: START,
               toggleActions: TOGGLE_ACTION,
            },
         });
         gsap.set(".service-list-block__card", {
            y: "50%",
            autoAlpha: 0,
         });
         ScrollTrigger.batch(".service-list-block__card", {
            interval: 0.1,
            batchMax: 2,
            onEnter: (batch) => {
               gsap.to(batch, {
                  ease: "sine.out",
                  y: "0%",
                  autoAlpha: 1,
                  stagger: 0.15,
               });
            },
            onLeaveBack: (batch) => {
               gsap.to(batch, {
                  ease: "sine.in",
                  y: "50%",
                  autoAlpha: 0,
                  stagger: 0.15,
               });
            },
            start: START,
         });
      },
      { scope: containerRef }
   );
   return (
      <section className="service-list-block" ref={containerRef}>
         <div className="service-list-block__inner-wrapper">
            <div className="service-list-block__top-container">
               <div className="service-list-block__text-wrapper">
                  <h3 className="service-list-block__title">{t("title")}</h3>
                  <h5 className="service-list-block__heading-text">
                     {t("heading")}
                  </h5>
                  <Button textKey="contact" href="#" type="link" />
               </div>
               <div className="service-list-block__image-wrapper">
                  <Image
                     src={coffeeImage}
                     alt="Image related to Eleven Web Agency Service list"
                     fill={true}
                     className="service-list-block__image"
                     data-testid="service-list-block-image"
                  />
               </div>
            </div>
            <div className="service-list-block__bottom-container">
               {serviceList.map((service) => (
                  <div className="service-list-block__card" key={service.key}>
                     <div className="service-list-block__card-inner-wrapper">
                        <h6 className="service-list-block__card-title">
                           {t(`serviceList.${service.key}.title`)}
                        </h6>
                        <p className="service-list-block__card-text">
                           {t(`serviceList.${service.key}.briefText`)}
                        </p>
                        <ul className="service-list-block__card-list">
                           {service.items.map((item, idx) => (
                              <li
                                 key={item + idx}
                                 className="service-list-block__card-list-item"
                              >
                                 <span className="service-list-block__card-list-dot">
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       width="12"
                                       height="12"
                                       viewBox="0 0 12 12"
                                       fill="none"
                                    >
                                       <circle
                                          cx="5.94673"
                                          cy="6.42745"
                                          r="5.54"
                                          fill="#43A636"
                                       />
                                    </svg>
                                 </span>
                                 {item}
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}
export default ServiceListBlock;
