import React, { useState, useEffect } from "react";
import ClassGroupDataService from "../../services/ClassGroupService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useResource } from "../../services/resource";

const ClassGroupsList = () => {
  const [classGroups, setClassGroups] = useState([]);
  const [currentClassGroup, setCurrentClassGroup] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchModule, setSearchModule] = useState("");
  const navigate = useNavigate();

  useEffect( () =>{
    const [classGroupResource, classGroupsApi] = useResource('classGroups');

    if (!classGroupResource.loaded && !classGroupResource.loading && !classGroupResource.error) {
      classGroupsApi.get();
      console.log('GET');
    }
  }, []);


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
        <h2>Lista de Grupos de Clase</h2>
        <h3>Módulos</h3>
        <ul className="classGroup_list">
          {classGroups && classGroups.map((classGroup, index) => (
            <li onClick={() => setActiveClassGroup(classGroup, index)} key={index}>{classGroup.module}</li>
          ))}
        </ul>
        <button onClick={handleAddClick}>ir a Añadir</button>
        <button onClick={removeAllClassGroups}>Borrar todos</button>
      </section>

      <section className="classGroup_wrapper">
        {currentClassGroup ? (
          <div className="currentClassGroup_detail">
            <h3>Grupo de Clase</h3>
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
            <p>Selecciona un grupo...</p>
          </div>
        )}
      </section>
    </>
  );
};

export default ClassGroupsList;