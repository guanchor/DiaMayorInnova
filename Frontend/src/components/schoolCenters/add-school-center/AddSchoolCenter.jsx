import React from 'react'
import "./AddSchoolCenter.css"

const AddSchoolCenter = ({ updateState, editSchool, addSchool, setFormData, formData }) => {

  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  return (
    <>
      <section className="create-schools_wrapper">
        <h2>Crear Centro Escolar</h2>
        <form className="create-schools_form" action="" onSubmit={updateState ? editSchool : addSchool}>
          <fieldset className='create-schools_fieldset'>
            <label className='school_label'>Nombre del centro
              <input type="text" name="school_name" id="schoolName_input" className="school-center_item" placeholder="Nombre del centro" value={formData.school_name} onInput={handleChange} />
            </label>
            <label className='school_label'>Provincia
              <input type="text" name="province" id="schoolProvince_input" className="school-center_item" placeholder="Provincia " value={formData.province} onInput={handleChange} />
            </label>
          </fieldset>
          <fieldset className='create-schools_fieldset'>
            <label className='school_label'>Dirección del centro
              <input type="text" name="address" id="schoolAddress_input" className="school-center_item" placeholder="Dirección del centro" value={formData.address} onInput={handleChange} />
            </label>
            <label className='school_label'>Telefono
              <input type="tel" name="phone" id="schoolPhone_input" className="school-center_item" placeholder="Telefono" value={formData.phone} onInput={handleChange} />
            </label>
          </fieldset>
          <label className='school_label'>Correo del centro
            <input type="email" name="email" id="schoolEmail_input" className="school-center_item" placeholder="Correo del centro" value={formData.email} onInput={handleChange} />
          </label>
          <label className='school_label'>Web del centro
            <input type="text" name="website" id="schoolWebsite_input" className="school-center_item" placeholder="Web del centro" value={formData.website} onInput={handleChange} />
          </label>
          <button type="submit" className="createSchool_submit btn"><i className='fi fi-rr-plus'></i>Añadir Centro</button>
        </form>

      </section>
    </>
  )
}

export default AddSchoolCenter
