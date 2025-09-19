"use client";
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CloseIcon from "../icons/CloseIcon";
import "./modal.scss";

type ModalProps = {
   isOpen: boolean;
   children: React.ReactNode;
   onModalClose: () => void;
   contentBackground: "secondary-tint" | "neutral";
};

function Modal({
   children,
   isOpen,
   onModalClose,
   contentBackground,
}: ModalProps) {
   const containerRef = useRef<HTMLElement>(null);
   const contentWrapperRef = useRef<HTMLDivElement>(null);
   const tl = useRef<GSAPTimeline>(null);
   const [isBrowser, setIsBrowser] = useState(false);

   useEffect(() => {
      setIsBrowser(true);
   }, []);

   const { contextSafe } = useGSAP(
      () => {
         if (!contentWrapperRef.current) return;
         const moveXValue = contentWrapperRef.current!.offsetLeft;
         if (tl.current) {
            tl.current.kill();
         }
         tl.current = gsap.timeline({
            defaults: {
               ease: "sine.inOut",
               duration: 0.7,
            },
            scrollTrigger: {
               trigger: ".modal__inner-child ",
               scroller: ".modal__inner-wrapper",
               start: "top top",
               end: "+=" + contentWrapperRef.current!.offsetTop,
               scrub: 0.5,
            },
         });
         tl.current
            .to(".modal__content-bg", {
               left: -moveXValue,
               right: -moveXValue,
               borderRadius: "0px 0px 0px 0px",
            })
            .to(
               ".modal__close-button",
               {
                  x: contentWrapperRef.current!.offsetLeft,
               },
               "<"
            );
         if (isOpen) {
            gsap.to(".modal__content-wrapper", {
               ease: "power2.out",
               y: 0,
            });
         }
      },
      { scope: containerRef, dependencies: [isOpen] }
   );
   const handleCloseModal = contextSafe(() => {
      gsap.to(".modal__content-wrapper", {
         ease: "power2.in",
         y: "100%",
      });
      gsap.set(".modal__content-bg", {
         clearProps: "borderRadius",
      });
      onModalClose();
   });

   if (isBrowser) {
      return createPortal(
         <section
            className={["modal", isOpen ? "modal-active" : ""].join(" ")}
            ref={containerRef}
         >
            <div className="modal__backdrop" />
            <div className="modal__inner-wrapper">
               <div className="modal__inner-child">
                  <div
                     className="modal__close-trigger"
                     onClick={handleCloseModal}
                  />
                  <div
                     className="modal__content-wrapper"
                     ref={contentWrapperRef}
                  >
                     <div
                        className={[
                           "modal__content-bg",
                           contentBackground,
                        ].join(" ")}
                     />
                     <button
                        className="modal__close-button"
                        onClick={handleCloseModal}
                     >
                        <CloseIcon />
                     </button>
                     {children}
                  </div>
               </div>
            </div>
         </section>,
         document.body
      );
   } else {
      return null;
   }
}
export default Modal;
