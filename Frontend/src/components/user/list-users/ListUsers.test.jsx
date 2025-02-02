import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListUsers from "./ListUsers";

const mockUsers = [
  { id: 1, name: "Juan Pérez", email: "juan@example.com", role: "student" },
  { id: 2, name: "María López", email: "maria@example.com", role: "teacher" }
];

test("Debe renderizar la lista de usuarios", () => {
  render(<ListUsers users={mockUsers} setUsers={() => {}} setSelectedUser={() => {}} />);
  
  expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
  expect(screen.getByText("María López")).toBeInTheDocument();
});

test("Debe llamar a setSelectedUser cuando se hace clic en editar", async () => {
  const setSelectedUser = vi.fn();
  render(<ListUsers users={mockUsers} setUsers={() => {}} setSelectedUser={setSelectedUser} />);
  
  const editButton = screen.getAllByText("Editar")[0];
  await userEvent.click(editButton);

  expect(setSelectedUser).toHaveBeenCalledWith(mockUsers[0]);
});
