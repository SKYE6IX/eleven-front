import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import "./button.scss";

interface ButtonProps {
   textKey: string;
   href?: string;
   type: "link" | "submit" | "toggle";
   handleClick?: () => void;
   disabled?: boolean;
   target?: boolean;
}

function Button({
   textKey,
   href,
   type,
   handleClick,
   disabled,
   target,
}: ButtonProps) {
   const t = useTranslations("Button");

   const submit = type === "submit" ? type : "button";

   return (
      <React.Fragment>
         {type === "link" && (
            <Link
               href={href ? href : ""}
               className="button__link"
               target={target ? "_blank" : ""}
               onClick={handleClick}
            >
               <span className="button__text" data-testid="button-text">
                  {t(`text.${textKey}`)}
               </span>
               <span className="button__icon" data-testid="button-icon">
                  <ArrowLeftIcon />
               </span>
            </Link>
         )}

         {(type === "submit" || type === "toggle") && (
            <button
               className="button"
               onClick={handleClick}
               type={submit}
               disabled={disabled}
            >
               <div className="button__content">
                  <span className="button__text" data-testid="button-text">
                     {t(`text.${textKey}`)}
                  </span>
                  <span className="button__icon" data-testid="button-icon">
                     <ArrowLeftIcon />
                  </span>
               </div>
            </button>
         )}
      </React.Fragment>
   );
}
export default Button;
