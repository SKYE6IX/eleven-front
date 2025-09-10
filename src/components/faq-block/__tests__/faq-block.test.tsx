import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import FAQBlock from "../FAQBlock";

jest.mock("@gsap/react");

describe("FAQ block component", () => {
   it("render block title", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <FAQBlock />
         </NextIntlClientProvider>
      );

      // Acts
      const blockTitle = screen.getByRole("heading", { level: 3 });

      // Assert
      expect(blockTitle).toBeInTheDocument();
      expect(blockTitle).toHaveTextContent("Answers");
   });

   it("render block heading text", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <FAQBlock />
         </NextIntlClientProvider>
      );

      // Acts
      const blockHeadingText = screen.getByRole("heading", { level: 5 });

      // Assert
      expect(blockHeadingText).toBeInTheDocument();
   });

   it("render block image", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <FAQBlock />
         </NextIntlClientProvider>
      );

      // Acts
      const blockImage = screen.getByTestId("faq-block-image");

      // Assert
      expect(blockImage).toBeInTheDocument();
   });

   it("render all FAQ question", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <FAQBlock />
         </NextIntlClientProvider>
      );

      // Acts
      const faqQuestions = screen.getAllByRole("heading", { level: 4 });

      // Assert
      expect(faqQuestions.length).toBeGreaterThan(0);
      for (const el of faqQuestions) {
         expect(el).toBeInTheDocument();
      }
   });

   it("render all FAQ answers", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <FAQBlock />
         </NextIntlClientProvider>
      );

      // Acts
      const faqAnswers = screen.getAllByTestId("faq-answer");

      // Assert
      expect(faqAnswers.length).toBeGreaterThan(0);
      for (const el of faqAnswers) {
         expect(el).toBeInTheDocument();
      }
   });
});
