import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";

function Home() {
    const navigate = useNavigate();

    return (
        <>
            <section className="home_section">
                <h1>Esto es una aplicación</h1>
                <div className="buttons_container">
                    <button onClick={() => navigate("/class-list")}>Mostrar la lista de Grupos de clase</button>
                    <button onClick={() => navigate("/accounting-plans")}>Mostrar la lista de Accounting plans</button>
                    <button onClick={() => navigate("/schools")}>Mostrar Schools centers</button>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Home;