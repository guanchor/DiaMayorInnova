import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import HelpExampleService from '../../services/HelpExampleService';

const HelpExamplesList = () => {
  const [helpExamples, setHelpExamples] = useState([]);
  const [currentHelpExample, setCurrentHelpExample] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchHelpExample, setSearchHelpExample] = useState("");

  useEffect(() => {
    retrieveHelpExamples();
  }, []);

  const retrieveHelpExamples = () => {
    HelpExampleService.getAll()
      .then(response => {
        setHelpExamples(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByAccount = () => {
    if (searchHelpExample) {
      HelpExampleService.findByAccount(searchHelpExample)
        .then(response => {
          setHelpExamples(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      retrieveHelpExamples();
    }
  };

  const setActiveHelpExample = (helpExample, index) => {
    setCurrentHelpExample(helpExample);
    setCurrentIndex(index);
  }

  const handleSearchChange = (e) => {
    setSearchHelpExample(e.target.value);
  };

  return (
    <>
      <section>
        <h2>Ejemplos de Ayuda</h2>
        <Link to={"/home"}>
          Volver al Home
        </Link>

        <div>
          <input
            type="text"
            value={searchHelpExample}
            onChange={handleSearchChange}
            placeholder="Número de cuenta"
          />
          <button onClick={findByAccount}>Filtrar</button>
        </div>

        <ul className='helpExample_list'>
          {helpExamples && helpExamples.map((helpExample, index) => (
            <li onClick={() => setActiveHelpExample(helpExample, index)} key={index}>
              {helpExample.description}{helpExample.account}
            </li>
          ))}
        </ul>

        <button><Link to={"/add-help-example"}>Añadir nueva ayuda</Link></button>
      </section>

      <section className='helpExample_wrapper'>
        {currentHelpExample ? (
          <div className='currentHelpExample_detail'>
            <h3>Ejemplo</h3>
            <div className='detail'>
              <label>{""}
                {currentHelpExample.creditMoves}
              </label>
            </div>
            <div className='detail'>
              <label>{""}
                {currentHelpExample.debitMoves}
              </label>
            </div>
            <div className='detail'>
              <label>{""}
                {currentHelpExample.account}
              </label>
            </div>
            <Link to={"/help-examples/" + currentHelpExample.id}>
              Editar
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Haga click sobre un ejemplo</p>
          </div>
        )}
      </section>
    </>
  );
};

export default HelpExamplesList