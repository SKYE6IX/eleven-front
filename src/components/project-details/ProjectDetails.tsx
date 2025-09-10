"use client";
import React, { useRef, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import Modal from "../Modal";
import Button from "../button/Button";
import CloseIcon from "../icons/CloseIcon";
import projects from "../../projects-list.json";
import "./project-details.scss";

type ProjectDetailsProps = {
   projectKey: string;
   isModalOpen: boolean;
   toggleModal: (key: string) => void;
};

function ProjectDetails({
   isModalOpen,
   toggleModal,
   projectKey,
}: ProjectDetailsProps) {
   const t = useTranslations("ProjectDetails");
   const containerRef = useRef<HTMLElement>(null);
   const contentWrapperRef = useRef<HTMLDivElement>(null);
   const project = useMemo(() => {
      const project = projects["project-list"].find(
         (project) => project.key === projectKey
      );
      return project;
   }, [projectKey]);

   const { contextSafe } = useGSAP(
      () => {
         if (!contentWrapperRef.current) return;
         const contentWrapperLeft = contentWrapperRef.current.offsetLeft;
         const scrollTl = gsap.timeline({
            defaults: {
               ease: "sine.inOut",
               duration: 0.7,
            },
            scrollTrigger: {
               trigger: ".project-details__content-wrapper-outer",
               scroller: ".project-details__inner-wrapper",
               start: "top top",
               end: "+=" + contentWrapperLeft * 2,
               scrub: 0.5,
            },
         });
         scrollTl
            .to(".project-details__content-bg", {
               left: -contentWrapperLeft,
               right: -contentWrapperLeft,
               borderRadius: "0px 0px 0px 0px",
            })
            .to(
               ".project-details__close-button",
               {
                  x: contentWrapperLeft,
               },
               "<"
            );
         if (isModalOpen) {
            gsap.to(".project-details__content-wrapper", {
               ease: "none",
               y: 0,
            });
         }
      },
      { scope: containerRef, dependencies: [isModalOpen] }
   );

   const handleCloseModal = contextSafe(() => {
      gsap.to(".project-details__content-wrapper", {
         ease: "none",
         y: "100%",
      });
      toggleModal(project?.key as string);
   });

   return (
      <Modal>
         <section
            className={[
               "project-details",
               isModalOpen ? "modal-active" : "",
            ].join(" ")}
            ref={containerRef}
         >
            {project && (
               <>
                  <div className="project-details__layer" />
                  <div className="project-details__inner-wrapper">
                     <div className="project-details__content-wrapper-outer">
                        <div
                           className="project-details__modal-close-trigger"
                           onClick={handleCloseModal}
                        />
                        <div
                           className="project-details__content-wrapper"
                           ref={contentWrapperRef}
                        >
                           <div className="project-details__content-bg" />
                           <button
                              className="project-details__close-button"
                              onClick={handleCloseModal}
                           >
                              <CloseIcon />
                           </button>
                           <div className="project-details__content">
                              <div className="project-details__content-left">
                                 <h3 className="project-details__title">
                                    {project.name}
                                 </h3>
                                 <div className="project-details__action-wrapper">
                                    <Button
                                       type="link"
                                       textKey="visitWebsite"
                                       href="#"
                                    />
                                    <span
                                       className="project-details__category"
                                       data-testid="project-details-category"
                                    >
                                       {project.category}
                                    </span>
                                 </div>
                                 <h5 className="project-details__heading">
                                    {t(`${project.key}.heading`)}
                                 </h5>
                                 <p
                                    className="project-details__text"
                                    data-testid="project-details-description"
                                 >
                                    {t(`${project.key}.description`)}
                                 </p>
                                 <div className="project-details__tech-wrapper">
                                    <h6 className="project-details__tech-title">
                                       {t("technologiesUsed")}
                                    </h6>
                                    <ul className="project-details__tech-list">
                                       {project.technologies.map((tech) => (
                                          <li
                                             className="project-details__tech-list-item"
                                             key={tech}
                                             data-testid="project-details-tech"
                                          >
                                             {tech}
                                          </li>
                                       ))}
                                    </ul>
                                 </div>
                              </div>
                              <div className="project-details__content-right">
                                 <div className="project-details__top-image-container">
                                    <Image
                                       src={project.images[0]}
                                       alt="Kasatkin"
                                       fill={true}
                                       priority
                                       className="project-details__image"
                                       data-testid="project-details-image"
                                    />
                                 </div>
                                 <div className="project-details__bottom-image-wrapper">
                                    <div className="project-details__bottom-image-container">
                                       <Image
                                          src={project.images[1]}
                                          alt="Kasatkin"
                                          fill={true}
                                          priority
                                          className="project-details__image"
                                          data-testid="project-details-image"
                                       />
                                    </div>
                                    <div className="project-details__bottom-image-container">
                                       <Image
                                          src={project.images[2]}
                                          alt="Kasatkin"
                                          fill={true}
                                          priority
                                          className="project-details__image"
                                          data-testid="project-details-image"
                                       />
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </>
            )}
         </section>
      </Modal>
   );
}
export default ProjectDetails;
