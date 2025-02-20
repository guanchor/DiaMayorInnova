import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getStudentsMarkList from "../../services/exerciseMarksList";
import Modal from "../modal/Modal";
import "./MarkList.css"

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
        <div className="markList__page">
            <button className="markList__btnHome" onClick={()=>navigate(-1)}>
                <i className="fi-rr-arrow-small-left" /> Volver
            </button>

            <h1 className="markList__page--title">Viendo notas de tarea</h1>
            {exerciseMarksList.length > 0 && (
                <h2 className="markList__page--task">{exerciseMarksList[0].task}</h2>
            )}
            <div className="markList__page--list">
                {exerciseMarksList.map((student, index) => (
                    <Modal
                        className="modal__custom"
                        key={index}
                        btnText={
                            <div className="mark_container">
                                <p className='mark_mark'>{student.mark}</p>
                                <p className='mark-text_tittle'>{student.student}</p>
                            </div>
                        }
                        needOpen={false}
                        modalTitle={student.task}
                    >                     
                    </Modal>
                ))}
            </div>
        </div>
    )
}    

export default ExerciseMarksList;