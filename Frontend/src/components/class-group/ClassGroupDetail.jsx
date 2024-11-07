function ClassGroupDetail(props) {
    return (
        <section>
            <h2>Detalle del Curso</h2>
            <ul>
                <h3>Curso {props.course} {props.module} {props.modality}</h3>
                <li>Curso: {props.course}</li>
                <li>Módulo: {props.module}</li>
                <li>Modalidad: {props.modality}</li>
                <li>Número de estudiantes: {props.number_students}</li>
                <li>Máximo de estudiantes: {props.max_students}</li>
                <li>Aula: {props.location}</li>
                <li>Horas semanales: {props.weekly_hours}</li>
            </ul>
        </section>
    )
}

export default ClassGroupDetail;