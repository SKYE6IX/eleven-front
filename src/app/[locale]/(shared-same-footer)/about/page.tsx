"use client";
import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/i18n/navigation";
import Button from "@/components/button/Button";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import "./about-us.scss";

const beliefs = ["item1", "item2", "item3"];
const team = [
   { key: "azeez", photo: "/team/azeez.jpg", focus: "center 0%" },
   { key: "anna", photo: "/team/anna.jpg", focus: "center 31%" },
];
const steps = ["step1", "step2", "step3", "step4", "step5"];
const services = [
   { key: "strategy", items: ["item1", "item2", "item3", "item4"] },
   { key: "design", items: ["item1", "item2", "item3"] },
   {
      key: "development",
      items: ["item1", "item2", "item3", "item4", "item5", "item6"],
   },
];
const technologies = [
   "Next.js",
   "React",
   "React Native",
   "Node.js",
   "Express",
   "Spring Boot",
   "Keystone.js",
   "Apollo GraphQL",
   "Redux",
   "GSAP",
   "Framer Motion",
   "SCSS",
   "next-intl",
   "Expo",
   "Telegram Mini Apps",
];

function AboutUs() {
   const t = useTranslations("AboutUsPage");
   const containerRef = useRef<HTMLDivElement>(null);

   useGSAP(
      () => {
         gsap.set(".about-page__reveal", { y: 40, autoAlpha: 0 });
         ScrollTrigger.batch(".about-page__reveal", {
            start: "top 90%",
            onEnter: (batch) => {
               gsap.to(batch, {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.7,
                  ease: "power2.out",
                  stagger: 0.12,
               });
            },
         });
      },
      { scope: containerRef }
   );

   return (
      <div className="about-page" ref={containerRef}>
         {/* HERO */}
         <section className="about-page__hero">
            <span className="about-page__eyebrow about-page__reveal">
               {t("hero.eyebrow")}
            </span>
            <h1 className="about-page__hero-title about-page__reveal">
               {t.rich("hero.title", {
                  span: (chunks) => <span className="highlight">{chunks}</span>,
               })}
            </h1>
            <p
               className="about-page__hero-text about-page__reveal"
               data-testid="about-us-page-text"
            >
               {t("hero.text")}
            </p>
            <div className="about-page__actions about-page__reveal">
               <Button type="link" textKey="contact" href="/contact" />
               <Link href="/work" className="button__link ghost">
                  <span className="button__text">{t("hero.viewWork")}</span>
                  <span className="button__icon">
                     <ArrowLeftIcon />
                  </span>
               </Link>
            </div>
         </section>

         {/* STATS */}
         <section className="about-page__stats">
            <div className="about-page__stat about-page__reveal">
               <span className="about-page__stat-value">
                  {t("stats.years.value")}
               </span>
               <p className="about-page__stat-label">{t("stats.years.label")}</p>
            </div>
            <div className="about-page__stat about-page__reveal">
               <span className="about-page__stat-value">
                  {t("stats.launch.value")}
               </span>
               <p className="about-page__stat-label">
                  {t("stats.launch.label")}
               </p>
            </div>
            <div className="about-page__stat about-page__reveal">
               <span className="about-page__stat-value">
                  {t("stats.inHouse.value")}
               </span>
               <p className="about-page__stat-label">
                  {t("stats.inHouse.label")}
               </p>
            </div>
            <div className="about-page__stat about-page__reveal">
               <span className="about-page__stat-value">
                  {t("stats.global.value")}
               </span>
               <p className="about-page__stat-label">
                  {t("stats.global.label")}
               </p>
            </div>
         </section>

         {/* BELIEFS */}
         <section className="about-page__section">
            <h2 className="about-page__section-title about-page__reveal">
               {t("beliefs.title")}
            </h2>
            <div className="about-page__beliefs">
               {beliefs.map((item, idx) => (
                  <div
                     className="about-page__belief about-page__reveal"
                     key={item}
                  >
                     <span className="about-page__belief-index">0{idx + 1}</span>
                     <h3 className="about-page__belief-title">
                        {t(`beliefs.items.${item}.title`)}
                     </h3>
                     <p
                        className="about-page__belief-text"
                        data-testid="about-us-page-text"
                     >
                        {t(`beliefs.items.${item}.text`)}
                     </p>
                  </div>
               ))}
            </div>
         </section>

         {/* TEAM */}
         <section className="about-page__section">
            <h2 className="about-page__section-title about-page__reveal">
               {t("team.title")}
            </h2>
            <div className="about-page__team">
               {team.map((member) => (
                  <article
                     className="about-page__member about-page__reveal"
                     key={member.key}
                  >
                     <div className="about-page__member-photo">
                        {member.photo ? (
                           <Image
                              src={member.photo}
                              alt={t(`team.members.${member.key}.name`)}
                              fill={true}
                              sizes="(max-width: 1024px) 100vw, 600px"
                              className="about-page__member-image"
                              style={{ objectPosition: member.focus }}
                           />
                        ) : (
                           <span className="about-page__member-initial">
                              {t(`team.members.${member.key}.initial`)}
                           </span>
                        )}
                     </div>
                     <div className="about-page__member-info">
                        <h3 className="about-page__member-name">
                           {t(`team.members.${member.key}.name`)}
                        </h3>
                        <span className="about-page__member-role">
                           {t(`team.members.${member.key}.role`)}
                        </span>
                        <p
                           className="about-page__member-text"
                           data-testid="about-us-page-text"
                        >
                           {t(`team.members.${member.key}.text`)}
                        </p>
                     </div>
                  </article>
               ))}
            </div>
         </section>

         {/* PROCESS */}
         <section className="about-page__section about-page__process">
            <div className="about-page__process-intro">
               <h2 className="about-page__section-title about-page__reveal">
                  {t("process.title")}
               </h2>
               <p className="about-page__section-text about-page__reveal">
                  {t("process.text")}
               </p>
               <div className="about-page__payment about-page__reveal">
                  <h3 className="about-page__payment-title">
                     {t("process.payment.title")}
                  </h3>
                  <p className="about-page__payment-text">
                     {t("process.payment.text")}
                  </p>
               </div>
            </div>
            <ol className="about-page__steps">
               {steps.map((step, idx) => (
                  <li className="about-page__step about-page__reveal" key={step}>
                     <span className="about-page__step-index">0{idx + 1}</span>
                     <div className="about-page__step-content">
                        <h3 className="about-page__step-title">
                           {t(`process.steps.${step}.title`)}
                        </h3>
                        <p className="about-page__step-text">
                           {t(`process.steps.${step}.text`)}
                        </p>
                     </div>
                  </li>
               ))}
            </ol>
         </section>

         {/* SERVICES */}
         <section className="about-page__section">
            <div className="about-page__section-head">
               <h2 className="about-page__section-title about-page__reveal">
                  {t("ourOfferingBlock.headingText")}
               </h2>
               <p className="about-page__section-text about-page__reveal">
                  {t("ourOfferingBlock.text")}
               </p>
            </div>
            <div className="about-page__services">
               {services.map((service) => (
                  <div
                     className="about-page__service about-page__reveal"
                     key={service.key}
                  >
                     <h3 className="about-page__service-title">
                        {t(
                           `ourOfferingBlock.serviceList.${service.key}.headingText`
                        )}
                     </h3>
                     <ul className="about-page__service-list">
                        {service.items.map((item) => (
                           <li className="about-page__service-item" key={item}>
                              {t(
                                 `ourOfferingBlock.serviceList.${service.key}.list.${item}`
                              )}
                           </li>
                        ))}
                     </ul>
                  </div>
               ))}
            </div>
         </section>

         {/* TECHNOLOGIES */}
         <section className="about-page__section about-page__tech">
            <div className="about-page__section-head">
               <h2 className="about-page__section-title about-page__reveal">
                  {t("tech.title")}
               </h2>
               <p className="about-page__section-text about-page__reveal">
                  {t("tech.text")}
               </p>
            </div>
            <ul className="about-page__tech-list about-page__reveal">
               {technologies.map((tech) => (
                  <li className="about-page__tech-item" key={tech}>
                     {tech}
                  </li>
               ))}
            </ul>
         </section>
      </div>
   );
}
export default AboutUs;
