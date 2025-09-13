"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import HyphenIcon from "@/components/icons/HyphenIcon";
import logo from "./logo.webp";
import "./about-us.scss";

function AboutUs() {
   const t = useTranslations("AboutUsPage");
   return (
      <div className="about-us-page">
         <div className="about-us-page__layer-effect" />
         <div className="about-us-page__logo-bg">
            <div className="about-us-page__image-container">
               <Image
                  src={logo}
                  alt="Eleven Web Development Agency Logo"
                  fill={true}
                  className="about-us-page__image"
               />
            </div>
         </div>

         <div className="about-us-page__inner-wrapper">
            {/* SECTION 1*/}
            <section className="about-us-page__who-we-are">
               <div className="about-us-page__who-we-are-content-wrapper">
                  <div className="about-us-page__who-we-are-heading-wrapper">
                     <h3 className="about-us-page__who-we-are-heading-text">
                        {t("whoWeAreBlock.headingText")}
                     </h3>
                     <span className="about-us-page__who-we-are-heading-icon">
                        <HyphenIcon />
                     </span>
                  </div>
                  <div className="about-us-page__who-we-are-text-wrapper">
                     <p className="about-us-page__who-we-are-text">
                        {t("whoWeAreBlock.text1")}
                     </p>
                     <p className="about-us-page__who-we-are-text">
                        {t("whoWeAreBlock.text2")}
                     </p>
                     <p className="about-us-page__who-we-are-text">
                        {t("whoWeAreBlock.text3")}
                     </p>
                  </div>
               </div>
            </section>

            {/* SECTION 2 */}
            <section className="about-us-page__who-believe">
               <div className="about-us-page__who-believe-content-wrapper">
                  <div className="about-us-page__who-believe-heading-wrapper">
                     <h3 className="about-us-page__who-believe-heading-text">
                        {t("whoBelieveBlock.headingText")}
                     </h3>
                     <span className="about-us-page__who-believe-heading-icon">
                        <HyphenIcon />
                     </span>
                  </div>
                  <div className="about-us-page__who-believe-text-wrapper">
                     <p className="about-us-page__who-believe-text">
                        {t("whoBelieveBlock.text1")}
                     </p>
                     <p className="about-us-page__who-believe-text">
                        {t("whoBelieveBlock.text2")}
                     </p>
                  </div>
               </div>
            </section>

            {/* SECTION 3 */}
            <section className="about-us-page__service">
               <div className="about-us-page__service-content-wrapper">
                  <div className="about-us-page__service-heading-wrapper">
                     <h3 className="about-us-page__service-heading-text">
                        {t("ourOfferingBlock.headingText")}
                     </h3>
                     <span className="about-us-page__service-heading-icon">
                        <HyphenIcon />
                     </span>
                  </div>

                  <div className="about-us-page__service-wrapper">
                     <h4 className="about-us-page__service-text">
                        {t("ourOfferingBlock.text")}
                     </h4>

                     <div>
                        <div className="about-us-page__service-item-container">
                           <h5 className="about-us-page__service-item-heading">
                              {t(
                                 "ourOfferingBlock.serviceList.strategy.headingText"
                              )}
                           </h5>
                           <ul className="about-us-page__service-list">
                              {["item1", "item2", "item3", "item4"].map(
                                 (item) => (
                                    <li
                                       className="about-us-page__service-list-item"
                                       key={item}
                                    >
                                       {t(
                                          `ourOfferingBlock.serviceList.strategy.list.${item}`
                                       )}
                                    </li>
                                 )
                              )}
                           </ul>
                        </div>

                        <div className="about-us-page__service-item-container">
                           <h5 className="about-us-page__service-item-heading">
                              {t(
                                 "ourOfferingBlock.serviceList.design.headingText"
                              )}
                           </h5>
                           <ul className="about-us-page__service-list">
                              {["item1", "item2", "item3"].map((item) => (
                                 <li
                                    className="about-us-page__service-list-item"
                                    key={item}
                                 >
                                    {t(
                                       `ourOfferingBlock.serviceList.design.list.${item}`
                                    )}
                                 </li>
                              ))}
                           </ul>
                        </div>

                        <div className="about-us-page__service-item-container">
                           <h5 className="about-us-page__service-item-heading">
                              {t(
                                 "ourOfferingBlock.serviceList.development.headingText"
                              )}
                           </h5>
                           <ul className="about-us-page__service-list">
                              {[
                                 "item1",
                                 "item2",
                                 "item3",
                                 "item4",
                                 "item5",
                              ].map((item) => (
                                 <li
                                    className="about-us-page__service-list-item"
                                    key={item}
                                 >
                                    {t(
                                       `ourOfferingBlock.serviceList.development.list.${item}`
                                    )}
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </div>
      </div>
   );
}

export default AboutUs;
