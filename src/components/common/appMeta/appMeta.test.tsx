import { describe, expect, it } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppMeta from ".";

describe("AppMeta", () => {
  it("sets the document title from the route", async () => {
    render(
      <MemoryRouter initialEntries={["/members"]}>
        <AppMeta />
      </MemoryRouter>,
    );
    await waitFor(() => expect(document.title).toBe("Members · Ledgerly"));
  });
});
