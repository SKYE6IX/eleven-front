import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import ProjectDetails from "../ProjectDetails";

describe("Project details component", () => {
   beforeEach(() => {
      jest.mock("@gsap/react", () => ({
         contextSafe: jest.fn(),
      }));
   });
   it("render project name", () => {
      // Arrange
      const mockToggle = jest.fn();
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <ProjectDetails
               projectKey="kasatkin"
               isModalOpen={true}
               toggleModal={mockToggle}
            />
         </NextIntlClientProvider>
      );

      // Acts
      const projectName = screen.getByRole("heading", { level: 3 });

      // Assert
      expect(projectName).toBeInTheDocument();
      expect(projectName).toHaveTextContent("Kasatkin");
   });

   it("render project detail category", () => {
      // Arrange
      const mockToggle = jest.fn();
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <ProjectDetails
               projectKey="kasatkin"
               isModalOpen={true}
               toggleModal={mockToggle}
            />
         </NextIntlClientProvider>
      );

      // Acts
      const projectCategory = screen.getByTestId("project-details-category");

      // Assert
      expect(projectCategory).toBeInTheDocument();
      expect(projectCategory).toHaveTextContent("Web Agency");
   });

   it("render project detail heading", () => {
      // Arrange
      const mockToggle = jest.fn();
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <ProjectDetails
               projectKey="kasatkin"
               isModalOpen={true}
               toggleModal={mockToggle}
            />
         </NextIntlClientProvider>
      );

      // Acts
      const projectHeading = screen.getByRole("heading", { level: 5 });

      // Assert
      expect(projectHeading).toBeInTheDocument();
   });

   it("render project detail description", () => {
      // Arrange
      const mockToggle = jest.fn();
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <ProjectDetails
               projectKey="kasatkin"
               isModalOpen={true}
               toggleModal={mockToggle}
            />
         </NextIntlClientProvider>
      );

      // Acts
      const projectDes = screen.getByTestId("project-details-description");

      // Assert
      expect(projectDes).toBeInTheDocument();
   });

   it("render project detail technologies used", () => {
      // Arrange
      const mockToggle = jest.fn();
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <ProjectDetails
               projectKey="kasatkin"
               isModalOpen={true}
               toggleModal={mockToggle}
            />
         </NextIntlClientProvider>
      );

      // Acts
      const projectTechnologies = screen.getAllByTestId("project-details-tech");

      // Assert
      expect(projectTechnologies.length).toBeGreaterThan(0);
      for (const el of projectTechnologies) {
         expect(el).toBeInTheDocument();
      }
   });

   it("render project detail images", () => {
      // Arrange
      const mockToggle = jest.fn();
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <ProjectDetails
               projectKey="kasatkin"
               isModalOpen={true}
               toggleModal={mockToggle}
            />
         </NextIntlClientProvider>
      );

      // Acts
      const projectImages = screen.getAllByTestId("project-details-image");

      // Assert
      expect(projectImages.length).toBeGreaterThan(0);
      for (const el of projectImages) {
         expect(el).toBeInTheDocument();
      }
   });
});
