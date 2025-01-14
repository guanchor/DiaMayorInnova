import "./EntryHeader.css"

const EntryHeader = ({ addEntry }) => {
  return (
    <div className='entry_header'>
      <h2>Asientos Contables</h2>
      <section className="entry_buttons">
        <select className="entry_selector" name="entry_selector" id="entry_selector" aria-placeholder='selector'>
          <option value="">Asiento 1</option>
        </select>
        <button className='btn' onClick={addEntry}><i className='fi fi-rr-plus'></i>Asiento</button>
      </section>
    </div>
  )
}

export default EntryHeader
