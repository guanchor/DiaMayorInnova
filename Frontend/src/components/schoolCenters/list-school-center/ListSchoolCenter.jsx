import React, { useEffect, useState } from 'react'
import SchoolsServices from '../../../services/SchoolsServices';
import "./ListSchoolCenter.css"

const ListSchoolCenter = ({ newSchool }) => {
  const [schools, setSchools] = useState([]);  
  const [currentPage, setCurrentPage] = useState(1); //Pagination
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const allSchools = async(page, school_name) => {
    setIsLoading(true);
    try {
      const data = await SchoolsServices.getAll(page, 10, school_name);
      if (data) {
        setSchools(data.schools);
        setTotalPages(data.meta.total_pages)
      }
    }
    catch (e) {
      console.log(e);
    }
    finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    allSchools();
  }, [newSchool, currentPage]);


  return (
    <>
      <section className='school-center-list__container scroll-style'>
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

        <div className="school-list__pagination">
          <button className="btn" disabled={currentPage === 1 || isLoading} onClick={() => setCurrentPage((prev) => prev - 1)}>
            <i className='fi fi-rr-angle-small-left'/>
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button className="btn" disabled={currentPage === totalPages || isLoading} onClick={() => setCurrentPage((prev) => prev + 1)}>
            <i className='fi fi-rr-angle-small-right'/>
          </button>
         </div>
      </section>
    </>
  )
}

export default ListSchoolCenter
