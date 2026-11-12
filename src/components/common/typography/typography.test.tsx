import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Typography from ".";

describe("Typography", () => {
  it("renders a <p> with the body variant by default", () => {
    render(<Typography>Hello</Typography>);
    const el = screen.getByText("Hello");
    expect(el.tagName).toBe("P");
    expect(el).toHaveClass("text-[16px]");
  });

  it("renders the requested tag and variant", () => {
    render(
      <Typography as="h1" variant="heading-2">
        Title
      </Typography>,
    );
    const el = screen.getByRole("heading", { name: "Title" });
    expect(el).toHaveClass("text-[32px]");
  });

  it("applies responsive variants", () => {
    render(
      <Typography variant="body-small" desktopVariant="heading-4">
        Responsive
      </Typography>,
    );
    expect(screen.getByText("Responsive")).toHaveClass("lg:text-[26px]");
  });
});
