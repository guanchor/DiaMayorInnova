import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from "vitest";
import UserManagement from './UserManagement';
import userEvent from "@testing-library/user-event";
import userService from '../../services/userService';
import { faker } from '@faker-js/faker';

vi.mock('../../services/userService', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    default: {
      getAllUsers: vi.fn(),
      deleteUser: vi.fn().mockResolvedValue({ message: "User deleted" }),
    },
  };
});

describe('UserManagement Component', () => {

  const fakeName1 = faker.person.firstName();
  const fakeEmail1 = faker.internet.email();
  const fakeName2 = faker.person.firstName();
  const fakeEmail2 = faker.internet.email();

  const mockUsers = [
    { id: 1, name: fakeName1, email: fakeEmail1, role: 'student' },
    { id: 2, name: fakeName2, email: fakeEmail2, role: 'teacher' },
  ];

  beforeEach(() => {
    userService.getAllUsers.mockResolvedValue({
      data: {
        data: {
          users: mockUsers,
        },
      },
    });
  });

  it('Debe renderizar la lista de usuarios', async () => {

    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.getByText(fakeName1)).toBeInTheDocument();
      expect(screen.getByText(fakeName2)).toBeInTheDocument();
    });
  });

  it('Debe cargar los datos del usuario en el formulario cuando se pulse el botón editar', async () => {
    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.getByText(fakeName1)).toBeInTheDocument();
    });

    const emailInput = screen.getByLabelText('Correo electrónico');
    const nameInput = screen.getByLabelText('Nombre');

    const roleSelect = screen.getByLabelText(/Seleccione un rol/i);
    const editButtons = screen.getAllByRole('button', { name: /editar/i });
    const editButton = editButtons[0];
    fireEvent.click(editButton);

    expect(emailInput.value).toBe(fakeEmail1);
    expect(nameInput.value).toBe(fakeName1);
    expect(roleSelect.value).toBe("student");
  })

  it('Debe eliminar un usuario al confirmar la eliminación en el modal', async () => {
    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.getByText(fakeName1)).toBeInTheDocument();
      expect(screen.getByText(fakeName2)).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole("button", { name: "Eliminar" });
    expect(deleteButtons).toHaveLength(mockUsers.length);

    await userEvent.click(deleteButtons[0]);

    const modalText = await screen.findByText(
      `¿Estás seguro de que deseas eliminar al usuario: ${mockUsers[0].name}?`
    );
    expect(modalText).toBeInTheDocument();

    const confirmDeleteButton = screen.getByTestId("confirm-delete-button");
    await userEvent.click(confirmDeleteButton);

    await waitFor(() => {
      expect(screen.queryByText(mockUsers[0].name)).not.toBeInTheDocument();
    });

    expect(userService.deleteUser).toHaveBeenCalledWith(mockUsers[0].id);
  })
});