import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppButton from ".";

describe("AppButton", () => {
  it("calls onClick", async () => {
    const onClick = vi.fn();
    render(<AppButton onClick={onClick}>Save</AppButton>);
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("shows a pending state and blocks clicks while loading", async () => {
    const onClick = vi.fn();
    render(
      <AppButton isLoading onClick={onClick}>
        Save
      </AppButton>,
    );
    const button = screen.getByRole("button", { name: "Please wait…" });
    expect(button).toHaveAttribute("aria-busy", "true");
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
