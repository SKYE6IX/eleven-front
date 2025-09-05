import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import WhyUsBlock from "../WhyUsBlock";

jest.mock("@gsap/react");

describe("Why us block component", () => {
   it("render block title", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <WhyUsBlock />
         </NextIntlClientProvider>
      );

      // Acts

      const blockTitle = screen.getByRole("heading", { level: 1 });

      // Assert
      expect(blockTitle).toBeInTheDocument();
      expect(blockTitle).toHaveTextContent("Why us?");
   });

   it("render block item index numbers", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <WhyUsBlock />
         </NextIntlClientProvider>
      );

      // Acts

      const blockItemsIndex = screen.getAllByRole("heading", { level: 5 });

      // Assert
      expect(blockItemsIndex.length).toEqual(3);
      for (const el of blockItemsIndex) {
         expect(el).toBeInTheDocument();
      }
   });

   it("render block item text", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <WhyUsBlock />
         </NextIntlClientProvider>
      );

      // Acts

      const blockItemsText = screen.getAllByTestId(
         "why-us-block-list-item-text"
      );

      // Assert
      expect(blockItemsText.length).toEqual(3);
      for (const el of blockItemsText) {
         expect(el).toBeInTheDocument();
      }
   });
});
