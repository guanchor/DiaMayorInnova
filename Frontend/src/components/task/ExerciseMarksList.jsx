import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getStudentsMarkList from "../../services/exerciseMarksList";

const ExerciseMarksList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [exerciseMarksList, setExerciseMarksList] = useState([]);

    //Get task_id
    const taskId = location.state?.task_id;

    useEffect(() => {
        if (!taskId) return; // No ID, no request

        const fetchMarkList = async () => {
            try {
                const {data} = await getStudentsMarkList(taskId); // ID as param
                setExerciseMarksList(data);
            } catch (error) {
                console.error("Error devolviendo la lista", error);
            }
        };

        fetchMarkList();
    }, [taskId]); // When task_id changes

    return (
        <div>
            <h2>Listado de notas</h2>
            {exerciseMarksList.length > 0 ? (
                <ul>
                    {exerciseMarksList.map((student, index) => (
                        <li key={index}>
                            {student.student} - {student.task} - {student.mark}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay notas disponibles</p>
            )}
        </div>
    );
};

export default ExerciseMarksList;
