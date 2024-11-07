import React, { useState, useEffect } from "react";
import ClassGroupDataService from "../../services/ClassGroupService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ClassGroupsList = () => {
  const [classGroups, setClassGroups] = useState([]);
  const [currentClassGroup, setCurrentClassGroup] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchModule, setSearchModule] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    retrieveClassGroups();
  }, []);

  /*   const onChangeSearchModule = e => {
      const searchModule = e.target.value;
      setSearchModule(searchModule);
    }; */

  const retrieveClassGroups = () => {
    ClassGroupDataService.getAll()
      .then(response => {
        setClassGroups(response.data);
        console.log(response.data);
      }).catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveClassGroups();
    setCurrentClassGroup(null);
    setCurrentIndex(-1);
  };

  const setActiveClassGroup = (classGroup, index) => {
    setCurrentClassGroup(classGroup);
    setCurrentIndex(index);
  };

  const handleAddClick = () => {
    navigate("/add");
  }

  const removeAllClassGroups = () => {
    ClassGroupDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByModule = () => {
    ClassGroupDataService.findByModule(searchModule)
      .then(response => {
        setClassGroups(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      <section>
        <h1>Lista de Grupos de Clase</h1>
        <h4>Módulos</h4>
        <ul>
          {classGroups && classGroups.map((classGroup, index) => (
            <li onClick={() => setActiveClassGroup(classGroup, index)} key={index}>{classGroup.module}</li>
          ))}
        </ul>
        <div className="buttons-position">
          <button className="badge" onClick={handleAddClick}>ir a Añadir</button>
          <button className="badge" onClick={removeAllClassGroups}>Borrar todos</button>
        </div>
      </section>
      <section>
        {currentClassGroup ? (
          <section>
            <h4>Class Group</h4>
            <label><strong>Curso:</strong></label>{" "}
            {currentClassGroup.course}
            <label><strong>Módulo:</strong></label>{" "}
            {currentClassGroup.module}
            <label><strong>Modalidad:</strong></label>{" "}
            {currentClassGroup.modality}
            <label><strong>Número de alumnos:</strong></label>{" "}
            {currentClassGroup.number_students}
            <label><strong>Máximo número de alumnos:</strong></label>{" "}
            {currentClassGroup.max_students}
            <label><strong>Aula:</strong></label>{" "}
            {currentClassGroup.location}
            <label><strong>Horas semanales:</strong></label>{" "}
            {currentClassGroup.weekly_hours}
            <Link to={"/class-list/" + currentClassGroup.id}>Editar</Link>
          </section>
        ) : (
          <div>
            <br />
            <p>Selecciona un grupo...</p>
          </div>
        )}
      </section>
    </>
  );
};

export default ClassGroupsList;