"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../button/Button";
import GreenDotIcon from "../icons/GreenDotIcon";
import MenuBarIcon from "../icons/MenuBarIcon";
import NavLink from "./NavLink";
import "./navigation.scss";

const navigationList = [
   { key: "home", href: "/" },
   { key: "about", href: "/about" },
   { key: "work", href: "/work" },
   { key: "contact", href: "/contact" },
];

function Navigation() {
   const containerRef = useRef<HTMLElement>(null);
   const navSentinelRef = useRef<HTMLDivElement>(null);
   const navWrapperRef = useRef<HTMLDivElement>(null);
   const [isOpen, setIsOpen] = useState(false);
   const isScrollTrigger = useRef(false);
   const initialToggle = useRef(false);

   const menuBarTl = useRef<GSAPTimeline>(null);
   const openTl = useRef<GSAPTimeline>(null);
   const closeTl = useRef<GSAPTimeline>(null);
   //** INWARD ANIMATION FOR WHEN THE TRIGGER PASSED THE TOP */
   useGSAP(
      () => {
         const trigger = document.getElementById("navigation-trigger");
         gsap.set(navWrapperRef.current, {
            width: "100%",
         });
         gsap.set(".header__navigation-bg-layer", {
            opacity: 0,
         });
         const scrollTrigger = ScrollTrigger.create({
            trigger: trigger,
            onEnter: () => {
               isScrollTrigger.current = true;
               const sentinelWidth = navSentinelRef.current?.offsetWidth;
               gsap
                  .timeline({ defaults: { ease: "power1.out" } })
                  .to(navWrapperRef.current, {
                     width: sentinelWidth + "px",
                     clearProps: "width",
                  })
                  .to(".header__navigation-bg-layer", { opacity: 1 }, ">-0.8");
            },
            onLeaveBack: () => {
               isScrollTrigger.current = false;
               gsap
                  .timeline({ defaults: { ease: "power1.in" } })
                  .to(navWrapperRef.current, {
                     width: "100%",
                  })
                  .to(".header__navigation-bg-layer", { opacity: 0 }, ">-0.5");
            },
            start: "clamp(top top)",
            end: "+=160",
            invalidateOnRefresh: true,
         });
         //** ANIMATION FOR MENU BUGGER BAR*/
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
         return () => scrollTrigger.kill();
      },
      { scope: containerRef }
   );
   //** MOBILE MENU OPEN AND CLOSED ANIMATION */
   const { contextSafe } = useGSAP(
      () => {
         const mm = gsap.matchMedia();
         mm.add("(min-width: 913px)", () => {
            gsap.set(navWrapperRef.current, {
               clearProps: "height",
            });
            gsap.set(".header__menu-container.small .mobile-menu-item", {
               clearProps: "transfrom,opacity",
            });
            gsap.set(".header__menu-container.small", {
               clearProps: "autoAlpha",
            });
         });
         mm.add("(max-width: 912px)", () => {
            if (isOpen) {
               openTl.current?.kill();
               openTl.current = gsap.timeline();
               menuBarTl.current?.play();
               if (isScrollTrigger.current) {
                  openTl.current.to(navWrapperRef.current, {
                     width: "100%",
                  });
               }
               openTl.current
                  .fromTo(
                     navWrapperRef.current,
                     {
                        height: "3.75rem",
                     },
                     {
                        height: "26.25rem",
                     }
                  )
                  .to(
                     ".header__navigation-bg-layer",
                     {
                        opacity: 1,
                     },
                     ">-0.5"
                  )
                  .fromTo(
                     ".header__menu-container.small",
                     { autoAlpha: 0 },
                     { autoAlpha: 1 },
                     "<"
                  )
                  .fromTo(
                     ".header__menu-container.small .mobile-menu-item",
                     { y: -50, opacity: 0 },
                     {
                        y: 0,
                        opacity: 1,
                        stagger: 0.1,
                        ease: "power3.out",
                     },
                     "<"
                  );
               openTl.current = null;
            }

            if (!isOpen && initialToggle.current) {
               menuBarTl.current?.reverse();
               closeTl.current?.kill();
               closeTl.current = gsap.timeline();
               closeTl.current
                  .fromTo(
                     ".header__menu-container.small .mobile-menu-item",
                     { y: 0, opacity: 1 },
                     {
                        y: -25,
                        opacity: 0,
                        stagger: 0.1,
                        ease: "power3.in",
                     }
                  )
                  .fromTo(
                     ".header__menu-container.small",
                     { autoAlpha: 1 },
                     { autoAlpha: 0 }
                  )
                  .fromTo(
                     navWrapperRef.current,
                     {
                        height: "26.25rem",
                     },
                     {
                        height: "3.75rem",
                     },
                     ">-0.5"
                  );
               if (isScrollTrigger.current) {
                  closeTl.current.to(navWrapperRef.current, {
                     width: () => navSentinelRef.current?.offsetWidth + "px",
                  });
               }
               closeTl.current.to(
                  ".header__navigation-bg-layer",
                  {
                     opacity: isScrollTrigger.current ? 1 : 0,
                  },
                  "-=0.5"
               );
               closeTl.current = null;
            }
         });
      },
      { scope: containerRef, dependencies: [isOpen] }
   );

   const toggleMenu = () => {
      initialToggle.current = true;
      setIsOpen(!isOpen);
   };

   const onNaviagtionChange = contextSafe(() => {
      setIsOpen(false);
      initialToggle.current = false;
      menuBarTl.current?.reverse();
      gsap.set(navWrapperRef.current, {
         height: "3.75rem",
      });
      gsap.set(".header__navigation-bg-layer", {
         opacity: 0,
      });
      gsap.set(".header__menu-container.small", {
         visibility: "hidden",
      });
      gsap.set(".header__menu-container.small .mobile-menu-item", {
         clearProps: "transfrom,opacity",
      });
   });

   return (
      <>
         <div id="navigation-trigger" style={{ height: "80px" }} />
         <header
            className={["header", isOpen ? "menu-active" : ""].join(" ")}
            ref={containerRef}
         >
            <div className="header__inner-wrapper">
               <div
                  className="header__navigation-sentinel"
                  ref={navSentinelRef}
               />
               <div className="header__navigation-wrapper" ref={navWrapperRef}>
                  <div className="header__navigation-bg-layer"></div>
                  <div className="header__navigation">
                     <div className="header__title-wrapper">
                        <h3 className="header__title">eleven</h3>
                        <span className="header__title-icon">
                           <GreenDotIcon />
                        </span>
                     </div>
                     <NavLink
                        onNavigationChange={onNaviagtionChange}
                        navigationList={navigationList}
                     />
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
      </>
   );
}
export default Navigation;
