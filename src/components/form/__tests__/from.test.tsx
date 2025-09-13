import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { useGSAP } from "@gsap/react";
import userEvent from "@testing-library/user-event";
import messages from "../../../../messages/en.json";
import Form from "../Form";

jest.mock("gsap");
jest.mock("@gsap/react");

describe("Form Component", () => {
   beforeEach(() => {
      (useGSAP as jest.Mock).mockReturnValue({
         contextSafe: jest.fn(),
      });
   });

   it("render form heading text", () => {
      // Arrange
      const mockHanleFormOpen = jest.fn();
      render(
         <NextIntlClientProvider messages={messages} locale="en">
            <Form isFormOpen={true} handleOpenForm={mockHanleFormOpen} />
         </NextIntlClientProvider>
      );

      // Act
      const formHeadingText = screen.getByRole("heading", { level: 3 });

      // Assert
      expect(formHeadingText).toBeInTheDocument();
      expect(formHeadingText).not.toHaveTextContent("Let’s get started ");
   });

   it("render form sub heading text", () => {
      // Arrange
      const mockHanleFormOpen = jest.fn();
      render(
         <NextIntlClientProvider messages={messages} locale="en">
            <Form isFormOpen={true} handleOpenForm={mockHanleFormOpen} />
         </NextIntlClientProvider>
      );

      // Act
      const formSubHeadingText = screen.getByRole("heading", { level: 4 });

      // Assert
      expect(formSubHeadingText).toBeInTheDocument();
   });

   it("render all label in form", () => {
      // Arrange
      const mockHanleFormOpen = jest.fn();
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <Form isFormOpen={true} handleOpenForm={mockHanleFormOpen} />
         </NextIntlClientProvider>
      );

      // Act
      const labels = screen.getAllByTestId("form-label");

      // Assert
      expect(labels).toHaveLength(5);
      for (const el of labels) {
         expect(el).toBeInTheDocument();
      }
   });

   it("render all input in the form and check their attribute", () => {
      // Arrange
      const mockHanleFormOpen = jest.fn();
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <Form isFormOpen={true} handleOpenForm={mockHanleFormOpen} />
         </NextIntlClientProvider>
      );

      // Act
      const inputs = screen.getAllByTestId("form-input");

      // Assert
      expect(inputs).toHaveLength(4);

      for (const el of inputs) {
         expect(el).toBeInTheDocument();
         if ((el as HTMLInputElement).name === "phone") {
            expect(el).not.toHaveAttribute("required");
         } else {
            expect(el).toHaveAttribute("required");
         }
         expect(el).toHaveAttribute("placeholder");
      }
   });

   it("accept user to type into all inputs", async () => {
      // Arrange
      const mockHanleFormOpen = jest.fn();
      const user = userEvent.setup();
      render(
         <NextIntlClientProvider locale="en" messages={messages}>
            <Form isFormOpen={true} handleOpenForm={mockHanleFormOpen} />
         </NextIntlClientProvider>
      );

      // Act
      const inputs = screen.getAllByTestId("form-input");

      // Assert
      expect(document.body).toHaveFocus();
      for (const el of inputs) {
         await user.type(el, "Test Value");
         expect(el).toHaveValue("Test Value");
      }
   });
});
