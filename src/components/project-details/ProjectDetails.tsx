"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Modal from "../modal/Modal";
import Button from "../button/Button";
import projects from "../../projects-list.json";
import "./project-details.scss";

type ProjectDetailsProps = {
   projectKey: string;
   isModalOpen: boolean;
   toggleModal: (key: string) => void;
};

function ProjectDetails({
   isModalOpen,
   projectKey,
   toggleModal,
}: ProjectDetailsProps) {
   const t = useTranslations("ProjectDetails");
   const project = useMemo(() => {
      const project = projects["project-list"].find(
         (project) => project.key === projectKey
      );
      return project;
   }, [projectKey]);

   const handleOnModalClose = () => {
      toggleModal(projectKey);
   };

   return (
      <Modal
         isOpen={isModalOpen}
         onModalClose={handleOnModalClose}
         contentBackground="secondary-tint"
      >
         {project && (
            <div className="project-details__content">
               <div className="project-details__content-left">
                  <h3 className="project-details__title">{project.name}</h3>
                  <div className="project-details__action-wrapper">
                     <Button type="link" textKey="visitWebsite" href="#" />
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
                  {project.tags.includes("all-screen") && (
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
                  )}
                  {project.tags.includes("mobile-only") && (
                     <div
                        className="project-details__top-image-container blur"
                        style={{
                           backgroundImage: `url(${project.images[0]})`,
                        }}
                     >
                        <div className="project-details__project-image-container-blur" />
                        <Image
                           src={project.images[0]}
                           alt="Kasatkin"
                           fill={true}
                           priority
                           className="project-details__image"
                           data-testid="project-details-image"
                        />
                     </div>
                  )}

                  <div className="project-details__bottom-image-wrapper">
                     {project.tags.includes("all-screen") && (
                        <>
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
                        </>
                     )}
                     {project.tags.includes("mobile-only") && (
                        <>
                           <div
                              className="project-details__bottom-image-container blur"
                              style={{
                                 backgroundImage: `url(${project.images[1]})`,
                              }}
                           >
                              <div className="project-details__project-image-container-blur" />
                              <Image
                                 src={project.images[1]}
                                 alt="Kasatkin"
                                 fill={true}
                                 priority
                                 className="project-details__image"
                                 data-testid="project-details-image"
                              />
                           </div>
                           <div
                              className="project-details__bottom-image-container blur"
                              style={{
                                 backgroundImage: `url(${project.images[2]})`,
                              }}
                           >
                              <div className="project-details__project-image-container-blur" />
                              <Image
                                 src={project.images[2]}
                                 alt="Kasatkin"
                                 fill={true}
                                 priority
                                 className="project-details__image"
                                 data-testid="project-details-image"
                              />
                           </div>
                        </>
                     )}
                  </div>
               </div>
            </div>
         )}
      </Modal>
   );
}
export default ProjectDetails;
