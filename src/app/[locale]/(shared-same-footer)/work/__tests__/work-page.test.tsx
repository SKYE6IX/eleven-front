import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { useGSAP } from "@gsap/react";
import messages from "../../../../../../messages/en.json";
import WorkPage from "../page";

jest.mock("@gsap/react");
jest.mock("gsap");

describe("Work page", () => {
   beforeEach(() => {
      (useGSAP as jest.Mock).mockReturnValue({
         contextSafe: jest.fn(),
      });
   });

   it("render page heading text", () => {
      // Arrange
      render(
         <NextIntlClientProvider messages={messages} locale="en">
            <WorkPage />
         </NextIntlClientProvider>
      );

      // Act
      const pageHeadingText = screen.getByRole("heading", { level: 3 });

      // Assert
      expect(pageHeadingText).toBeInTheDocument();
      expect(pageHeadingText).toHaveTextContent(
         "Let’s create distinctive website and digital experience."
      );
   });

   it("render page projects images", () => {
      // Arrange
      render(
         <NextIntlClientProvider messages={messages} locale="en">
            <WorkPage />
         </NextIntlClientProvider>
      );

      // Act
      const pageProjectImages = screen.getAllByTestId(
         "work-page-project-image"
      );

      // Assert
      expect(pageProjectImages.length).toEqual(7);
      for (const el of pageProjectImages) {
         expect(el).toBeInTheDocument();
      }
   });
});
