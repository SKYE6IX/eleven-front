"use client";
import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Logo from "@/components/logo/Logo";
import Footer from "@/components/footer/Footer";
import Button from "@/components/button/Button";
import Form from "@/components/form/Form";
import "./contact.scss";

function Contact() {
   const containerRef = useRef<HTMLDivElement>(null);
   const t = useTranslations("ContactPage");
   const [openForm, setOpenForm] = useState(false);
   const handleOpenForm = () => {
      setOpenForm(!openForm);
   };

   useGSAP(
      () => {
         gsap.from(".top", {
            duration: 1,
            x: 150,
            opacity: 0,
         });
         gsap.from(".bottom", {
            duration: 1,
            x: -150,
            opacity: 0,
         });
      },
      { scope: containerRef }
   );

   return (
      <>
         <div className="contact-page" ref={containerRef}>
            <div id="navigation-trigger" style={{ height: "80px" }} />
            <div className="contact-page__inner-wrapper">
               <div className="contact-page__content-wrapper">
                  <div className="contact-page__text-wrapper">
                     <h1 className="contact-page__heading-text">
                        <span className="contact-page__heading-text-span top">
                           {t("headingText.span1")}{" "}
                        </span>
                        <span className="contact-page__heading-text-span bottom">
                           {t("headingText.span2")}
                        </span>
                     </h1>
                     <Button
                        type="toggle"
                        textKey="submitRequest"
                        handleClick={handleOpenForm}
                     />
                  </div>
                  <div className="contact-page__logo-container">
                     <Logo />
                  </div>
               </div>
               <Footer />
            </div>
         </div>
         <Form isFormOpen={openForm} handleOpenForm={handleOpenForm} />
      </>
   );
}
export default Contact;
