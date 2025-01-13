import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SchoolsServices from '../../../services/SchoolsServices';
import "./ListSchoolCenter.css"

const ListSchoolCenter = ({ newSchool }) => {
  const [schools, setSchools] = useState([]);

  const allSchools = () => {
    SchoolsServices.getAll()
      .then(response => {
        setSchools(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  useEffect(() => {
    allSchools();
  }, [newSchool]);


  return (
    <>
      <section className='school-center-list__container'>
        {schools.map((school, index) => (
          <ul className="school-center_list" key={index}>
            <li className='school-list_item'>
              <div className="school-list_section">
                <p>{school.school_name}</p>
                <p>{school.phone}</p>
                <p>{school.province}</p>
              </div>
              <div className="school-list_section">
                <p>{school.address}</p>
                <p>{school.website}</p>
              </div>
            </li>
          </ul>
        ))}
      </section>
    </>
  )
}

export default ListSchoolCenter
