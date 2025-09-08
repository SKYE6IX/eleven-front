import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import Button from "../Button";

describe("cta button components", () => {
   it("render the right text title", () => {
      // Arrange
      const mockText = "Start A Project";
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <Button type="link" textKey="contact" href="/contact" />
         </NextIntlClientProvider>
      );

      // Act
      const ctaText = screen.getByTestId("button-text");

      // Assert
      expect(ctaText).toHaveTextContent(mockText);
   });

   it("render the icon", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <Button type="link" textKey="contact" href="/contact" />
         </NextIntlClientProvider>
      );

      // Act
      const icon = screen.getByTestId("button-icon");

      // Assert
      expect(icon).toBeInTheDocument();
   });
});
