import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import getStudentsMarkList from "../../services/exerciseMarksList";
import "./MarkList.css"
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import Table from "../table/Table";

const ExerciseMarksList = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [exerciseMarksList, setExerciseMarksList] = useState([]);

    DataTable.use(DT);

    //Get task_id
    const taskId = location.state?.task_id;

    useEffect(() => {
        if (!taskId) return; // No ID, no request

        const fetchMarkList = async () => {
            try {
                const { data } = await getStudentsMarkList(taskId); // ID as param
                setExerciseMarksList(data);
                console.log(data)
            } catch (error) {
                console.error("Error devolviendo la lista", error);
            }
        };

        fetchMarkList();
    }, [taskId]);

    const columns = [
        { title: 'Fecha', data: 'date', className: 'left-align' },
        { title: 'Nombre', data: 'student', className: 'left-align' },
        {
            title: 'Estado',
            data: 'mark',
            className: 'right-align',
            render: function (data, type, row) {
                return `<p>${data * 10} %</p><progress value=${data * 0.1} ></progress>`;
            }
        },
        { title: 'Nota', data: 'mark', className: 'right-align' },

        {
            title: 'Acciones',
            data: 'exercise_id',
            className: 'right-align',
            render: function (data, type, row) {
                return `<button class="btn view-result" data-id="${row.exercise_id}">
                  <i class="fi fi-rr-eye"></i>
                </button>`;
            }
        },
    ];
    <progress value={0.5}></progress>

    return (
        <div className="markList__page">
            <div className="mark_list__Header">
                <button className="btn light " onClick={() => navigate(-1)}>
                    <i className="fi fi-rr-arrow-small-left" />
                </button>
                <h1 className="markList__page--title">Notas de Examen</h1>
            </div>

            {exerciseMarksList.length > 0 && (
                <h2 className="markList__page--task">{exerciseMarksList[0].task_tittle}</h2>
            )}
            <div className="maskList_table__container">
                <Table
                    data={exerciseMarksList}
                    columns={columns}
                    id={id}
                />
            </div>
        </div >
    )
}

export default ExerciseMarksList;

