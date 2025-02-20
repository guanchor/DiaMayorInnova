import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { expect, vi } from "vitest";
import StudentMark from "../StudentMark";
import userExerciseDataService from "../../../services/userExerciseDataService";


vi.mock("../../../services/userExerciseDataService", () => ({
  default: {
    getAll: vi.fn(),
  },
}));


describe("Componente StudentMark", () => {

  const mockData = [
    {
      id: 4,
      total_mark: 7.5,
      task: { title: "Contabiliza en el libro diario las operaciones que la empresa GAMONAL SL realiza durante el año 20X4" },
      marks: [
        {
          mark: "10.0",
          statement_id: 7,
          student_entries: [
            { entry_number: 1, entry_date: "2024-08-01" },
          ],
        },
        {
          mark: "5.0",
          statement_id: 8,
          student_entries: [
            { entry_number: 2, entry_date: "2024-08-03" },
          ],
        },
      ],
    },
  ];

  beforeEach(() => {
    userExerciseDataService.getAll.mockResolvedValue({ data: mockData });
    HTMLDialogElement.prototype.showModal = vi.fn(); // Mock showModal
    HTMLDialogElement.prototype.close = vi.fn();
  })


  test("Renderiza correctamente el componente <StudentMark />'", async () => {
    render(<StudentMark />);
    expect(screen.getByText("Calificaciones")).toBeInTheDocument();
  });


  test("Muestra datos correctamente cuando la API devuelve información", async () => {
    render(<StudentMark />);

    await waitFor(() => {
      expect(screen.getByText(/7\.5/)).toBeInTheDocument();
      expect(screen.getByText("Contabiliza en el libro diario las operaciones que la empresa GAMONAL SL realiza durante el año 20X4")).toBeInTheDocument();
    });


  });

  test("No muestra notas cuando `getAll` devuelve un array vacío", async () => {
    userExerciseDataService.getAll.mockResolvedValue({ data: [] });
    render(<StudentMark />);
    await waitFor(() => {
      expect(screen.queryByText("-")).not.toBeInTheDocument();
      expect(screen.queryByText("7.5")).not.toBeInTheDocument();
    });
  });

  test("Abre el modal al hacer clic en una calificación", async () => {
    render(<StudentMark />);

    await waitFor(() => {
      const markElement = screen.getByText("7.5");
      fireEvent.click(markElement);
    });

    await waitFor(() => {
      expect(screen.getByText("Ejercicio")).toBeInTheDocument();
    });
  });

});