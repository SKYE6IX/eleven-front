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
      <button
         className="button"
         onClick={handleClick}
         type={submit}
         disabled={disabled}
      >
         {type === "link" && (
            <Link
               href={href ? href : ""}
               className="button__link"
               target={target ? "_blank" : ""}
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
            <div className="button__content">
               <span className="button__text" data-testid="button-text">
                  {t(`text.${textKey}`)}
               </span>
               <span className="button__icon" data-testid="button-icon">
                  <ArrowLeftIcon />
               </span>
            </div>
         )}
      </button>
   );
}
export default Button;
