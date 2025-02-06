import React, { useState } from "react";
import AddHelpExample from "../../components/help-example/AddHelpExample";
import ListHelpExample from "../../components/help-example/ListHelpExample";
import "../../components/help-example/HelpExample.css";

/* const HelpExamplePage = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleView = () => {
    setShowAddForm(!showAddForm);
  };

  return (
    <div className="helpExamplePage">
      <header className="helpExamplePage__header">
        <button className="helpExamplePage__btnHome" onClick={toggleView}>
          {showAddForm ? "← Volver a la lista" : "+ Añadir nuevo ejemplo"}
        </button>
        <h1 className="helpExamplePage__title">Gestión de Ejemplos</h1>
      </header>

      <main className="helpExamplePage__content">
        {showAddForm ? (
          <AddHelpExample setNewHelpExample={setShowAddForm} />
        ) : (
          <ListHelpExample />
        )}
      </main>
    </div>
  );
}; */

const HelpExamplePage = () =>{
    const [showAddForm, setShowAddForm] = useState(false);

}


export default HelpExamplePage;
