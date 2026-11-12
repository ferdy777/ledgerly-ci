import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as Yup from "yup";
import Form from "../form";
import FormInput from ".";

const renderInput = () =>
  render(
    <Form
      initialValues={{ email: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Enter a valid email").required("Required"),
      })}
      onSubmit={() => {}}
    >
      {() => <FormInput name="email" label="Email" />}
    </Form>,
  );

describe("FormInput", () => {
  it("links the label to the input", () => {
    renderInput();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("shows a validation error after the field is touched", async () => {
    renderInput();
    const input = screen.getByLabelText("Email");
    await userEvent.type(input, "nope");
    await userEvent.tab();
    expect(await screen.findByText("Enter a valid email")).toBeInTheDocument();
  });

  it("shows no error for a valid value", async () => {
    renderInput();
    await userEvent.type(screen.getByLabelText("Email"), "ada@example.com");
    await userEvent.tab();
    expect(screen.queryByText("Enter a valid email")).not.toBeInTheDocument();
  });
});
