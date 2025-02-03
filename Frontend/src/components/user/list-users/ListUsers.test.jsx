import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListUsers from "./ListUsers";
import ModalConfirmDelete from "../../modal/ModalConfirmDelete";
import userService from "../../../services/userService";

vi.mock('../../../services/userService');

const mockUsers = [
  { id: 1, name: "Juan Pérez", email: "juan@example.com", role: "student" },
  { id: 2, name: "María López", email: "maria@example.com", role: "teacher" }
];

test("Debe renderizar la lista de usuarios", () => {
  render(<ListUsers users={mockUsers} setUsers={() => { }} setSelectedUser={() => { }} />);

  expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
  expect(screen.getByText("(juan@example.com)")).toBeInTheDocument();
  expect(screen.getByText("student")).toBeInTheDocument();
  expect(screen.getByText("María López")).toBeInTheDocument();
  expect(screen.getByText("(maria@example.com)")).toBeInTheDocument();
  expect(screen.getByText("teacher")).toBeInTheDocument();
});

test("Debe llamar a setSelectedUser cuando se hace clic en editar", async () => {
  const setSelectedUser = vi.fn();
  render(<ListUsers users={mockUsers} setUsers={() => { }} setSelectedUser={setSelectedUser} />);

  fireEvent.click(screen.getAllByText('Editar')[0]);
  expect(setSelectedUser).toHaveBeenCalledWith(mockUsers[0]);
});

test("Debe abrir la modal cuando se hace clic en eliminar", () => {
  render(
    <>
      <ListUsers users={mockUsers} setUsers={() => { }} setSelectedUser={() => { }} />
      <ModalConfirmDelete isOpen={true} user={mockUsers[0]} onDelete={() => { }} onClose={() => { }} />
    </>
  );

  expect(screen.getByText(/Estás seguro de que deseas eliminar al usuario:/i)).toBeInTheDocument();
})

/* test("Debe borrar el usuario cuando la confirmación es aceptada", async () => {
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: "María López", email: "maria@example.com", role: "teacher" }
  ];
  const setUsers = vi.fn();

  userService.deleteUser.mockResolvedValueOnce();

  render(<ListUsers users={mockUsers} setUsers={setUsers} setSelectedUser={() => { }} />);

  const deleteButtons = screen.getAllByText("Eliminar");
  await userEvent.click(deleteButtons[0]);

  expect(screen.getByText(/Estás seguro de que deseas eliminar al usuario:/i)).toBeInTheDocument();

  const confirmButton = screen.getByTestId('confirm-delete-button');
  await userEvent.click(confirmButton[1]);

  expect(userService.deleteUser).toHaveBeenCalledWith(1);
  expect(setUsers).toHaveBeenCalledWith([mockUsers[1]]);
}); */

test("Debe llamar a handleDeleteClick cuando se hace clic en eliminar", async () => {
  const handleDeleteClick = vi.fn();
  render(<ListUsers users={mockUsers} setUsers={() => { }} setSelectedUser={handleDeleteClick} />);

  const deleteButton = screen.getAllByText("Eliminar")[0];
  await userEvent.click(deleteButton);

  expect(screen.getByText("María López")).toBeInTheDocument();
});


