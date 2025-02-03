import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { it, vi } from "vitest"
import AccountingPlansList from "../ListAccountingPlan";
import AccountingPlanDataService from "../../../services/AccountingPlanService"
import { MemoryRouter } from "react-router-dom";

// Mock del servicio de datos
vi.mock("../../../services/AccountingPlanService")

describe("AccoutingPlansList", () => {

  const mockData = [
    {id: 1, name: "PGC test 1", description: "Fake accounting plan for try test in React", acronym: "Test1"},
    {id: 2, name: "PGC test 2", description: "Fake accounting plan for try test in React", acronym: "Test2"},
  ];
    
  beforeEach(() => {
    AccountingPlanDataService.getAll.mockResolvedValue({data: mockData});
  })

  //TEST DE CARGA DE DATOS Y RENDERIZADO
  it("Debería renderizar los PGC cuando se obtienen correctamente", async () => {

    render(
      <MemoryRouter>
        <AccountingPlansList newPGC={false}/>
      </MemoryRouter>
    );

    //Verifica que los PGC se han renderizado
    await waitFor(() => {
      expect(screen.getByText("PGC test 1")).toBeInTheDocument();
      expect(screen.getByText("PGC test 2")).toBeInTheDocument();
    });
  });

  it("Mostrar mensaje si no existen PGC", async () => {
    AccountingPlanDataService.getAll.mockResolvedValue({ data: [] });

    render(
      <MemoryRouter>
        <AccountingPlansList newPGC={false}/>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("No hay PGCs disponibles")).toBeInTheDocument();
    });
  });


  // TEST DE BÚSQUEDA
  it("Debería filtrar todos los PGC por nombre", async () => {

    AccountingPlanDataService.getAll.mockResolvedValue({data: mockData});

    render(
      <MemoryRouter>
        <AccountingPlansList newPGC={false}/>
      </MemoryRouter>
    );

    //Simula  la búsqueda
    const searchInput = screen.getByPlaceholderText("Filtrar por nombre")
    fireEvent.change(searchInput, {target: {value: "PGC test 1"} });
    fireEvent.submit(searchInput);

    await waitFor(() => {
      //Comprobar que solo se muestra el PGC test 1
      expect(screen.getByText("PGC test 1")).toBeInTheDocument();
      expect(screen.queryByText("PGC test 2")).toBeNull();
    });
  });

  //TEST DE ORDENACIÓN
  it("Debería ordenar los PGC por nombre ascendente y descendentemente", async () => {
    render(
      <MemoryRouter>
        <AccountingPlansList newPGC={false} />
      </MemoryRouter>
    );

    // Verifica el orden inicial (ASCENDENTE)
    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      expect(rows[1]).toHaveTextContent("PGC test 1");
      expect(rows[2]).toHaveTextContent("PGC test 2");
    });

    // Simula el clic para cambiar el orden
    const nameHeader = screen.getByText("Nombre PGC");
    fireEvent.click(nameHeader);

    // Comprueba el orden descendente
    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      expect(rows[1]).toHaveTextContent("PGC test 2");
      expect(rows[2]).toHaveTextContent("PGC test 1");
    });
  });

  // TEST DE ELIMINACIÓN
  it("Debería eliminar un PGC cuando se hace click en Eliminar", async () => {
    
    AccountingPlanDataService.remove.mockResolvedValue({});

    render(
      <MemoryRouter>
        <AccountingPlansList newPGC={false} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("PGC test 1")).toBeInTheDocument();
    });

    //Primer botón de Eliminar PGC
    const deleteButton = screen.getAllByRole("button", {name: /Eliminar PGC/i});
    fireEvent.click(deleteButton[0]);

    //Verificar que se llamó a la función on el id correcto
    await waitFor(() => {
      expect(AccountingPlanDataService.remove).toHaveBeenCalled(1);
    });

    //Segunda llamada para recargar la lista después de la eliminación
    await waitFor(() => {
      expect(AccountingPlanDataService.getAll).toHaveBeenCalled(2);
    })

    //PGC eliminado
    await waitFor(() => {
      expect(screen.queryByText("PGC test 1")).not.toBeInTheDocument();
    });
  })

});


