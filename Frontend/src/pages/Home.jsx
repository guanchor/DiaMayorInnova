import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import NavBar from "../components/navBar/NavBar";

function Home() {
  const navigate = useNavigate();

  const goClassList = () => {
    navigate("/class-list");
  }

  const goSchool = () => {
    navigate("/schools");
  }

  const goAccountingPlan = () => {
    navigate("/accounting-plans");
  }


  const goSignUp = () => {
    navigate("/sign_up");
  }

  return (
    <>
      <Header />
      <NavBar />
      <main>
        <h1>Inicio</h1>
        <p>Esto es una aplicación</p>
        <button onClick={goClassList}>Grupos</button>
        <button onClick={goSchool}>Escuelas</button>
        <button onClick={goAccountingPlan}>PGC</button>
        <button onClick={goSignUp}>Registro</button>
      </main>
      <Footer />
    </>
  );
}

export default Home;