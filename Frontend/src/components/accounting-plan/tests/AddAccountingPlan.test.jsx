import {render, screen, fireEvent, waitFor} from "@testing-library/react"
import {it, vi} from "vitest";
import AddAccountingPlan from "../AddAccountingPlan";
import AccountingPlanDataService from "../../../services/AccountingPlanService";
import { MemoryRouter } from "react-router-dom";

//Mock del servicio de datos
vi.mock("../../../services/AccountingPlanService", () => ({
  //Mocker todo el módulo y el método Create
  default: {
    create:vi.fn(),
  },
}));


describe("AddAccountingPlan", () => {
  const mockSetNewPGC = vi.fn();

  beforeEach(() => {
    AccountingPlanDataService.create.mockResolvedValue({
      data: { id: 1, name: "Test PGC", description: "Test Description", acronym: "TPGC" },
    });
  });

  //Renderizado inicial
  it("Debería renderizar el formulario correctamente", () => {
    render(
      <MemoryRouter>
        <AddAccountingPlan setNewPGC={mockSetNewPGC}/>
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Acrónimo")).toBeInTheDocument();
    expect(screen.getByLabelText("Descripción")).toBeInTheDocument();
    expect(screen.getByText("Añadir plan")).toBeInTheDocument();

  });

    //TEST DE VALIDACIÓN DEL FORMULARIO
    it("Debería mostrar un mensaje de error si algún campo está vacío", async () => {
      render(
        <MemoryRouter>
          <AddAccountingPlan setNewPGC={mockSetNewPGC}/>
        </MemoryRouter>
      );

      fireEvent.click(screen.getByText("Añadir plan"));

      await waitFor(() => {
        expect(screen.getByText("Todos los campos son obligatorios y deben tener valores válidos.")).toBeInTheDocument();
      });
    });

    //TEST DE CAMBIOS DE VALOR EN LOS INPUTS
    it("Debería actualizar los valores cuando el usuario escribe", () => {
      render(
        <MemoryRouter>
          <AddAccountingPlan setNewPGC={mockSetNewPGC}/>
        </MemoryRouter>
      );

      const nameInput = screen.getByPlaceholderText("Nombre PGC");
      const acronymInput = screen.getByPlaceholderText("Acrónimo PGC");
      const descriptionInput = screen.getByPlaceholderText("Descripción PGC");

      fireEvent.change(nameInput, {target: {value: "Test PGC"}});
      fireEvent.change(acronymInput, {target: {value: "TPGC"}});
      fireEvent.change(descriptionInput, {target: {value: "Test Description"}});

      expect(nameInput.value).toBe("Test PGC");
      expect(acronymInput.value).toBe("TPGC");
      expect(descriptionInput.value).toBe("Test Description");
    });

    //TEST DE MANEJO DE ERRORES
    it("Debería mostrar un mensaje de error si el envío del formulario falla", async () => {
      //Resetea los mocks para evitar conflictos con beforeEach
      vi.resetAllMocks();

      //Mockey console.error para capturar el error
      const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});

      //Mockea la función para que devuelva el error
      AccountingPlanDataService.create.mockRejectedValue(new Error("Error al guardar"));

      render(
        <MemoryRouter>
          <AddAccountingPlan setNewPGC={mockSetNewPGC}/>
        </MemoryRouter>
      );

      fireEvent.change(screen.getByPlaceholderText("Nombre PGC"), {target: {value: "Test PGC"}});
      fireEvent.change(screen.getByPlaceholderText("Acrónimo PGC"), {target: {value: "TPGC"}});
      fireEvent.change(screen.getByPlaceholderText("Descripción PGC"), {target: {value: "Test Description"}});

      fireEvent.click(screen.getByText("Añadir plan"));
      
      await waitFor(() => {
        expect(screen.getByText("Hubo un problema al guardar el PGC.")).toBeInTheDocument();
      });

      //Limpia el mock de console.error
      consoleErrorMock.mockRestore();
    });
  });