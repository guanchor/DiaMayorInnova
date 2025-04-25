import React, { useEffect, useRef, useState } from "react";
import SolutionsViewer from "../solution/SolutionsViewer";
import statementService from "../../services/statementService";
import "./TaskPage.css";
import useStatements from "../../hooks/useStatements";
import { SearchBar } from "../search-bar/SearchBar";
import Table from "../table/Table";
import { useNavigate } from "react-router-dom";
import PaginationMenu from "../pagination-menu/PaginationMenu";

const StatementsSelection = ({
  selectedStatements,
  handleStatementSelection,
  showCheckboxes = true,
}) => {
  const [currentSolutions, setCurrentSolutions] = useState([]);
  const [showSolutions, setShowSolutions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatementId, setSelectedStatementId] = useState(null);
  const { statements, solutions, currentPage, totalPages, setCurrentPage, allStatements } = useStatements();
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const [localPage, setLocalPage] = useState(1);

  const isSearching = searchTerm.trim().length > 0;

  const filteredStatements = isSearching
    ? allStatements.filter(statement =>
      statement.definition.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : statements;

  const totalLocalPages = Math.ceil(filteredStatements.length / itemsPerPage);

  useEffect(() => {
    setLocalPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (localPage > totalLocalPages) {
      setLocalPage(1);
    }
  }, [totalLocalPages]);

  const startIdx = (localPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedStatements = filteredStatements.slice(startIdx, endIdx);

  const viewSolutions = (statementId) => {
    if (solutions[statementId]) {
      setCurrentSolutions(solutions[statementId]);
      setSelectedStatementId(statementId);
      setIsModalOpen(true);
    } else {
      setLoading(true);
      statementService.getSolutions(statementId)
        .then(response => {
          setCurrentSolutions(response.data);
          setSelectedStatementId(statementId);
          setIsModalOpen(true);
        })
        .catch(error => {
          console.error("Error al cargar soluciones:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const hideSolutions = () => {
    setIsModalOpen(false);
    setCurrentSolutions([]);
  };

  if (!Array.isArray(statements)) {
    return <div>Error: No se recibieron enunciados válidos</div>;
  }

  const columns = [
    { title: "ID", data: "id" },
    { title: "Enunciado", data: "definition" },
    {
      title: "Acciones",
      data: "id",
      render: function (data, type, row) {
        return `
          <div class="task-page__actions">
            ${showCheckboxes ? `
              <label>
                <input type="checkbox" class="statement-checkbox" data-id="${data}" />
                <span class="task-page__button-text">Añadir</span>
              </label>
            ` : ""}
            <button class="task-page__button--view" type="button" data-id="${data}">
              <i class="fi fi-rr-eye interrogation"></i>
            </button>
          </div>
        `;
      }
    }
  ];

  const options = {
    responsive: true,
    paging: true,
    searching: true,
    pageLength: 10,
    language: {
      search: '',
      searchPlaceholder: 'Buscar en la tabla...',
      lengthMenu: 'Mostrar _MENU_ registros por página',
      zeroRecords: 'No se encontraron resultados',
      info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
      infoEmpty: 'No hay registros disponibles',
      infoFiltered: '(filtrado de _MAX_ registros totales)',
      loadingRecords: 'Cargando...',
      processing: 'Procesando...',
      emptyTable: 'No hay datos disponibles en la tabla',
    },
    createdRow: function (row, data) {
      const viewButton = row.querySelector(".task-page__button--view");
      const editButton = row.querySelector(".task-page__button--edit");
      const checkbox = row.querySelector(".statement-checkbox");

      if (viewButton) {
        viewButton.addEventListener("click", () => viewSolutions(data.id));
      }
      if (editButton) {
        editButton.addEventListener("click", () => handleEditSolutions(data.id));
      }
      if (checkbox && showCheckboxes) {
        checkbox.checked = selectedStatements.includes(data.id);
        checkbox.addEventListener("change", () => handleStatementSelection(data));
      } else if (checkbox) {
        checkbox.remove();
      }
    }

  };

  return (
    <section className="task-page__selection">
      <div className="task-page__selection--content">
        <div className="task-page__header-row">
          <h2 className="task-page__header">Enunciados</h2>
        </div>
        <SearchBar
          value={searchTerm}
          handleSearchChange={setSearchTerm}
        />

        <Table
          titles={["Enunciado", "Acciones"]}
          data={paginatedStatements}
          actions={true}
          show={viewSolutions}
          columnConfig={[
            { field: 'definition', sortable: true }
          ]}
          showCheckboxes={showCheckboxes}
          selectedItems={selectedStatements}
          onItemSelection={handleStatementSelection}
        />

        <PaginationMenu
          currentPage={isSearching ? localPage : currentPage}
          setCurrentPage={isSearching ? setLocalPage : setCurrentPage}
          totalPages={isSearching ? totalLocalPages : totalPages}
        />

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <section className="modal-solutionViewer__container">
                <div className="modal-solutionViewer__statement-content">
                  <div className="modal-solutionViewer__head">
                    <h3 className="modal-solutionViewer__statement-title">Enunciado</h3>
                    <button className="btn light" onClick={hideSolutions}>X</button>
                  </div>
                  <div className="modal-solutionViewer__statement-info">
                    <span>{statements.find(statement => statement.id === selectedStatementId)?.definition}</span>
                  </div>
                </div>
                <SolutionsViewer solutions={currentSolutions} />
              </section>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StatementsSelection;
