import React, { useContext, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { navContext } from '../context/nav-menu/navMenuContext';
import Shortcuts from "../components/shortcuts/Shortcuts";
import StudentMark from "../components/student-mark/StudentMark";
import StudentAside from "../components/student-aside/StudentAside";
import TaskListAndDetails from "../components/task/taskListAndDetails";
import StatementsSelection from "../components/task/StatementsSelection";
import useStatements from "../hooks/useStatements";


function Home() {
  const navigate = useNavigate();
  const { rol } = useContext(navContext);

  const { statements, solutions, editMode, loading, handleEditSolutions } = useStatements();

  if (rol === 'admin') {
    return (
      <>
        <main className="home_section">
          <section className="principal">
            {/*             <div className="buttons_container">
              <button onClick={() => navigate("/class-list")}>Mostrar la lista de Grupos de clase</button>
              <button onClick={() => navigate("/accounting-plans")}>Mostrar la lista de Accounting plans</button>
              <button onClick={() => navigate("/schools")}>Mostrar Schools centers</button>
              <button onClick={() => navigate("/sign_up")}>Registro</button>
            </div> */}
            <Outlet />
          </section>
          <aside className="aside"></aside>
          <Shortcuts />

        </main>
      </>
    )
  }

  if (rol === 'teacher') {
    return (
      <>
        <main className="home_section">
          <Shortcuts />
          <section className="principal">
            <StatementsSelection
              statements={statements}
              handleEditSolutions={handleEditSolutions}
              solutions={solutions}
              editMode={editMode}
              showCheckboxes={false}
            />
          </section>
          <aside className="aside"><TaskListAndDetails /></aside>
        </main>
      </>
    )
  }

  return (
    <main className="home_section">
      <Shortcuts />
      <section className="principal">
        <StudentMark />
        <button onClick={() => navigate("/accounting-plans")}>Mostrar la lista de Accounting plans</button>
      </section>
      <aside className="aside">
        <StudentAside />
      </aside>
    </main>
  );
}

export default Home;