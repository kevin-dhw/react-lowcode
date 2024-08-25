import { render, fireEvent } from "@testing-library/react";
import Toggle from "./views/test";

test("toggle", () => {
  const { container } = render(<Toggle />);

  expect(container.querySelector("p")?.textContent).toBe("close");

  fireEvent.click(container.querySelector("button")!);

  expect(container.querySelector("p")?.textContent).toBe("open");
});
