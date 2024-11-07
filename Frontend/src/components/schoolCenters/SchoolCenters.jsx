import React, { useEffect, useState } from "react";
import SchoolServices from "../../services/SchoolsServices.js";
import "./SchoolCenters.css";

const SchoolCenters = () => {
    const [schools, setSchools] = useState([]);
    
    const allSchools = () =>{
        SchoolServices.getAll()
            .then(response => {
                setSchools(response.data);
                console.log(response.data);
            })
    }

    useEffect(() =>{
        allSchools();
    },[]);
    
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
            <form action="">
                <fieldset>
                    <label htmlFor="schoolName">Nombre del centro</label>
                    <input type="text" name="schoolName" id="schoolName_input" className="schoolCenter_item" placeholder="Nombre del centro"/>
                </fieldset>
            </form>

            
        </section>


        </>
    )};
export default SchoolCenters;