import "./EntryHeader.css"

const EntryHeader = ({ addEntry, selectedStatement }) => {
  return (
    <div className='entry_header'>
      <h2>Asientos Contables</h2>
      <section className="entry_buttons">
        <label className="entry_selector__label" htmlFor="entry_selector">Selector de asiento contable
          <select className="entry_selector" name="entry_selector" id="entry_selector" >
            <option value="">Seleccione un asiento</option>
          </select>
        </label>
        <button className='btn' onClick={() => {
          if (selectedStatement) {
            addEntry(selectedStatement.id);
          } else {
            alert("Por favor, selecciona un enunciado antes de agregar un asiento.");
          }
        }}><i className='fi fi-rr-plus'></i>Asiento</button>
      </section>
    </div>
  )
}

export default EntryHeader
