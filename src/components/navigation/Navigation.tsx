"use client";
import React, { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "../button/Button";
import GreenDotIcon from "../icons/GreenDotIcon";
import MenuBarIcon from "../icons/MenuBarIcon";
import { Link, usePathname } from "@/i18n/navigation";
import "./navigation.scss";

function Navigation() {
   const [isOpen, setIsOpen] = useState(false);
   const containerRef = useRef<HTMLElement>(null);
   const navWrapper = useRef<HTMLDivElement>(null);

   const initialToggle = useRef(false);
   const [isScrollTrigger, setIsScrollTrigger] = useState(false);
   const menuBarTl = useRef<GSAPTimeline>(null);

   const pathname = usePathname();
   const t = useTranslations("Navigations");

   const navigationList = [
      { key: "home", href: "/" },
      { key: "about", href: "#about" },
      { key: "work", href: "#work" },
      { key: "contact", href: "/contact" },
   ];

   // Scroll animation to toggle the inward on both side
   useGSAP(
      () => {
         const trigger = document.getElementById("navigation-trigger");
         gsap
            .timeline({
               defaults: {
                  ease: "power2.inOut",
                  duration: 1,
               },
               scrollTrigger: {
                  trigger: trigger,
                  start: "top top",
                  toggleActions: "play none none reverse",
                  invalidateOnRefresh: true,
                  onEnter: () => {
                     setIsScrollTrigger(true);
                  },
                  onLeaveBack: () => {
                     setIsScrollTrigger(false);
                  },
               },
            })
            .from(".header__navigation-wrapper", {
               width: "99vw",
            })
            .from(
               ".header__navigation-bg-layer",
               {
                  autoAlpha: 0,
               },
               ">-0.8"
            );
      },
      { scope: containerRef }
   );

   // Mobile menu Animation codes
   useGSAP(
      () => {
         const mm = gsap.matchMedia();
         mm.add("(min-width: 913px)", () => {
            gsap.set(".header__navigation-wrapper", {
               clearProps: "height",
            });
            gsap.set(".header__menu-container", {
               clearProps: "all",
            });
         });

         if (!initialToggle.current) {
            menuBarTl.current = gsap
               .timeline({ paused: true, defaults: { duration: 0.3 } })
               .to(".menu-bar-dot", {
                  opacity: 0,
                  stagger: 0.2,
               })
               .to(".menu-bar-pipe.pipe2", { opacity: 0 })
               .to(
                  ".menu-bar-pipe.pipe1",
                  {
                     y: 1,
                     rotate: "45deg",
                     transformOrigin: "left center",
                  },
                  "<"
               )
               .to(
                  ".menu-bar-pipe.pipe3",
                  {
                     y: -1,
                     rotate: "-45deg",
                     transformOrigin: "left center",
                  },
                  "<"
               );
         }
         const navWidth = navWrapper.current?.offsetWidth;
         const menuTl = gsap.timeline({
            defaults: { ease: "power2.inOut", duration: 0.5 },
         });
         if (isOpen) {
            menuBarTl.current?.play();
            menuTl
               .fromTo(
                  ".header__navigation-wrapper",
                  {
                     width: navWidth + "px",
                  },
                  {
                     width: "calc(100% - 30px)",
                  }
               )
               .fromTo(
                  ".header__navigation-wrapper",
                  {
                     height: "3.75rem",
                  },
                  {
                     height: "26.25rem",
                  },
                  ">-0.5"
               )
               .to(
                  ".header__navigation-bg-layer",
                  {
                     autoAlpha: 1,
                  },
                  ">-0.9"
               )
               .to(".header__menu-container", {
                  autoAlpha: 1,
                  duration: 0.2,
               });
         }

         if (initialToggle.current && !isOpen) {
            menuBarTl.current?.reverse();
            menuTl
               .to(".header__menu-container", {
                  autoAlpha: 0,
               })
               .fromTo(
                  ".header__navigation-wrapper",
                  {
                     height: "26.25rem",
                  },
                  {
                     height: "3.75rem",
                  },
                  ">-0.2"
               )
               .fromTo(
                  ".header__navigation-wrapper",
                  {
                     width: navWidth + "px",
                  },
                  {
                     width: isScrollTrigger ? "18rem" : "99vw",
                  },
                  ">-0.2"
               )
               .to(
                  ".header__navigation-bg-layer",
                  {
                     autoAlpha: isScrollTrigger ? 1 : 0,
                  },
                  ">-0.2"
               );
         }
      },
      { scope: containerRef, dependencies: [isOpen] }
   );

   const toggleMenu = () => {
      setIsOpen(!isOpen);
      initialToggle.current = true;
   };

   return (
      <header
         className={["header", isOpen ? "menu-active" : ""].join(" ")}
         ref={containerRef}
      >
         <div className="header__inner-wrapper">
            <div className="header__navigation-wrapper" ref={navWrapper}>
               <div className="header__navigation-bg-layer"></div>
               <div className="header__navigation">
                  <div className="header__title-wrapper">
                     <h3 className="header__title">eleven</h3>
                     <span className="header__title-icon">
                        <GreenDotIcon />
                     </span>
                  </div>
                  <nav>
                     <ul className="header__menu-container">
                        {navigationList.map((nav) => (
                           <li
                              key={nav.key}
                              className={[
                                 "header__menu-item",
                                 pathname === nav.href ? "active" : "",
                              ].join(" ")}
                           >
                              <Link
                                 href={nav.href}
                                 className="header__menu-link"
                                 data-testid="navigation-menu-item"
                              >
                                 {t(nav.key)}
                              </Link>
                           </li>
                        ))}
                        <div className="header__button-wrapper small">
                           <Button
                              type="link"
                              textKey="contact"
                              href="/contact"
                           />
                        </div>
                     </ul>
                  </nav>
                  <div className="header__button-wrapper large">
                     <Button type="link" textKey="contact" href="/contact" />
                  </div>
                  <div className="header__menu-bar-wrapper">
                     <button
                        className="header__menu-bar-button"
                        onClick={toggleMenu}
                     >
                        <MenuBarIcon />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </header>
   );
}
export default Navigation;
