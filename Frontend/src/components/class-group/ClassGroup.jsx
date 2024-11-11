import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClassGroupDataService from "../../services/ClassGroupService";
import './ClassGroup.css';

const ClassGroup = props => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialClassGroupState = {
    id: null,
    course: 0,
    module: "",
    modality: "",
    number_students: 0,
    max_students: 0,
    location: "",
    weekly_hours: 0
  };
  const [currentClassGroup, setCurrentClassGroup] = useState(initialClassGroupState);
  const [message, setMessage] = useState("");


  const handleClick = () => {
    navigate("/class-list");
  }

  const getClassGroup = id => {
    ClassGroupDataService.get(id)
      .then(response => {
        setCurrentClassGroup(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getClassGroup(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentClassGroup({ ...currentClassGroup, [name]: value });
  };

  const updateClassGroup = () => {
    ClassGroupDataService.update(currentClassGroup.id, currentClassGroup)
      .then(response => {
        console.log(response.data);
        setMessage("The class was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteClassGroup = () => {
    ClassGroupDataService.remove(currentClassGroup.id).then(response => {
      console.log(response.data);
      navigate("/class-list");
    }).catch(e => {
      console.log(e);
    });
  };

  return (
    <>
      {currentClassGroup ? (
        <section className="classGroup_wrapper">
          <div className="currentClassGroup_detail">
            <h3>Formulario de Edición</h3>
            <form className="edit-form">
              <label htmlFor="course" className="edit-input">Course</label>
              <input type="number" id="course" className="edit-input" required value={currentClassGroup.course} onChange={handleInputChange} name="course" />
              <label htmlFor="module" className="edit-input">Module</label>
              <input type="text" id="module" required value={currentClassGroup.module} onChange={handleInputChange} name="module" />
              <label htmlFor="modality" className="edit-input">Modality</label>
              <input type="text" id="modalitye" className="edit-input" required value={currentClassGroup.modality} onChange={handleInputChange} name="modality" />
              <label htmlFor="number_students" className="edit-input">Number of Students</label>
              <input type="number" id="number_students" className="edit-input" required value={currentClassGroup.number_students} onChange={handleInputChange} name="number_students" />
              <label htmlFor="max_students" className="edit-input">Max Number of Students</label>
              <input type="number" id="max_students" className="edit-input" required value={currentClassGroup.max_students} onChange={handleInputChange} name="max_students" />
              <label htmlFor="location" className="edit-input">Location</label>
              <input type="text" id="location" className="edit-input" required value={currentClassGroup.location} onChange={handleInputChange} name="location" />
              <label htmlFor="weekly_hours" className="edit-input">Weekly hours</label>
              <input type="number" id="weekly_hours" className="edit-input" required value={currentClassGroup.weekly_hours} onChange={handleInputChange} name="weekly_hours" />
            </form>

            <button className="badge badge-danger mr-2" onClick={deleteClassGroup}>
              Delete
            </button>
            <button
              type="submit"
              className="badge badge-success"
              onClick={updateClassGroup}
            >
              Update
            </button>

            <button className="badge badge-danger mr-2" onClick={handleClick}>
              Go List
            </button>
          </div>

          <p>{message}</p>
        </section>
      ) : (
        <div>
          <br />
          <p>Selecciona un módulo...</p>
        </div>
      )}
    </>
  );
};

export default ClassGroup;