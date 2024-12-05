import React, { useState } from 'react'
import "./EntryForm.css"
import StudentAnnotationServices from '../../../../services/studentAnnotationServices'

const EntryForm = ({ aptNumber }) => {


  const initialAnnotation = {
    account_id: 1,
    number: aptNumber,
    account_number: '',
    debit: '',
    credit: '',
    student_entry_id: 1,
  }

  const [currentAnnotation, setCurrentAnnotation] = useState(initialAnnotation);
  const deleteEntry = (e) => {
    e.preventDefault()
  }

  const saveEntry = (e) => {
    e.preventDefault()
    StudentAnnotationServices.create(currentAnnotation).then
      (response => {
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })

  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentAnnotation({ ...currentAnnotation, [name]: value });
    console.log(currentAnnotation)
  };



  return (
    <div className='entry_form_wrapper'>
      <p>{aptNumber}</p>
      <form action="" className='entry_form'>
        <div className="form_group">
          <label htmlFor="account_number">Nº Cuenta</label>
          <input type="number" id='account_number' name='account_number' onChange={handleChange} />
        </div>
        <div className="form_group">
          <label htmlFor="accountName">Nombre Cuenta</label>
          <input type="text" id='accountName' name='accountName' />
        </div>
        <div className="form_group">
          <label htmlFor="debit">Debe</label>
          <input type="number" id='debit' name='debit' onChange={handleChange} />
        </div>
        <div className="form_group">
          <label htmlFor="credit">Haber</label>
          <input type="number" id='credit' name='credit' onChange={handleChange} />
        </div>
        <button className='btn-trash' onClick={deleteEntry}><i className='fi fi-rr-trash'></i></button>
        <button className='btn-trash' onClick={saveEntry}><i className='fi fi-rr-disk'></i></button>
      </form>
    </div>
  )
}

export default EntryForm
