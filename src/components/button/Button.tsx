import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import "./button.scss";

interface ButtonProps {
   textKey: string;
   href: string;
   type: "link" | "submit";
}

function Button({ textKey, href, type }: ButtonProps) {
   const t = useTranslations("Button");
   return (
      <button className="button">
         {type === "link" && (
            <Link href={href} className="button__link">
               <span className="button__text" data-testid="button-text">
                  {t(`text.${textKey}`)}
               </span>
               <span className="button__icon" data-testid="button-icon">
                  <ArrowLeftIcon />
               </span>
            </Link>
         )}
         {type === "submit" && (
            <>
               <span className="button__text" data-testid="button-text">
                  {t(`text.${textKey}`)}
               </span>
               <span className="button__icon" data-testid="button-icon">
                  <ArrowLeftIcon />
               </span>
            </>
         )}
      </button>
   );
}
export default Button;
