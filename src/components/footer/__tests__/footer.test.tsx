import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import Footer from "../Footer";

jest.mock("@gsap/react");

describe("Footer component", () => {
   it("render footer heading text", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <Footer />
         </NextIntlClientProvider>
      );

      // Acts
      const footerHeadingText = screen.getByRole("heading", { level: 3 });

      // Assert
      expect(footerHeadingText).toBeInTheDocument();
   });

   it("render footer site title", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <Footer />
         </NextIntlClientProvider>
      );

      // Acts
      const footerSiteTitle = screen.getByRole("heading", { level: 1 });

      // Assert
      expect(footerSiteTitle).toBeInTheDocument();
      expect(footerSiteTitle).toHaveTextContent("ELEVEN");
   });

   it("render footer contact details", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <Footer />
         </NextIntlClientProvider>
      );
      const mockNumber = "+7 993 270 7338";
      const mockEmail = "hello@eleven.io";

      // Acts
      const footerContactItems = screen.getAllByTestId("footer-contact-item");

      // Assert
      expect(footerContactItems.length).toBeGreaterThan(0);
      for (const el of footerContactItems) {
         expect(el).toBeInTheDocument();
      }
      expect(footerContactItems[0]).toHaveTextContent(mockNumber);
      expect(footerContactItems[1]).toHaveTextContent(mockEmail);
   });
});
