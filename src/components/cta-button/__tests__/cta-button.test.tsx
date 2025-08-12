import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import CtaButton from "../CtaButton";

describe("cta button components", () => {
   it("render the right text title", () => {
      // Arrange
      const mockText = "Start A Project";
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <CtaButton />
         </NextIntlClientProvider>
      );

      // Act
      const ctaText = screen.getByTestId("cta-button-text");

      // Assert
      expect(ctaText).toHaveTextContent(mockText);
   });

   it("render the icon", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <CtaButton />
         </NextIntlClientProvider>
      );

      // Act
      const icon = screen.getByTestId("cta-button-icon");

      // Assert
      expect(icon).toBeInTheDocument();
   });
});
