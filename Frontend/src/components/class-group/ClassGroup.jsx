import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClassGroupDataService from "../../services/ClassGroupService";

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

  const updateClassGroup= () => {
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
    <div>
      {currentClassGroup ? (
        <div className="edit-form">
          <h4>Class Group</h4>
          <form>
            <div>
              <label htmlFor="course">Course</label>
              <input type="number" id="course" required value={currentClassGroup.course} onChange={handleInputChange} name="course" />
            </div>

            <div>
              <label htmlFor="module">Module</label>
              <input type="text" id="module" required value={currentClassGroup.module} onChange={handleInputChange} name="module" />
            </div>

            <div>
              <label htmlFor="modality">Modality</label>
              <input type="text" id="modalitye" required value={currentClassGroup.modality} onChange={handleInputChange} name="modality" />
            </div>

            <div>
              <label htmlFor="number_students">Number of Students</label>
              <input type="number" id="number_students" required value={currentClassGroup.number_students} onChange={handleInputChange} name="number_students" />
            </div>

            <div>
              <label htmlFor="max_students">Max Number of Students</label>
              <input type="number" id="max_students" required value={currentClassGroup.max_students} onChange={handleInputChange} name="max_students" />
            </div>

            <div>
              <label htmlFor="location">Location</label>
              <input type="text" id="location" required value={currentClassGroup.location} onChange={handleInputChange} name="location" />
            </div>

            <div>
              <label htmlFor="weekly_hours">Weekly hours</label>
              <input type="number" id="weekly_hours" required value={currentClassGroup.weekly_hours} onChange={handleInputChange} name="weekly_hours" />
            </div>
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
          
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Selecciona un módulo...</p>
        </div>
      )}
    </div>
  );
};

export default ClassGroup;