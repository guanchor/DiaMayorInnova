import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SchoolsServices from '../../services/SchoolsServices';

const ListSchoolCenter = () => {
  const [schools, setSchools] = useState([]);

  const allSchools = () => {
    SchoolsServices.getAll()
      .then(response => {
        setSchools(response.data);
        console.log(response.data);
      })
  }
  return (
    <>
      <section>
        <Link to={"/home"}>
          Volver al home
        </Link>
        <h2>Listado de centros</h2>
        {schools.map((school, index) => (
          <ul className="center_list" key={index}>
            <li id={`name${index}`}>{school.school_name}</li>
            <li id={`address${index}`}>{school.address}</li>
            <li id={`phone${index}`}>{school.phone}</li>
            <li id={`email${index}`}>{school.email}</li>
            <li id={`website${index}`}>{school.website}</li>
            <li id={`province${index}`}>{school.province}</li>
            <li><button onClick={() => deleteSchool(school.id)}>Eliminar</button></li>
            <li><button onClick={() => updateForm(school)}>editar</button></li>
          </ul>
        ))}
      </section>
    </>
  )
}

export default ListSchoolCenter
