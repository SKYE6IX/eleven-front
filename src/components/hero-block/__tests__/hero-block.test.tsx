import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import HeroBlock from "../HeroBlock";

jest.mock("@gsap/react");

describe("Hero block component", () => {
   it("render block title", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <HeroBlock />
         </NextIntlClientProvider>
      );

      // Acts
      const blockTitle = screen.getByRole("heading", { level: 1 });

      // Assert
      expect(blockTitle).toBeInTheDocument();
      expect(blockTitle).toHaveTextContent(
         "We Are Web Developer In Moscow, Building Extraordinary Digital Experience."
      );
   });

   it("render block tagline", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <HeroBlock />
         </NextIntlClientProvider>
      );

      // Acts
      const blockTagline = screen.getByRole("heading", { level: 5 });

      // Assert
      expect(blockTagline).toBeInTheDocument();
      expect(blockTagline).toHaveTextContent("Crafting unique brand Identites");
   });

   it("render block images", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <HeroBlock />
         </NextIntlClientProvider>
      );

      // Acts
      const blockImages = screen.getAllByTestId("hero-block-image");

      // Assert
      expect(blockImages.length).toEqual(2);
      for (const el of blockImages) {
         expect(el).toBeInTheDocument();
      }
   });

   it("render block showcase text", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <HeroBlock />
         </NextIntlClientProvider>
      );

      // Acts
      const blockShowcaseTexts = screen.getAllByRole("heading", { level: 3 });

      // Assert
      expect(blockShowcaseTexts.length).toEqual(2);
      for (const el of blockShowcaseTexts) {
         expect(el).toBeInTheDocument();
      }
   });
});
