"use client";
import React, { useRef } from "react";
import Button from "../button/Button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { Link as IntLink, usePathname } from "@/i18n/navigation";
import WorldIcon from "../icons/WorldIcon";
import GreenDotIcon from "../icons/GreenDotIcon";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import MailIcon from "../icons/MailIcon";
import TelephoneIcon from "../icons/TelephoneIcon";
import "./footer.scss";

function Footer() {
   const pathname = usePathname();
   const t = useTranslations("Footer");
   const tl = useRef<GSAPTimeline>(null);
   const split1 = useRef<SplitText>(null);
   const split2 = useRef<SplitText>(null);
   const date = new Date();
   const containerRef = useRef<HTMLElement>(null);

   useGSAP(
      () => {
         if (split1.current || split2.current) {
            split1.current?.revert();
            split1.current = null;
            split2.current?.revert();
            split2.current = null;
         }
         split1.current = SplitText.create(".footer__heading-text", {
            type: "lines",
            autoSplit: true,
            onSplit: (self) => {
               return gsap.from(self.lines, {
                  y: 50,
                  autoAlpha: 0,
                  ease: "power2.out",
                  duration: 0.9,
                  stagger: 0.15,
                  scrollTrigger: {
                     trigger: ".footer__heading-text",
                     start: "top, bottom",
                     toggleActions: "play none none reverse",
                  },
               });
            },
         });
         split2.current = SplitText.create(".footer__site-title", {
            type: "chars",
         });
         if (tl.current) {
            tl.current.kill();
            tl.current.scrollTrigger?.kill();
         }
         tl.current = gsap.timeline({
            scrollTrigger: {
               trigger: ".footer__site-title-wrapper",
               start: "clamp(top 90%)",
               end: "+=150",
               toggleActions: "play none none reverse",
               onEnter: () => {
                  console.log("I enter");
               },
               onLeaveBack: () => {
                  console.log("I leave back");
               },
            },
         });
         gsap.set(split2.current.chars, {
            x: 150,
            opacity: 0,
         });
         gsap.set(".footer__site-title-icon", {
            y: -100,
            opacity: 0,
         });
         tl.current
            .to(split2.current.chars, {
               x: 0,
               opacity: 1,
               duration: 0.7,
               stagger: 0.1,
               ease: "power2.out",
            })
            .to(".footer__site-title-icon", {
               y: 0,
               opacity: 1,
               duration: 1,
               ease: "bounce.out",
            });
      },
      { scope: containerRef, dependencies: [pathname] }
   );
   return (
      <footer className="footer" ref={containerRef}>
         <div className="footer__inner-wrapper">
            <div className="footer__top-container">
               <h3 className="footer__heading-text">{t("headingText")}</h3>
               <Button textKey="contact" href="/contact" type="link" />
               <div className="footer__top-inner-wrapper">
                  <div className="footer__contact-wrapper">
                     <div className="footer__contact-submit-brief">
                        <h5 className="footer__contact-submit-brief-heading">
                           <span>
                              <WorldIcon />
                           </span>
                           {t("briefHeading")}
                        </h5>
                        <IntLink
                           href="#"
                           className="footer__contact-submit-brief-button"
                        >
                           {t("submitBrief")}
                           <ArrowLeftIcon />
                        </IntLink>
                     </div>
                     <div className="footer__contact-info">
                        <h5 className="footer__contact-heading">
                           {t("getInTouch")}
                        </h5>
                        <ul className="footer__contact-list">
                           <li className="footer__contact-item">
                              <TelephoneIcon />
                              <Link href="#" data-testid="footer-contact-item">
                                 +7 993 270 7338
                              </Link>
                           </li>
                           <li className="footer__contact-item">
                              <MailIcon />
                              <Link href="#" data-testid="footer-contact-item">
                                 hello@eleven.io
                              </Link>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <div className="footer__site-title-wrapper">
                     <h1 className="footer__site-title">ELEVEN</h1>
                     <span className="footer__site-title-icon">
                        <GreenDotIcon />
                     </span>
                  </div>
               </div>
            </div>
            <div className="footer__divider" />
            <div className="footer__bottom">
               <div className="footer__all-right-reserved">
                  <h4 className="footer__all-right-reserved-heading">ELEVEN</h4>
                  <h5 className="footer__all-right-reserved-text">
                     @{date.getFullYear() + " " + t("reserveText")}
                  </h5>
               </div>
               <ul className="footer__social-wrapper">
                  <li className="footer__social">
                     <Link href="#">Telegram</Link>
                  </li>
                  <li className="footer__social">
                     <Link href="#">
                        <div className="fade-effect" /> <span>X</span>
                     </Link>
                  </li>
                  <li className="footer__social">
                     <Link href="#">Linkedin</Link>
                  </li>
               </ul>
            </div>
         </div>
      </footer>
   );
}
export default Footer;
