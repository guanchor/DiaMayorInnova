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

  const [schools, setSchools] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [formData , setFormData] = useState([initialSchoolState])
  const [currentSchool, setCurrentSchool] = useState([]);

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
          setCurrentSchool(response.data);
      }).catch(e => {
        console.log(e);
      });
  }

  const onChangeSearchName = e => {
    const findName = e.target.value;
    setSearchName(findName);
  }



  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target; 
    setFormData({ ...formData, [name]: value });
  };


  const addSchool = (e) => {
    e.preventDefault();
    console.log(formData)
     SchoolServices.create(formData)
      .then(response => {
        console.log(response.data);
        allSchools();
      }).catch(e => {
        console.log(e); 
      });
    }

    const deleteSchool = (id) =>{
        e.preventDefault();
        console.log(id);
        console.log("hola");
    }

    useEffect(() => {
        allSchools();
      }, []);


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
            <li><button onClick={deleteSchool}>Eliminar</button></li>
          </ul>
        ))}
      </section>

      <section className="createSchools_wrapper">
        <h2>Crear centros</h2>
        <form action=""  onSubmit={addSchool}>
          <fieldset>
            <label>Nombre del centro
            <input type="text" name="school_name" id="schoolName_input" className="schoolCenter_item" placeholder="Nombre del centro" value={schools.school_name} onInput={handleChange} />
            </label>
            <label >Dirección del centro
            <input type="text" name="address" id="schoolAddress_input" className="schoolCenter_item" placeholder="Dirección del centro" value={schools.address} onInput={handleChange} />
            </label>
            <label >Telefono del centro
            <input type="tel" name="phone" id="schoolPhone_input" className="schoolCenter_item" placeholder="Telefono del centro" value={schools.phone} onInput={handleChange} />
            </label>
            <label >Correo del centro
            <input type="email" name="email" id="schoolEmail_input" className="schoolCenter_item" placeholder="Correo del centro" value={schools.email} onInput={handleChange} />
            </label>
            <label >Web del centro
            <input type="text" name="website" id="schoolWebsite_input" className="schoolCenter_item" placeholder="Web del centro" value={schools.website} onInput={handleChange} />
            </label>
            <label>Provincia del centro
            <input type="text" name="province" id="schoolProvince_input" className="schoolCenter_item" placeholder="Provincia del centro" value={schools.province} onInput={handleChange} />
            </label>
          </fieldset>
          <button type="submit" className="createSchool_submit">Crear nuevo</button>
        </form>

      </section>

      <section className="createSchools_wrapper">
        <h2>Buscar por nombre</h2>
        <form action="" onSubmit={findByName}>
          <input type="text" placeholder="Nombre escuela" value={searchName} onChange={onChangeSearchName} />
          <button type="submit">Buscar Por Nombre</button>
        </form>
        <div>
            {currentSchool.map((current, index) => (
                <ul className="center_list" key={index}>
                    <li id={`currentName${index}`}>{current.school_name}</li>
                    <li id={`currentAddress${index}`}>{current.address}</li>
                    <li id={`curentPhone${index}`}>{current.phone}</li>
                    <li id={`currentEmail${index}`}>{current.email}</li>
                    <li id={`currentWebsite${index}`}>{current.website}</li>
                    <li id={`currentProvince${index}`}>{current.province}</li>
                </ul>
            ))}
        </div>
      </section>

    </>
  )
};
export default SchoolCenters;