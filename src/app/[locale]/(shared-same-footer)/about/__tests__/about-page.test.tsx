import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../../../messages/en.json";
import AboutUs from "../page";

jest.mock("@gsap/react");
jest.mock("gsap");

describe("About us page", () => {
   it("render all heading text on page correctly", () => {
      // Arrange
      const pageHeadingMockTexts = [
         "Who we are",
         "Who believe",
         "Our offering",
      ];
      render(
         <NextIntlClientProvider messages={messages} locale="en">
            <AboutUs />
         </NextIntlClientProvider>
      );

      // Act
      const pageHeadingTexts = screen.getAllByRole("heading", { level: 3 });

      // Assert
      expect(pageHeadingTexts.length).toEqual(3);
      let idx = 0;
      for (const el of pageHeadingTexts) {
         expect(el).toBeInTheDocument();
         expect(el).toHaveTextContent(pageHeadingMockTexts[idx]);
         idx++;
      }
   });

   it("render page logo background", () => {
      // Arrange
      render(
         <NextIntlClientProvider messages={messages} locale="en">
            <AboutUs />
         </NextIntlClientProvider>
      );

      // Act
      const pageLogoBg = screen.getByTestId("about-us-page-image");

      // Assert
      expect(pageLogoBg).toBeInTheDocument();
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
