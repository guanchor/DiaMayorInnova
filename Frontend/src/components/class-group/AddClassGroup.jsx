import React, { useState } from "react";
import ClassGroupDataService from "../../services/ClassGroupService";
import { useNavigate } from "react-router-dom";

const AddClassGroup = () => {
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

    const [classGroup, setClassGroup] = useState(initialClassGroupState);
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/class-list");
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setClassGroup({ ...classGroup, [name]: value });
    };

    const saveClassGroup = () => {
        let data = {
            course: classGroup.course,
            module: classGroup.module,
            modality: classGroup.modality,
            number_students: classGroup.number_students,
            max_students: classGroup.max_students,
            location: classGroup.location,
            weekly_hours: classGroup.weekly_hours
        };

        ClassGroupDataService.create(data)
            .then(response => {
                setClassGroup({
                    id: response.data.id,
                    course: response.data.course,
                    module: response.data.module,
                    modality: response.data.modality,
                    number_students: response.data.number_students,
                    max_students: response.data.max_students,
                    location: response.data.location,
                    weekly_hours: response.data.weekly_hours
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newClassGroup = () => {
        setClassGroup(initialClassGroupState);
        setSubmitted(false);
    };

    return (
        <>
            {submitted ? (
                <div>
                    <h4>Se ha enviado correctamente</h4>
                    <button onClick={newClassGroup}>Añadir</button>
                </div>
            ) : (
                <>
                    <section>
                        <h1>Creación de Grupo de Clase</h1>
                        <div className="creation-form">
                            <label htmlFor="course">Curso</label>
                            <input type="number" id="course" required value={classGroup.course} onChange={handleInputChange} name="course" />
                        </div>

                        <div className="creation-form">
                            <label htmlFor="module">Módulo</label>
                            <input type="text" id="module" required value={classGroup.module} onChange={handleInputChange} name="module" />
                        </div>

                        <div className="creation-form">
                            <label htmlFor="modality">Modalidad</label>
                            <input type="text" id="modalitye" required value={classGroup.modality} onChange={handleInputChange} name="modality" />
                        </div>

                        <div className="creation-form">
                            <label htmlFor="number_students">Número de estudiantes</label>
                            <input type="number" id="number_students" required value={classGroup.number_students} onChange={handleInputChange} name="number_students" />
                        </div>

                        <div className="creation-form">
                            <label htmlFor="max_students">Máximo de estudiantes</label>
                            <input type="number" id="max_students" required value={classGroup.max_students} onChange={handleInputChange} name="max_students" />
                        </div>

                        <div className="creation-form">
                            <label htmlFor="location">Localización del aula</label>
                            <input type="text" id="location" required value={classGroup.location} onChange={handleInputChange} name="location" />
                        </div>

                        <div className="creation-form">
                            <label htmlFor="weekly_hours">Horas semanales</label>
                            <input type="number" id="weekly_hours" required value={classGroup.weekly_hours} onChange={handleInputChange} name="weekly_hours" />
                        </div>
                        <div className="buttons-position">
                            <button className="badge" onClick={handleClick}>Lista</button>
                            <button className="badge" onClick={saveClassGroup}>Enviar</button>
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default AddClassGroup;