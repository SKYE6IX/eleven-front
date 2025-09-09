import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import ServiceListBlock from "../ServiceListBlock";

jest.mock("@gsap/react");

describe("Service list block", () => {
   it("Render block title", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <ServiceListBlock />
         </NextIntlClientProvider>
      );

      // Acts
      const blockTitle = screen.getByRole("heading", { level: 3 });

      // Assert
      expect(blockTitle).toBeInTheDocument();
      expect(blockTitle).toHaveTextContent("Services");
   });

   it("Render block heading text", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <ServiceListBlock />
         </NextIntlClientProvider>
      );

      // Acts
      const blockHeadingText = screen.getByRole("heading", { level: 5 });

      // Assert
      expect(blockHeadingText).toBeInTheDocument();
   });

   it("Render block image", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <ServiceListBlock />
         </NextIntlClientProvider>
      );

      // Acts
      const blockImage = screen.getByTestId("service-list-block-image");

      // Assert
      expect(blockImage).toBeInTheDocument();
   });
});
