"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./logo.scss";

function Logo() {
   const containerRef = useRef<HTMLDivElement>(null);
   const logoPole2Ref = useRef<HTMLDivElement>(null);
   const logoBase2Ref = useRef<HTMLDivElement>(null);

   useGSAP(
      () => {
         if (!logoPole2Ref.current || !logoBase2Ref.current) return;
         const pole2Left = logoPole2Ref.current.offsetLeft;
         const moveLeft = pole2Left - logoPole2Ref.current.offsetWidth + 8;
         const base2Top = logoBase2Ref.current.offsetTop;
         const moveY = base2Top - logoBase2Ref.current.offsetHeight / 2;
         gsap.set(".pole-1", {
            x: moveLeft,
         });
         gsap.set(".base-1", {
            y: moveY,
         });
         gsap.set(".base-3", {
            y: -moveY,
         });
         const tl = gsap.timeline({
            defaults: { ease: "power2.inOut", duration: 1.5 },
            repeat: -1,
            yoyo: true,
            scrollTrigger: {
               trigger: ".logo",
               start: "top 90%",
               toggleActions: "play none none pause",
            },
         });
         tl.to(".pole-1", {
            x: 0,
         })
            .to(
               ".base-1",
               {
                  y: 0,
               },
               "<"
            )
            .to(
               ".base-3",
               {
                  y: 0,
               },
               "<"
            )
            .to(".logo", {
               duration: 0.5,
               rotate: -30,
            });
      },
      { scope: containerRef }
   );
   return (
      <div className="logo-wrapper" ref={containerRef}>
         <div className="logo">
            <div className="logo__pole pole-1"></div>
            <div className="logo__pole pole-2" ref={logoPole2Ref}></div>
            <div className="logo__base base-1"></div>
            <div className="logo__base base-2" ref={logoBase2Ref}></div>
            <div className="logo__base base-3"></div>
         </div>
      </div>
   );
}

export default Logo;
