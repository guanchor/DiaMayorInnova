import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <main className="home_section">
        <h1>Inicio</h1>
        <h2>Esto es una aplicación</h2>
        <div className="buttons_container">
          <button onClick={() => navigate("/class-list")}>Mostrar la lista de Grupos de clase</button>
          <button onClick={() => navigate("/accounting-plans")}>Mostrar la lista de Accounting plans</button>
          <button onClick={() => navigate("/schools")}>Mostrar Schools centers</button>
          <button onClick={() => navigate("/tasks")}>Mostrar Tareas</button>
          <button onClick={() => navigate("/statements")}>Mostrar Enunciados</button>
          <button onClick={() => navigate("/sign_up")}>Registro</button>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home;