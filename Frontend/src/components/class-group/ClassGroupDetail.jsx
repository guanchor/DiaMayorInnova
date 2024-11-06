function ClassGroupDetail(props){
    return (
        <ul>
            <p>Curso {props.course}</p>
           <li>Curso: {props.course}</li>
           <li>Módulo: {props.module}</li> 
           <li>Modalidad: {props.modality}</li> 
           <li>Número de estudiantes: {props.number_students}</li> 
           <li>Máximo de estudiantes: {props.max_students}</li> 
           <li>Aula: {props.location}</li> 
           <li>Horas semanales: {props.weekly_hours}</li> 
        </ul>
    )
}

export default ClassGroupDetail;