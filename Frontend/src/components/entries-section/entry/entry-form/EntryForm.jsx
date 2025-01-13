import React from 'react'
import "./EntryForm.css"

const EntryForm = ({ aptNumber, annotation, updateAnnotation, onDelete }) => {

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedAnnotation = { ...annotation, [name]: value };
    updateAnnotation(updatedAnnotation);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    onDelete();
  }

  return (
    <div className='entry_form_wrapper'>
      <p className='entry_apt'>{aptNumber}</p>
      <form action="" className='entry_form'>
        <fieldset className='form_inputs_container'>
          <div className="form_group">
            <input type="number" id='account_number' name='account_number' placeholder='12345' onChange={handleChange} value={annotation.account_number} />
          </div>
          <div className="form_group">
            <input type="text" id='accountName' placeholder='Cuenta carne' name='accountName' value={annotation.account_name} />
          </div>
          <div className="form_group">
            <input type="number" id='debit' name='debit' placeholder='1000' onChange={handleChange} value={annotation.debit} />
          </div>
          <div className="form_group">
            <input type="number" id='credit' name='credit' placeholder='1000' onChange={handleChange} value={annotation.credit} />
          </div>
        </fieldset>
        <button className='btn-trash' onClick={handleDelete}><i className='fi fi-rr-trash'></i></button>
      </form>
    </div>
  )
}

export default EntryForm
