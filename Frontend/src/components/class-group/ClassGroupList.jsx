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
    <div className="div-1">
      <div className="div-2">
        <h4>Class Groups List</h4>

        <ul>
          {classGroups && classGroups.map((classGroup, index) => (
            <li onClick={() => setActiveClassGroup(classGroup, index)} key={index}>{classGroup.module}</li>
          ))}
        </ul>
        <button onClick={handleAddClick}>Go Add</button>
        <button onClick={removeAllClassGroups}>Remove All</button>
      </div>
      <div className="div-3">
        {currentClassGroup ? (
          <div className="div-4">
            <h4>Class Group</h4>
            <div className="div-5">
              <label><strong>Curso:</strong></label>{" "}
              {currentClassGroup.course}
            </div>
            <div className="div-5">
              <label><strong>Módulo:</strong></label>{" "}
              {currentClassGroup.module}
            </div>
            <div className="div-5">
              <label><strong>Modalidad:</strong></label>{" "}
              {currentClassGroup.modality}
            </div>
            <div className="div-5">
              <label><strong>Número de alumnos:</strong></label>{" "}
              {currentClassGroup.number_students}
            </div>
            <div className="div-5">
              <label><strong>Máximo número de alumnos:</strong></label>{" "}
              {currentClassGroup.max_students}
            </div>
            <div className="div-5">
              <label><strong>Aula:</strong></label>{" "}
              {currentClassGroup.location}
            </div>
            <div className="div-5">
              <label><strong>Horas semanales:</strong></label>{" "}
              {currentClassGroup.weekly_hours}
            </div>

            <Link to={"/class-list/" + currentClassGroup.id}>Edit</Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Class Group...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassGroupsList;