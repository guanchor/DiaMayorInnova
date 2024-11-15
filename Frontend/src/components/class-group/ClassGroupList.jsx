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

<<<<<<< HEAD
=======
  /*   const onChangeSearchModule = e => {
      const searchModule = e.target.value;
      setSearchModule(searchModule);
    }; */

>>>>>>> 911f02c0e3f4e500a34c6ebedeff3e7689750f65
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
<<<<<<< HEAD
=======

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
>>>>>>> 911f02c0e3f4e500a34c6ebedeff3e7689750f65

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
<<<<<<< HEAD
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

=======
        <h2>Lista de Grupos de Clase</h2>
        <h3>Módulos</h3>
>>>>>>> 911f02c0e3f4e500a34c6ebedeff3e7689750f65
        <ul className="classGroup_list">
          {classGroups && classGroups.map((classGroup, index) => (
            <li onClick={() => setActiveClassGroup(classGroup, index)} key={index}>{classGroup.module}</li>
          ))}
        </ul>
<<<<<<< HEAD
        <button onClick={handleAddClick}>Añadir</button>
=======
        <button onClick={handleAddClick}>ir a Añadir</button>
        <button onClick={removeAllClassGroups}>Borrar todos</button>
>>>>>>> 911f02c0e3f4e500a34c6ebedeff3e7689750f65
      </section>

      <section className="classGroup_wrapper">
        {currentClassGroup ? (
          <div className="currentClassGroup_detail">
<<<<<<< HEAD
            <h3>Grupos de Clase</h3>
=======
            <h3>Grupo de Clase</h3>
>>>>>>> 911f02c0e3f4e500a34c6ebedeff3e7689750f65
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
<<<<<<< HEAD
            <p>Selecciona un módulo...</p>
=======
            <p>Selecciona un grupo...</p>
>>>>>>> 911f02c0e3f4e500a34c6ebedeff3e7689750f65
          </div>
        )}
      </section>
    </>
  );
};

export default ClassGroupsList;