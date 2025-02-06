import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HelpExampleDataService from "../../services/HelpExampleService";
import "./HelpExample.css";

const ListHelpExample = () => {
  const [helpExamples, setHelpExamples] = useState([]);

  useEffect(() => {
    retrieveHelpExamples();
  }, []);

  const retrieveHelpExamples = () => {
    HelpExampleDataService.getAll().then(({ data }) => {
      setHelpExamples(data);
    });
  };

  const deleteHelpExample = (id) => {
    HelpExampleDataService.remove(id).then(() => {
      retrieveHelpExamples();
    });
  };

  return (
    <section className="helpExample__list">
      <h2 className="section-title">Todos los Ejemplos</h2>
      <table className="helpExample__table">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {helpExamples.map((example) => (
            <tr key={example.id}>
              <td>{example.description}</td>
              <td className="helpExample__actions">
                <Link to={`/help-examples/${example.id}`} className="helpExample__action--edit">
                  <i className="fi-rr-pencil" /> Editar
                </Link>
                <button
                  className="helpExample__action--delete"
                  onClick={() => deleteHelpExample(example.id)}
                >
                  <i className="fi-rr-trash" /> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ListHelpExample;
