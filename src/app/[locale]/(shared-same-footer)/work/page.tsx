"use client";
import React, { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import projects from "../../../../projects-list.json";
import ProjectDetails from "@/components/project-details/ProjectDetails";
import "./work-page.scss";

function WorkPage() {
   const t = useTranslations("WorkPage");
   const containerRef = useRef<HTMLDivElement>(null);
   const innerWrapperRef = useRef<HTMLDivElement>(null);
   const customCursor = useRef<HTMLDivElement>(null);
   const customCursorTween = useRef<GSAPTween>(null);

   const [projectKey, setProjectKey] = useState("");
   const [isModalOpen, setIsModalOpen] = useState(false);

   const { contextSafe } = useGSAP(
      () => {
         const mm = gsap.matchMedia();
         const getClipPathValue = (radius: string) => {
            const innerWrapperLeft = innerWrapperRef.current!.offsetLeft;
            const moveX = innerWrapperLeft / 2;
            return `inset(0px ${moveX}px 0px ${moveX}px round 0px 0px ${radius}px ${radius}px)`;
         };
         const getEndValue = () => {
            const innerWrapperLeft = innerWrapperRef.current!.offsetLeft;
            return "+=" + innerWrapperLeft * 2;
         };

         mm.add("(min-width: 1200px)", () => {
            gsap.to(".work-page__layer", {
               duration: 1.5,
               clipPath: () => getClipPathValue("60"),
               ease: "power1.out",
               scrollTrigger: {
                  trigger: containerRef.current,
                  start: "clamp(bottom 90%)",
                  end: () => getEndValue(),
                  scrub: 1,
                  invalidateOnRefresh: true,
               },
            });
         });
         mm.add("(max-width: 912px)", () => {
            gsap.to(".work-page__layer", {
               duration: 1.5,
               clipPath: () => getClipPathValue("30"),
               ease: "power1.out",
               scrollTrigger: {
                  trigger: containerRef.current,
                  start: "clamp(bottom 90%)",
                  end: () => getEndValue(),
                  scrub: 1,
                  invalidateOnRefresh: true,
               },
            });
         });

         SplitText.create(".work-page__heading-text", {
            type: "lines",
            autoSplit: true,
            onSplit: (self) => {
               return gsap.from(self.lines, {
                  duration: 1,
                  y: 100,
                  opacity: 0,
                  stagger: 0.2,
                  ease: "power2.out",
               });
            },
         });

         gsap.set(customCursor.current, {
            scale: 0.3,
            autoAlpha: 0,
         });
         if (customCursorTween.current) {
            customCursorTween.current.kill();
         }
         customCursorTween.current = gsap.to(customCursor.current, {
            paused: true,
            scale: 1,
            autoAlpha: 1,
         });
         gsap.set(".work-page__project-image-container", {
            y: 100,
            opacity: 0,
         });
         ScrollTrigger.batch(".work-page__project-image-container", {
            interval: 0.1,
            batchMax: 3,
            onEnter: (batch) => {
               gsap.to(batch, {
                  ease: "power2.out",
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
                  ease: "power1.out",
                  stagger: 0.3,
               }),
            start: "-100 90%",
         });
         ScrollTrigger.addEventListener("refreshInit", () => {
            gsap.set(".work-page__project-image-container", {
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

   const prefix = process.env.NODE_ENV === "production" ? "/eleven-front" : "";
   return (
      <>
         <div className="work-page" ref={containerRef}>
            <div className="work-page__layer" />
            <div className="work-page__inner-wrapper" ref={innerWrapperRef}>
               <div className="work-page__custom-cursor" ref={customCursor}>
                  <span className="work-page__custom-cursor-text">Explore</span>
               </div>
               <h3 className="work-page__heading-text">{t("headingText")}</h3>
               <section className="work-page__project-list">
                  {projects["project-list"].map((project) => (
                     <React.Fragment key={project.key}>
                        {project.tags.includes("all-screen") && (
                           <div
                              className="work-page__project-image-container"
                              onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}
                              onMouseMove={handleMouseMove}
                              onClick={() => toggleModal(project.key)}
                           >
                              <Image
                                 src={prefix + project.images[0]}
                                 alt={project.name}
                                 fill={true}
                                 className="work-page__project-image"
                                 data-testid="work-page-project-image"
                              />
                           </div>
                        )}
                        {project.tags.includes("mobile-only") && (
                           <div
                              className="work-page__project-image-container blur"
                              style={{
                                 backgroundImage: `url(${
                                    prefix + project.images[0]
                                 })`,
                              }}
                              onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}
                              onMouseMove={handleMouseMove}
                              onClick={() => toggleModal(project.key)}
                           >
                              <div className="work-page__project-image-container-blur" />
                              <Image
                                 src={prefix + project.images[0]}
                                 alt={project.name}
                                 fill={true}
                                 className="work-page__project-image"
                                 data-testid="work-page-project-image"
                              />
                           </div>
                        )}
                     </React.Fragment>
                  ))}
               </section>
            </div>
         </div>
         <ProjectDetails
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            projectKey={projectKey}
         />
      </>
   );
}

export default WorkPage;
