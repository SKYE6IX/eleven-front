"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projects from "../../projects-list.json";
import ProjectDetails from "../project-details/ProjectDetails";
import "./project-showcase.scss";

function ProjectsShowcase() {
   const containerRef = useRef<HTMLElement>(null);
   const customCursor = useRef<HTMLDivElement>(null);
   const customCursorTl = useRef<GSAPTimeline>(null);
   const [projectKey, setProjectKey] = useState("");
   const showcaseProjects = projects["project-list"].filter((project) =>
      project.tags.includes("showcase")
   );
   const [isModalOpen, setIsModalOpen] = useState(false);
   const { contextSafe } = useGSAP(
      () => {
         customCursorTl.current = gsap.timeline({ paused: true }).fromTo(
            ".project-showcase__custom-cursor",
            {
               scale: 0.3,
               autoAlpha: 0,
            },
            {
               scale: 1,
               autoAlpha: 1,
            }
         );
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
      customCursorTl.current?.play();
   });
   const handleMouseLeave = contextSafe(() => {
      customCursorTl.current?.reverse();
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
                  Explore
               </span>
            </div>
            <div className="project-showcase__inner-wrapper">
               {showcaseProjects.map((project) => (
                  <div
                     className="projects-showcase__image-container"
                     key={project.key}
                     onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}
                     onMouseMove={handleMouseMove}
                     onClick={() => toggleModal(project.key)}
                  >
                     <Image
                        src={project.images[0]}
                        alt={project.name}
                        fill={true}
                        className="projects-showcase__image"
                        priority
                     />
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
