import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../messages/en.json";
import AboutUsBlock from "../AboutUsBlock";

jest.mock("@gsap/react");

describe("About us block component", () => {
   it("render block heading text", () => {
      // Arrrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <AboutUsBlock />
         </NextIntlClientProvider>
      );

      // Acts
      const blockHeadingText = screen.getByRole("heading", { level: 3 });

      // Assert
      expect(blockHeadingText).toBeInTheDocument();
      expect(blockHeadingText).toHaveTextContent(
         "Good design for great people, make life better!"
      );
   });

   it("render block text paragraph", () => {
      // Arrrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <AboutUsBlock />
         </NextIntlClientProvider>
      );

      // Acts
      const blockTextParagraph = screen.getByTestId("about-us-block-text");

      // Assert
      expect(blockTextParagraph).toBeInTheDocument();
   });
});
