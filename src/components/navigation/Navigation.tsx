"use client";
import { Fragment, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../button/Button";
import GreenDotIcon from "../icons/GreenDotIcon";
import MenuBarIcon from "../icons/MenuBarIcon";
import { Link } from "@/i18n/navigation";
import NavLink from "./NavLink";
import "./navigation.scss";

interface GsapMMConditions {
   isDesktop: boolean;
   isMobile: boolean;
}

const navigationList = [
   { key: "home", href: "/" },
   { key: "about", href: "/about" },
   { key: "work", href: "/work" },
   { key: "contact", href: "/contact" },
];

function Navigation() {
   const [isOpen, setIsOpen] = useState(false);

   const containerRef = useRef<HTMLElement>(null);
   const navWrapperRef = useRef<HTMLDivElement>(null);

   const scrollTrigger = useRef<ScrollTrigger>(null);
   const isNavInward = useRef(false);

   const menuBarTl = useRef<GSAPTimeline>(null);
   const isMenuTlCreated = useRef(true);
   const mobileMenuTl = useRef<GSAPTimeline>(null);

   //** INWARD ANIMATION FOR WHEN THE TRIGGER PASSED THE TOP */
   const { contextSafe } = useGSAP(
      () => {
         const trigger = document.getElementById("navigation-trigger");
         const mm = gsap.matchMedia();
         const breakpoint = 950;

         mm.add("(min-width: 912px)", () => {
            gsap.set(".header__navigation-bg-layer", {
               clearProps: "height",
            });
         });
         mm.add("(max-width: 767px)", () => {
            gsap.set(".header__navigation-bg-layer", {
               clearProps: "height",
            });
         });

         mm.add(
            {
               isDesktop: `(min-width: ${breakpoint}px)`,
               isMobile: `(max-width: ${breakpoint - 1}px)`,
            },
            (context) => {
               const { isDesktop } =
                  context.conditions as unknown as GsapMMConditions;

               const wrapperClasses = isDesktop
                  ? ".header__button-wrapper, .header__title-wrapper"
                  : ".header__menu-bar-wrapper, .header__title-wrapper";

               const titleX = isDesktop
                  ? "translateX(calc((100vw - var(--nav-width)) / -2))"
                  : "translateX(calc((100vw - var(--nav-width)) / -2 + var(--offset-space)))";

               const buttonsX = isDesktop
                  ? "translateX(calc((100vw - var(--nav-width)) / 2))"
                  : "translateX(calc((100dvw - var(--nav-width)) / 2 - var(--offset-space)))";

               scrollTrigger.current = ScrollTrigger.create({
                  trigger: trigger,
                  onEnter: () => {
                     isNavInward.current = true;
                     gsap
                        .timeline()
                        .to(wrapperClasses, {
                           x: "0px",
                        })
                        .to(
                           ".header__navigation-bg-layer",
                           { width: "100%" },
                           "<"
                        )
                        .to(
                           ".header__navigation-bg-layer",
                           {
                              opacity: 1,
                           },
                           "<15%"
                        );
                  },
                  onLeaveBack: () => {
                     isNavInward.current = false;
                     gsap
                        .timeline()
                        .to(
                           isDesktop
                              ? ".header__button-wrapper"
                              : ".header__menu-bar-wrapper",
                           {
                              transform: buttonsX,
                              clearProps: "transform",
                           }
                        )
                        .to(
                           ".header__title-wrapper",
                           {
                              transform: titleX,
                              clearProps: "transform",
                           },
                           "<"
                        )
                        .to(
                           ".header__navigation-bg-layer",
                           {
                              width: () => window.innerWidth + "px",
                              clearProps: "width",
                           },
                           "<"
                        )
                        .to(
                           ".header__navigation-bg-layer",
                           {
                              opacity: 0,
                           },
                           "<30%"
                        );
                  },
                  start: "clamp(top top)",
               });
            }
         );

         //** ANIMATION FOR MENU BUGGER BAR*/
         menuBarTl.current = gsap
            .timeline({ paused: true, defaults: { duration: 0.2 } })
            .to(".menu-bar-dot", {
               opacity: 0,
               stagger: 0.1,
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

         return () => scrollTrigger.current?.kill();
      },
      { scope: containerRef }
   );

   const toggleMenu = contextSafe(() => {
      const isMenuOpen = !isOpen;

      if (isMenuTlCreated.current) {
         // Kill the previous tl animation if there is any
         if (mobileMenuTl.current) {
            mobileMenuTl.current.kill();
         }

         mobileMenuTl.current = gsap
            .timeline({ defaults: { ease: "power1.out", duration: 0.3 } })

            .to(".header__title-wrapper", {
               ...(isNavInward.current && {
                  transform:
                     "translateX(calc((100vw - var(--nav-width)) / -2 + var(--offset-space)))",
               }),
            })

            .to(
               ".header__menu-bar-wrapper",
               {
                  ...(isNavInward.current && {
                     transform:
                        "translateX(calc((100dvw - var(--nav-width)) / 2 - var(--offset-space)))",
                  }),
               },
               "<"
            )

            .to(
               ".header__navigation-bg-layer",
               {
                  ...(isNavInward.current && {
                     opacity: 1,
                     width: "var(--bg-layer-width)",
                  }),
               },
               "<"
            )
            .to(".header__navigation-bg-layer", {
               opacity: 1,
               height: "var(--bg-layer-height)",
            })
            .fromTo(
               ".navigation__menu-container.small",
               { autoAlpha: 0 },
               { autoAlpha: 1 },
               "<30%"
            )
            .fromTo(
               ".navigation__menu-container.small .mobile-menu-item",
               { y: -50, opacity: 0 },
               { y: 0, stagger: 0.1, opacity: 1, ease: "power2.out" },
               "<"
            );
      }

      if (isMenuOpen) {
         // Disable the recreation for the mobile menu tl
         isMenuTlCreated.current = false;

         menuBarTl.current?.restart();
         mobileMenuTl.current?.restart();
      } else if (!isMenuOpen) {
         // Enable the recreation for the mobile menu tl
         isMenuTlCreated.current = true;

         menuBarTl.current?.reverse();

         mobileMenuTl.current?.reverse();
      }
      setIsOpen(!isOpen);
   });

   return (
      <Fragment>
         <div id="navigation-trigger" style={{ height: "80px" }} />

         <header
            className={["header", isOpen ? "menu-active" : ""].join(" ")}
            ref={containerRef}
         >
            <div className="header__navigation-wrapper">
               <div className="header__navigation" ref={navWrapperRef}>
                  <div className="header__navigation-bg-layer"></div>
                  <div className="header__title-wrapper">
                     <Link href="/">
                        <h3 className="header__title">eleven</h3>
                     </Link>
                     <span className="header__title-icon">
                        <GreenDotIcon />
                     </span>
                  </div>

                  <NavLink
                     onNavigationChange={() => {}}
                     navigationList={navigationList}
                  />

                  <div className="header__button-wrapper">
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
         </header>
      </Fragment>
   );
}
export default Navigation;
