"use client";
import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Modal from "../modal/Modal";
import Button from "../button/Button";
import FormFeedBack from "../form-feedback/FormFeedBack";
import ArrowUpIcon from "../icons/ArrowUpIcon";
import { sendMail } from "./action";
import { validate, FormFields } from "./validateFormIFields";
import "./form.scss";

type FormProps = {
   isFormOpen: boolean;
   handleOpenForm: () => void;
};

const leadSource = ["Google", "Yandex", "Linkendin", "Friend or Family"];
const formInitialState = {
   name: "",
   email: "",
   phone: "",
   message: "",
};

const initialFormStatus = {
   openFeedBack: false,
   isSending: false,
   isSuccess: false,
   isError: false,
};

function Form({ isFormOpen, handleOpenForm }: FormProps) {
   const t = useTranslations("ContactPage");
   const [selectedLeadSource, setSelectedLeadSource] = useState(leadSource[0]);
   const dropDownSelectionRef = useRef<HTMLUListElement>(null);
   const arrowRef = useRef<HTMLDivElement>(null);
   const dropDownTl = useRef<GSAPTimeline>(null);
   const [isDropDown, setIsDropDown] = useState(false);
   const [formState, setFromState] = useState(formInitialState);
   const [errorFeilds, setErrorFeilds] = useState<string[]>([]);
   const [formStatus, setFormStatus] = useState(initialFormStatus);

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
      if (errorFeilds.includes(name)) {
         setErrorFeilds((prevState) =>
            prevState.filter((prev) => prev !== name)
         );
      }
   };
   const formAction = async (formFields: FormFields) => {
      await sendMail(formFields)
         .then((res) => {
            setFormStatus((prvState) => ({
               ...prvState,
               isSending: false,
               isSuccess: res.status === "ok",
               isError: res.status === "error",
            }));
         })
         .catch((err) => {
            console.error(err);
            setFormStatus((prvState) => ({
               ...prvState,
               isSending: false,
               isError: true,
            }));
         });
   };

   const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
         formData.append(key, value);
      });
      formData.set("leadSource", selectedLeadSource);
      const validatedFields = validate(formData);
      if (validatedFields.error) {
         validatedFields.error.issues.forEach((issue) => {
            setErrorFeilds((prevState) => [
               ...prevState,
               issue.path[0].toString(),
            ]);
         });
         return;
      }
      setFormStatus((prvState) => ({
         ...prvState,
         openFeedBack: true,
         isSending: true,
      }));
      formAction(validatedFields.data);
   };
   const handleCloseFeedBack = () => {
      setFormStatus(initialFormStatus);
      if (!formStatus.isError) {
         setFromState(formInitialState);
         setSelectedLeadSource(leadSource[0]);
      }
   };
   const triggerOpenForm = () => {
      handleOpenForm();
      handleCloseFeedBack();
   };
   return (
      <Modal
         isOpen={isFormOpen}
         onModalClose={triggerOpenForm}
         contentBackground="neutral"
      >
         <div className="form-block">
            <FormFeedBack
               isSuccess={formStatus.isSuccess}
               isError={formStatus.isError}
               openFeedBack={formStatus.openFeedBack}
               isSending={formStatus.isSending}
               handleCloseFeedBack={handleCloseFeedBack}
            />
            <h3 className="form-block__heading-text">
               {t("form.headingText")}
            </h3>
            <h4 className="form-block__sub-heading-text">
               {t("form.subHeadingText")}
            </h4>
            <form onSubmit={handleSumbit}>
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
                        className={[
                           "form-block__input",
                           errorFeilds.includes("name") ? "error" : "",
                        ].join(" ")}
                        placeholder={t("form.placeholder.name")}
                        value={formState.name}
                        onChange={handleOnChange}
                        data-testid="form-input"
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
                        className={[
                           "form-block__input",
                           errorFeilds.includes("email") ? "error" : "",
                        ].join(" ")}
                        placeholder={t("form.placeholder.email")}
                        value={formState.email}
                        onChange={handleOnChange}
                        data-testid="form-input"
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
                        className={[
                           "form-block__input",
                           errorFeilds.includes("message") ? "error" : "",
                        ].join(" ")}
                        placeholder={t("form.placeholder.message")}
                        value={formState.message}
                        onChange={handleOnChange}
                        data-testid="form-input"
                     />
                  </div>
               </div>
               <Button
                  textKey="submit"
                  type="submit"
                  disabled={formStatus.isSending}
               />
            </form>
         </div>
      </Modal>
   );
}
export default Form;
