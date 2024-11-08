import React, { useEffect, useState } from "react";
import SchoolServices from "../../services/SchoolsServices.js";
import "./SchoolCenters.css";

const SchoolCenters = () => {

  const initialSchoolState = {
    school_name: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    province: ""
  }

  const [schools, setSchools] = useState([initialSchoolState]);
  const [searchName, setSearchName] = useState("");

  const allSchools = () => {
    SchoolServices.getAll()
      .then(response => {
        setSchools(response.data);
        console.log(response.data);
      })
  }

  const findByName = (e) => {
    e.preventDefault();
    console.log(searchName)
    SchoolServices.findByName(searchName)
      .then(response => {
        console.log(response.data);
      }).catch(e => {
        console.log(e);
      });
  }

  const onChangeSearchName = e => {
    const findName = e.target.value;
    setSearchName(findName);
  }

  useEffect(() => {
    allSchools();
  }, []);

  const handleChange = e => {
    e.preventDefault();
    console.log(e.target.value)
    /*     const { name, value } = e.target; //problema
        setSchools({ ...schools, [name]: value }); //problema */
  };



  return (
    <>
      <h1>Centros Educativos</h1>

      <section>
        <h2>Listado de centros</h2>
        {schools.map((school, index) => (
          <ul className="center_list" key={index}>
            <li id={`name${index}`}>{school.school_name}</li>
            <li id={`address${index}`}>{school.address}</li>
            <li id={`phone${index}`}>{school.phone}</li>
            <li id={`email${index}`}>{school.email}</li>
            <li id={`website${index}`}>{school.website}</li>
            <li id={`province${index}`}>{school.province}</li>
          </ul>
        ))}
      </section>

      <section className="createSchools_wrapper">
        <h2>Crear centros</h2>
        <form action=""  >
          <fieldset>
            <label htmlFor="schoolName">Nombre del centro</label>
            <input type="text" name="school_name" id="schoolName_input" className="schoolCenter_item" placeholder="Nombre del centro" value={schools.school_name} onInput={handleChange} />
          </fieldset>
          <button type="submit">Crear nuevo</button>
        </form>

      </section>

      <section className="createSchools_wrapper">
        <form action="">
          <input type="text" placeholder="Nombre escuela" value={searchName} onChange={onChangeSearchName} />
          <button type="button" onClick={findByName}>Buscar Por Nombre</button>
        </form>
      </section>

    </>
  )
};
export default SchoolCenters;