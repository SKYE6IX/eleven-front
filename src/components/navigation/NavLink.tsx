"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import Button from "../button/Button";
import "./navigation.scss";

function NavLink({
   navigationList,
   onNavigationChange,
}: {
   navigationList: { key: string; href: string }[];
   onNavigationChange: () => void;
}) {
   const t = useTranslations("Navigations");
   const pathname = usePathname();
   return (
      <nav>
         <ul className="header__menu-container large">
            {navigationList.map((nav) => (
               <li
                  key={nav.key}
                  className={[
                     "header__menu-item",
                     pathname === nav.href ? "active" : "",
                  ].join(" ")}
               >
                  <Link
                     href={nav.href}
                     className="header__menu-link"
                     data-testid="navigation-menu-item"
                  >
                     {t(nav.key)}
                  </Link>
               </li>
            ))}
         </ul>
         {/* MOBILE MENU WRAPPER*/}
         <ul className="header__menu-container small">
            {navigationList.map((nav) => (
               <li
                  key={nav.key}
                  className={[
                     "header__menu-item mobile-menu-item",
                     pathname === nav.href ? "active" : "",
                  ].join(" ")}
                  onClick={onNavigationChange}
               >
                  <Link
                     href={nav.href}
                     className="header__menu-link"
                     data-testid="navigation-menu-item"
                  >
                     {t(nav.key)}
                  </Link>
               </li>
            ))}
            <div className="header__button-wrapper small mobile-menu-item">
               <Button
                  type="link"
                  textKey="contact"
                  href="/contact"
                  handleClick={onNavigationChange}
               />
            </div>
         </ul>
      </nav>
   );
}
export default NavLink;
