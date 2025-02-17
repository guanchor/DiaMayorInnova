import "./EntryForm.css"

const EntryForm = ({ aptNumber, annotation, updateAnnotation, onDelete }) => {
  console.log("Annotation recibido en EntryForm:", annotation);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("Name:", name, "Value:", value);  // Depuración
    const updatedAnnotation = { ...annotation, [name]: value };

    if (name === 'debit' && value) {
      updatedAnnotation.credit = '';
    } else if (name === 'credit' && value) {
      updatedAnnotation.debit = '';
    }
    console.log("Updated Annotation:", updatedAnnotation);  // Depuración
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
        <div className="form_group">
          <input
            type="number"
            id='account_number'
            aria-labelledby="tittle_account-number"
            name='account_number'
            placeholder='12345'
            onChange={handleChange}
            value={annotation.account_number || ''}
            min={0} />
        </div>
        <div className="form_group">
          <input
            type="text"
            id='account_name'
            aria-labelledby="tittle_account-name"
            placeholder='Cuenta carne'
            name='account_name'
            onChange={handleChange}
            value={annotation.account_name || ''} />
        </div>
        <div className="form_group">
          <input
            type="number"
            id='debit'
            aria-labelledby="tittle_debit"
            name='debit'
            placeholder='1000'
            onChange={handleChange}
            value={annotation.debit || ''}
            disabled={annotation.credit} />
        </div>
        <div className="form_group">
          <input
            type="number"
            id='credit'
            aria-labelledby="tittle_credit"
            name='credit'
            placeholder='1000'
            onChange={handleChange}
            value={annotation.credit || ''}
            disabled={annotation.debit} />
        </div>
        <button className='btn-trash' aria-label="Eliminar Apunte" onClick={handleDelete}><i className='fi fi-rr-trash'></i></button>
      </form>
    </div>
  )
}

export default EntryForm
