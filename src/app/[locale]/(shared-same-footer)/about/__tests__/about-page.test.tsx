import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../../../messages/en.json";
import AboutUs from "../page";

jest.mock("@gsap/react");
jest.mock("gsap");

describe("About us page", () => {
   it("render page title", () => {
      // Arrange
      render(
         <NextIntlClientProvider messages={messages} locale="en">
            <AboutUs />
         </NextIntlClientProvider>
      );

      // Act
      const pageTitle = screen.getByRole("heading", { level: 1 });

      // Assert
      expect(pageTitle).toHaveTextContent(
         "A small team building websites from start to finish"
      );
   });

   it("render all section headings on page correctly", () => {
      // Arrange
      const sectionHeadingMockTexts = [
         "What we believe",
         "Our team",
         "How we work",
         "What we do",
         "Technologies",
      ];
      render(
         <NextIntlClientProvider messages={messages} locale="en">
            <AboutUs />
         </NextIntlClientProvider>
      );

      // Act
      const sectionHeadings = screen.getAllByRole("heading", { level: 2 });

      // Assert
      expect(sectionHeadings.length).toEqual(5);
      sectionHeadings.forEach((el, idx) => {
         expect(el).toHaveTextContent(sectionHeadingMockTexts[idx]);
      });
   });

   it("render page text descriptions", () => {
      // Arrange
      render(
         <NextIntlClientProvider messages={messages} locale="en">
            <AboutUs />
         </NextIntlClientProvider>
      );

      // Act
      const pageTextDescriptions = screen.getAllByTestId("about-us-page-text");

      // Assert
      expect(pageTextDescriptions.length).toBeGreaterThan(0);
      for (const el of pageTextDescriptions) {
         expect(el).toBeInTheDocument();
      }
   });
});
