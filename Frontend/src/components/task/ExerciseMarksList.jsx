import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getStudentsMarkList from "../../services/exerciseMarksList";
import Modal from "../modal/Modal";

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
            {exerciseMarksList.map((student, index) => (
                    <Modal
                        btnText={
                            <div className="mark_container" key={index}>
                                <p className='mark_mark'>{student.mark}</p>
                                <p className='mark-text_tittle'>{student.student}</p>
                                <p className='mark-text_tittle'>{student.task}</p>
                            </div>
                        }
                        needOpen = {false}
                        modalTitle={student.task}
                    >                     
                    </Modal>
                ))}
        </div>
    )
}    

export default ExerciseMarksList;