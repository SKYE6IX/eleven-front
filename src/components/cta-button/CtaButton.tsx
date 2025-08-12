import React from "react";
import { useTranslations } from "next-intl";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import "./cta-button.scss";

function CtaButton() {
   const t = useTranslations("CtaButton");
   return (
      <button className="cta-button">
         <span className="cta-button__text" data-testid="cta-button-text">
            {t("text")}
         </span>
         <span className="cta-button__icon" data-testid="cta-button-icon">
            <ArrowLeftIcon />
         </span>
      </button>
   );
}
export default CtaButton;
