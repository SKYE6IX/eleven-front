"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./form-feedback.scss";

type FormFeedBackProps = {
   isSending: boolean;
   isSuccess: boolean;
   openFeedBack: boolean;
   isError: boolean;
   handleCloseFeedBack: () => void;
};

const FormFeedBack = React.memo(function FormFeedback({
   isSending,
   isSuccess,
   openFeedBack,
   handleCloseFeedBack,
   isError,
}: FormFeedBackProps) {
   const containerRef = useRef<HTMLDivElement>(null);
   useGSAP(
      () => {
         if (openFeedBack) {
            gsap.to(containerRef.current, {
               duration: 0.2,
               y: 0,
               autoAlpha: 1,
            });
         }
         if (!openFeedBack) {
            gsap.to(containerRef.current, {
               y: 100,
               autoAlpha: 0,
            });
         }
      },
      { dependencies: [openFeedBack] }
   );
   return (
      <div className="form-feedback" ref={containerRef}>
         <div className="form-feedback__content">
            <p
               className={[
                  "form-feedback__error-message",
                  isError ? "show" : "",
               ].join(" ")}
            >
               Something went wrong! Please try again
            </p>
            <button
               className={[
                  "form-feedback__close-button",
                  isSending ? "hide" : "",
               ].join(" ")}
               onClick={handleCloseFeedBack}
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 16 16"
                  fill="none"
               >
                  <path
                     d="M12.5 3.5L3.5 12.5"
                     stroke="#71717A"
                     strokeWidth="1.5"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  />
                  <path
                     d="M12.5 12.5L3.5 3.5"
                     stroke="#71717A"
                     strokeWidth="1.5"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  />
               </svg>
            </button>
            <div
               className={[
                  "form-feedback__success-icon",
                  isSuccess ? "show" : "",
               ].join(" ")}
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  viewBox="0 0 55 55"
                  fill="none"
               >
                  <path
                     d="M0 27.5C0 42.6882 12.3118 55 27.5 55C42.6882 55 55 42.6882 55 27.5C55 12.3118 42.6882 0 27.5 0C12.3118 0 0 12.3118 0 27.5Z"
                     fill="#8DE301"
                  />
                  <path
                     d="M24.4419 38.3072C24.0092 38.7399 23.3078 38.7399 22.8751 38.3072L12.7736 28.2057C12.341 27.7731 12.341 27.0716 12.7736 26.639L15.0954 24.3172C15.528 23.8846 16.2295 23.8846 16.6621 24.3172L23.6585 31.3136L38.4294 16.5401C38.8619 16.1075 39.5632 16.1073 39.9959 16.5397L42.3198 18.862C42.7527 19.2946 42.7528 19.9962 42.3201 20.429L24.4419 38.3072Z"
                     fill="white"
                  />
               </svg>
            </div>
            <div
               className={["loader", !isSending ? "hide" : ""].join(" ")}
            ></div>
         </div>
      </div>
   );
});

export default FormFeedBack;
