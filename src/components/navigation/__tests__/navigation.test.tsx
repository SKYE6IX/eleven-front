import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { useGSAP } from "@gsap/react";
import messages from "../../../../messages/en.json";
import Navigation from "../Navigation";

jest.mock("@gsap/react");

describe("Navigation component", () => {
   beforeEach(() => {
      (useGSAP as jest.Mock).mockReturnValue({
         contextSafe: jest.fn(),
      });
   });
   it("render site title", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <Navigation />
         </NextIntlClientProvider>
      );

      // Acts
      const siteTitle = screen.getByRole("heading", { level: 3 });

      // Assert
      expect(siteTitle).toBeInTheDocument();
      expect(siteTitle).toHaveTextContent("eleven");
   });

   it("render navigation menu items", () => {
      // Arrange
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <Navigation />
         </NextIntlClientProvider>
      );

      // Acts
      const menuItems = screen.getAllByTestId("navigation-menu-item");

      // Assert
      expect(menuItems.length).toBeGreaterThan(0);
      for (const el of menuItems) {
         expect(el).toBeInTheDocument();
      }
   });
});
