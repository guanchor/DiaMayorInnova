import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ClassGroupDataService from "../../services/ClassGroupService";
import "./ClassGroup.css";

const ClassGroupsList = () => {
  const [classGroups, setClassGroups] = useState([]);
  const [currentClassGroup, setCurrentClassGroup] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchModule, setSearchModule] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    retrieveClassGroups();
  }, []);

  const retrieveClassGroups = () => {
    ClassGroupDataService.getAll()
      .then(response => {
        setClassGroups(response.data);
        console.log(response.data);
      }).catch(e => {
        console.log(e);
      });
  };

  /* const refreshList = () => {
    retrieveClassGroups();
    setCurrentClassGroup(null);
    setCurrentIndex(-1);
  }; */

  const setActiveClassGroup = (classGroup, index) => {
    setCurrentClassGroup(classGroup);
    setCurrentIndex(index);
  };

  const handleAddClick = () => {
    navigate("/add");
  }

  const findByModule = () => {
    if (searchModule) {
      ClassGroupDataService.findByModule(searchModule)
        .then(response => {
          setClassGroups(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      retrieveClassGroups();
    }
  };

  const handleSearchChange = (e) => {
    setSearchModule(e.target.value);
  };

  return (
    <>
      <section>
        <h2>Class Groups List</h2>

        <div>
          <input
            type="text"
            value={searchModule}
            onChange={handleSearchChange}
            placeholder="Filtrar por módulo"
          />
          <button onClick={findByModule}>Buscar</button>
        </div>

        <ul className="classGroup_list">
          {classGroups && classGroups.map((classGroup, index) => (
            <li onClick={() => setActiveClassGroup(classGroup, index)} key={index}>{classGroup.module}</li>
          ))}
        </ul>
        <button onClick={handleAddClick}>Añadir</button>
      </section>

      <section className="classGroup_wrapper">
        {currentClassGroup ? (
          <div className="currentClassGroup_detail">
            <h3>Grupos de Clase</h3>
            <div className="detail">
              <label><strong>Curso:</strong></label>{" "}
              {currentClassGroup.course}
            </div>
            <div className="detail">
              <label><strong>Módulo:</strong></label>{" "}
              {currentClassGroup.module}
            </div>
            <div className="detail">
              <label><strong>Modalidad:</strong></label>{" "}
              {currentClassGroup.modality}
            </div>
            <div className="detail">
              <label><strong>Número de alumnos:</strong></label>{" "}
              {currentClassGroup.number_students}
            </div>
            <div className="detail">
              <label><strong>Máximo número de alumnos:</strong></label>{" "}
              {currentClassGroup.max_students}
            </div>
            <div className="detail">
              <label><strong>Aula:</strong></label>{" "}
              {currentClassGroup.location}
            </div>
            <div className="detail">
              <label><strong>Horas semanales:</strong></label>{" "}
              {currentClassGroup.weekly_hours}
            </div>

            <Link to={"/class-list/" + currentClassGroup.id} className="classGroup_edit">Editar</Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Selecciona un módulo...</p>
          </div>
        )}
      </section>
    </>
  );
};

export default ClassGroupsList;