"use client";
import React, { useState, useRef } from "react";
import Modal from "../modal/Modal";
import Button from "../button/Button";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ArrowUpIcon from "../icons/ArrowUpIcon";
import "./form.scss";

const leadSource = ["Google", "Yandex", "Linkendin", "Friend or Family"];
type FormProps = {
   isFormOpen: boolean;
   handleOpenForm: () => void;
};

const formInitialState = {
   name: "",
   email: "",
   phone: "",
   message: "",
};

function Form({ isFormOpen, handleOpenForm }: FormProps) {
   const t = useTranslations("ContactPage");
   const [selectedLeadSource, setSelectedLeadSource] = useState(leadSource[0]);
   const dropDownSelectionRef = useRef<HTMLUListElement>(null);
   const arrowRef = useRef<HTMLDivElement>(null);
   const dropDownTl = useRef<GSAPTimeline>(null);
   const [isDropDown, setIsDropDown] = useState(false);
   const [formState, setFromState] = useState(formInitialState);

   const { contextSafe } = useGSAP(
      () => {
         gsap.set(dropDownSelectionRef.current, {
            y: 50,
            autoAlpha: 0,
         });
         if (dropDownTl.current) {
            dropDownTl.current.kill();
         }
         dropDownTl.current = gsap
            .timeline({ paused: true })
            .to(dropDownSelectionRef.current, {
               y: 0,
               autoAlpha: 1,
               ease: "power2.inOut",
            })
            .to(
               arrowRef.current,
               {
                  rotate: 0,
                  ease: "none",
               },
               "<"
            );
      },
      { dependencies: [isFormOpen] }
   );

   const handleDropDown = contextSafe(() => {
      const currentState = !isDropDown;
      setIsDropDown(currentState);
      if (currentState) {
         dropDownTl.current?.play();
      } else {
         dropDownTl.current?.reverse();
      }
   });

   const handleSelectedSource = (newSelection: string) => {
      setSelectedLeadSource(newSelection);
      handleDropDown();
   };

   const handleOnChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      const { name, value } = e.target;
      setFromState((prvState) => ({
         ...prvState,
         [name]: value,
      }));
   };

   return (
      <Modal
         isOpen={isFormOpen}
         onModalClose={handleOpenForm}
         contentBackground="neutral"
      >
         <div className="form-block">
            <h3 className="form-block__heading-text">
               {t("form.headingText")}
            </h3>
            <h4 className="form-block__sub-heading-text">
               {t("form.subHeadingText")}
            </h4>
            <form action="">
               <div className="form-block__input-wrapper">
                  <div className="form-block__input-contaner">
                     <label
                        htmlFor="name"
                        className="form-block__input-label"
                        data-testid="form-label"
                     >
                        {t("form.label.name")}
                     </label>
                     <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-block__input"
                        placeholder={t("form.placeholder.name")}
                        value={formState.name}
                        onChange={handleOnChange}
                        data-testid="form-input"
                        required
                     />
                  </div>
                  <div className="form-block__input-contaner">
                     <label
                        htmlFor="email"
                        className="form-block__input-label"
                        data-testid="form-label"
                     >
                        {t("form.label.email")}
                     </label>
                     <input
                        type="text"
                        name="email"
                        id="email"
                        className="form-block__input"
                        placeholder={t("form.placeholder.email")}
                        value={formState.email}
                        onChange={handleOnChange}
                        data-testid="form-input"
                        required
                     />
                  </div>
                  <div className="form-block__input-contaner">
                     <label
                        htmlFor="phone"
                        className="form-block__input-label"
                        data-testid="form-label"
                     >
                        {t("form.label.phone")}
                     </label>
                     <input
                        type="text"
                        name="phone"
                        id="phone"
                        className="form-block__input"
                        placeholder={t("form.placeholder.phone")}
                        value={formState.phone}
                        onChange={handleOnChange}
                        data-testid="form-input"
                     />
                  </div>
                  <div className="form-block__input-contaner select">
                     <label
                        className="form-block__input-label"
                        id="hear-about-us"
                        data-testid="form-label"
                     >
                        {t("form.label.hearAboutUs")}
                     </label>
                     <div
                        className="form-block__input"
                        role="combobox"
                        aria-labelledby="hear-about-us"
                        aria-expanded={isDropDown}
                        aria-haspopup="listbox"
                        aria-owns="hear-about-us-listbox"
                        aria-controls=""
                        tabIndex={0}
                        onClick={handleDropDown}
                     >
                        <span className="selected-option">
                           {selectedLeadSource}
                        </span>
                        <div className="arrow-icon" ref={arrowRef}>
                           <ArrowUpIcon />
                        </div>
                     </div>
                     <ul
                        className="select-options-wrapper"
                        id="hear-about-us-listbox"
                        role="listbox"
                        aria-labelledby="hear-about-us"
                        ref={dropDownSelectionRef}
                     >
                        {leadSource.map((source) => (
                           <li
                              key={source}
                              role="option"
                              aria-selected={selectedLeadSource === source}
                              className="select-option"
                              tabIndex={-1}
                              onClick={() => handleSelectedSource(source)}
                           >
                              {source}
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div className="form-block__input-contaner text-area">
                     <label
                        htmlFor="message"
                        className="form-block__input-label"
                        data-testid="form-label"
                     >
                        {t("form.label.message")}
                     </label>
                     <textarea
                        name="message"
                        id="message"
                        className="form-block__input"
                        placeholder={t("form.placeholder.message")}
                        value={formState.message}
                        onChange={handleOnChange}
                        data-testid="form-input"
                        required
                     />
                  </div>
               </div>
               <Button textKey="submit" type="submit" />
            </form>
         </div>
      </Modal>
   );
}
export default Form;
