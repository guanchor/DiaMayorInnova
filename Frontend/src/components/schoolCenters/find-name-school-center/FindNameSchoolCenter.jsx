import React, { useState } from 'react'
import SchoolsServices from '../../../services/SchoolsServices';
import "./FindNameSchoolCenter.css"

const FindNameSchoolCenter = () => {
  const [searchName, setSearchName] = useState("");
  const [currentSchool, setCurrentSchool] = useState([]);

  const findByName = (e) => {
    e.preventDefault();
    /* SchoolsServices.findByName(searchName)
      .then(response => {
        setCurrentSchool(response.data);
      }).catch(e => {
        console.log(e);
      }); */
  }

  const onChangeSearchName = e => {
    const findName = e.target.value;
    setSearchName(findName);
  }


  return (
    <>
      <section className="search-school_container">
        <h2>Buscar por nombre</h2>
        <form className='search-school_form' action="" onSubmit={findByName}>
          <label className='search-school_label'> Nombre de la escuela
            <input className='search-form_input' type="text" placeholder="Nombre escuela" value={searchName} onChange={onChangeSearchName} />
          </label>
          <button type="submit" className='btn'><i className='fi fi-rr-search'></i>Buscar</button>
        </form>
        <div >
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
}

export default FindNameSchoolCenter
