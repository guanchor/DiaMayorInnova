import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";

function Home() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/class-list");
    }

    return (
        <>
            <p>Esto es una aplicación</p>
            <button onClick={handleClick}>Mostrar la lista de Grupos de clase</button>
            <Footer />
        </>
    );
}

export default Home;