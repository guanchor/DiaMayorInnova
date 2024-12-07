import React from "react";
import StatementForm from "./StatementForm";
import StatementList from "./StatementList";
import "./StatementPage.css";

const StatementCreateForm = () => {
  const handleStatementCreated = (newStatement) => {
    console.log("Nuevo enunciado creado:", newStatement);
    // Aquí puedes manejar el nuevo enunciado, por ejemplo, redirigir o actualizar la UI.
  };

  return (
    <main className="statement-page">
      <header className="statement-page__header--header">
        <button className="back-button" onClick={() => navigate("/home")}>
          <i className="fi fi-rr-arrow-small-left"></i>
          Volver
        </button>
        <div>Creación de Enunciado</div>
      </header>

      {/* Formulario principal */}
      <section className="statement-page__form">
        <StatementForm onStatementCreated={handleStatementCreated} />
      </section>

      <aside className="statement-page__solutions">
        
      </aside>

      <section className="statement-page__selection">
        <StatementList />
      </section>
    </main>
  );
};

export default StatementCreateForm;
