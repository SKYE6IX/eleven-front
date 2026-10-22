"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projects from "../../projects-list.json";
import ProjectDetails from "../project-details/ProjectDetails";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import { Link } from "@/i18n/navigation";
import "./project-showcase.scss";
import { useTranslations } from "next-intl";

function ProjectsShowcase() {
   const t = useTranslations("Common");
   const tProjects = useTranslations("Projects");
   const containerRef = useRef<HTMLElement>(null);
   const customCursor = useRef<HTMLDivElement>(null);
   const customCursorTween = useRef<GSAPTween>(null);
   const [projectKey, setProjectKey] = useState("");

   const showcaseProjects = projects["project-list"].filter((project) =>
      project.tags.includes("showcase")
   );

   const [isModalOpen, setIsModalOpen] = useState(false);
   const { contextSafe } = useGSAP(
      () => {
         gsap.set(customCursor.current, {
            scale: 0.3,
            autoAlpha: 0,
         });
         customCursorTween.current = gsap.to(customCursor.current, {
            paused: true,
            scale: 1,
            autoAlpha: 1,
         });
         gsap.set(".projects-showcase__image-container", {
            y: 100,
            autoAlpha: 0,
         });
         ScrollTrigger.batch(".projects-showcase__image-container", {
            interval: 0.1,
            batchMax: 3,
            onEnter: (batch) => {
               gsap.to(batch, {
                  ease: "sine.Out",
                  duration: 0.8,
                  autoAlpha: 1,
                  stagger: 0.3,
                  y: 0,
               });
            },
            onLeaveBack: (batch) =>
               gsap.to(batch, {
                  autoAlpha: 0,
                  y: 100,
                  ease: "sine.in",
                  stagger: 0.3,
               }),
            start: "-100 85%",
         });
         ScrollTrigger.addEventListener("refreshInit", () => {
            gsap.set(".projects-showcase__image-container", {
               y: 0,
               autoAlpha: 1,
            });
         });
      },
      { scope: containerRef }
   );

   const handleMouseEnter = contextSafe(() => {
      customCursorTween.current?.play();
   });
   const handleMouseLeave = contextSafe(() => {
      customCursorTween.current?.reverse();
   });
   const handleMouseMove = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
   ) => {
      if (!customCursor.current) return;
      customCursor.current.style.left = e.clientX + "px";
      customCursor.current.style.top = e.clientY + "px";
   };

   const toggleModal = (key: string) => {
      setProjectKey(key);
      setIsModalOpen(!isModalOpen);
   };

   return (
      <>
         <section className="projects-showcase" ref={containerRef}>
            <div className="project-showcase__custom-cursor" ref={customCursor}>
               <span className="project-showcase__custom-cursor-text">
                  {t("cursorLabel")}
               </span>
            </div>
            <div className="project-showcase__header">
               <h2 className="project-showcase__title">{t("featuredWork")}</h2>
               <Link href="/work" className="project-showcase__all-link">
                  <span>{t("allWork")}</span>
                  <ArrowLeftIcon />
               </Link>
            </div>
            <div className="project-showcase__inner-wrapper">
               {showcaseProjects.map((project) => (
                  <div
                     key={project.key}
                     className={[
                        "projects-showcase__image-container",
                        project.tags.includes("mobile-only") ? "mobile" : "",
                     ].join(" ")}
                     onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}
                     onMouseMove={handleMouseMove}
                     onClick={() => toggleModal(project.key)}
                  >
                     <div className="projects-showcase__media">
                        <Image
                           src={project.images[0]}
                           alt={project.name}
                           fill={true}
                           sizes="(max-width: 912px) 100vw, 1240px"
                           className="projects-showcase__image"
                           priority
                        />
                     </div>
                     <div className="projects-showcase__caption">
                        <h3 className="projects-showcase__name">
                           {project.name}
                        </h3>
                        <span className="projects-showcase__category">
                           {tProjects(`${project.key}.category`)}
                        </span>
                        <p className="projects-showcase__tagline">
                           {tProjects(`${project.key}.tagline`)}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </section>

         <ProjectDetails
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            projectKey={projectKey}
         />
      </>
   );
}
export default ProjectsShowcase;
