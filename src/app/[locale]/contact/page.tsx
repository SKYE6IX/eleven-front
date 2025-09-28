"use client";
import React, { useState, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/logo/Logo";
import Footer from "@/components/footer/Footer";
import Button from "@/components/button/Button";
import Form from "@/components/form/Form";

import FormFeedBack from "@/components/form-feedback/FormFeedBack";
import "./contact.scss";

function Contact() {
   const locale = useLocale();
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

   const googleLinkWithLocale =
      locale === "ru"
         ? "https://docs.google.com/forms/d/1tYSBRHk-4U9HSECqBgDj9vS9Y0vI5l2lJrqB4b-SpkE/edit"
         : "https://docs.google.com/forms/d/17U-z6ZGJ55Wr3BoBg5sDwty201z7Rhb8-6WPXG3oSI8/edit";

   return (
      <>
         <div className="contact-page" ref={containerRef}>
            {/* <FormFeedBack /> */}
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
                     <div className="contact-page__buttons-wrapper">
                        <Button
                           type="toggle"
                           textKey="submitRequest"
                           handleClick={handleOpenForm}
                        />
                        <Link
                           href={googleLinkWithLocale}
                           hrefLang={locale}
                           className="contact-page__google-link"
                           target="_target"
                        >
                           <span>{t("googleLinkText")}</span>
                           <Image
                              src="/google-icon.png"
                              alt="Google Drive Icon"
                              height={40}
                              width={40}
                           />
                        </Link>
                     </div>
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
