import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from "vitest";
import AddUsers from "./AddUsers";
import { faker } from '@faker-js/faker';

vi.mock("../../../services/userService.js", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    default: {
      createUser: vi.fn().mockResolvedValue({ data: { data: { user: {} } } }),
      updateUser: vi.fn().mockResolvedValue({ data: { data: { user: {} } } }),
    },
  };
});

beforeAll(() => {
  global.URL.createObjectURL = vi.fn().mockReturnValue('blob://dummy-url');
});

afterAll(() => {
  global.URL.createObjectURL.mockRestore();
});

describe("AddUsers Component", () => {
  const mockSetUsers = vi.fn();
  const mockSetSelectedUser = vi.fn();

  it("Debe renderizar el formulario correctamente", () => {
    render(<AddUsers setUsers={mockSetUsers} setSelectedUser={mockSetSelectedUser} />);
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirmar Password")).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Primer Apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Segundo Apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Introduzca una imagen de usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Seleccione un rol/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Registrar Usuario/i })).toBeInTheDocument();
  });

  it("Debe permitir la entrada de datos en los campos de texto", () => {
    render(<AddUsers setUsers={mockSetUsers} setSelectedUser={mockSetSelectedUser} />);
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByPlaceholderText("Password");
    const passwordConfirmationInput = screen.getByPlaceholderText("Confirmar Password");
    const nameInput = screen.getByLabelText(/Nombre/i);
    const firstLastNameInput = screen.getByLabelText(/Primer Apellido/i);
    const secondLastNameInput = screen.getByLabelText(/Segundo Apellido/i);
    
    const fakeEmail = faker.internet.email();
    const fakePassword = faker.internet.password();
    const fakeName = faker.person.firstName();
    const fakeFirstLastName = faker.person.lastName();
    const fakeSecondLastName = faker.person.lastName();

    fireEvent.change(emailInput, { target: { value: fakeEmail } });
    fireEvent.change(passwordInput, { target: { value: fakePassword } });
    fireEvent.change(passwordConfirmationInput, { target: { value: fakePassword } });
    fireEvent.change(nameInput, { target: { value: fakeName } });
    fireEvent.change(firstLastNameInput, { target: { value: fakeFirstLastName } });
    fireEvent.change(secondLastNameInput, { target: { value: fakeSecondLastName } });

    expect(emailInput.value).toBe(fakeEmail);
    expect(passwordInput.value).toBe(fakePassword);
    expect(passwordConfirmationInput.value).toBe(fakePassword);
    expect(nameInput.value).toBe(fakeName);
    expect(firstLastNameInput.value).toBe(fakeFirstLastName);
    expect(secondLastNameInput.value).toBe(fakeSecondLastName);
  });

  it("Debe actualizar el estado al seleccionar un archivo", () => {
    render(<AddUsers setUsers={mockSetUsers} setSelectedUser={mockSetSelectedUser} />);
    const fileInput = screen.getByLabelText(/Introduzca una imagen de usuario/i);
    const file = new File(["dummy content"], "test.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(fileInput.files[0]).toBe(file);
  });

  it("Debe cambiar el rol cuando se selecciona otro", () => {
    render(<AddUsers setUsers={mockSetUsers} setSelectedUser={mockSetSelectedUser} />);
    const roleSelect = screen.getByLabelText(/Seleccione un rol/i);
    fireEvent.change(roleSelect, { target: { value: "teacher" } });
    expect(roleSelect.value).toBe("teacher");
  });

  it("Debe mostrar error si las contraseñas no coinciden", async () => {
    render(<AddUsers setUsers={() => {}} selectedUser={null} setSelectedUser={() => {}} />);

    const emailInput = screen.getByLabelText('Correo electrónico');
    const passwordInput = screen.getByLabelText('Contraseña');
    const confirmPasswordInput = screen.getByLabelText('Confirmar contraseña');
    const nameInput = screen.getByLabelText('Nombre');
    const firstLastNameInput = screen.getByLabelText('Primer Apellido');
    const secondLastNameInput = screen.getByLabelText('Segundo Apellido');
    const submitButton = screen.getByRole('button', { name: /Registrar Usuario/i });

    await userEvent.type(emailInput, faker.internet.email());
    await userEvent.type(passwordInput, faker.internet.password());
    await userEvent.type(confirmPasswordInput, faker.internet.password());
    await userEvent.type(nameInput, faker.person.firstName());
    await userEvent.type(firstLastNameInput, faker.person.lastName());
    await userEvent.type(secondLastNameInput, faker.person.lastName());

    await userEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toHaveTextContent('Las contraseñas no coinciden o están vacías.');
    });
  });

  it("Debe mostrar el mensaje de usuario creado correctamente", async () => {
    render(<AddUsers setUsers={() => {}} selectedUser={null} setSelectedUser={() => {}} />);

    const emailInput = screen.getByLabelText('Correo electrónico');
    const passwordInput = screen.getByLabelText('Contraseña');
    const confirmPasswordInput = screen.getByLabelText('Confirmar contraseña');
    const nameInput = screen.getByLabelText('Nombre');
    const firstLastNameInput = screen.getByLabelText('Primer Apellido');
    const secondLastNameInput = screen.getByLabelText('Segundo Apellido');
    const submitButton = screen.getByRole('button', { name: /Registrar Usuario/i });

    const fakePassword = faker.internet.password();

    await userEvent.type(emailInput, faker.internet.email());
    await userEvent.type(passwordInput, fakePassword);
    await userEvent.type(confirmPasswordInput, fakePassword);
    await userEvent.type(nameInput, faker.person.firstName());
    await userEvent.type(firstLastNameInput, faker.person.lastName());
    await userEvent.type(secondLastNameInput, faker.person.lastName());

    await userEvent.click(submitButton);

    await waitFor(() => {
      const successMessage = screen.getByRole('alert');
      expect(successMessage).toHaveTextContent('El usuario se ha creado correctamente.');
    });
  });

  it("Debe mostrar error si se deja algún campo vacío", async () => {
    render(<AddUsers setUsers={() => {}} selectedUser={null} setSelectedUser={() => {}} />);

    const emailInput = screen.getByLabelText('Correo electrónico');
    const passwordInput = screen.getByLabelText('Contraseña');
    const confirmPasswordInput = screen.getByLabelText('Confirmar contraseña');
    const nameInput = screen.getByLabelText('Nombre');
    const firstLastNameInput = screen.getByLabelText('Primer Apellido');
    const secondLastNameInput = screen.getByLabelText('Segundo Apellido');
    const submitButton = screen.getByRole('button', { name: /Registrar Usuario/i });

    const fakePassword = faker.internet.password();

    await userEvent.type(emailInput, faker.internet.email());
    await userEvent.type(passwordInput, fakePassword);
    await userEvent.type(confirmPasswordInput, fakePassword);
    await userEvent.type(firstLastNameInput, faker.person.lastName());
    await userEvent.type(secondLastNameInput, faker.person.lastName());

    await userEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toHaveTextContent('Por favor, complete todos los campos obligatorios.');
    });
  });
});
