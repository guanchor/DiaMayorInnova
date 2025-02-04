import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FindNameUsers from "./FindNameUsers";

it("Debe renderizar el campo de búsqueda", () => {
  render(<FindNameUsers searchName="" setSearchName={() => { }} />);

  const input = screen.getByPlaceholderText("Escribe un nombre");
  expect(input).toBeInTheDocument();
});

it("Debe actualizar el estado cuando se escribe en el input", async () => {
  const setSearchName = vi.fn();
  render(<FindNameUsers searchName="" setSearchName={setSearchName} />);

  const input = screen.getByPlaceholderText("Escribe un nombre");
  await userEvent.type(input, "Juan");

  expect(setSearchName).toHaveBeenCalledTimes(4);
});
