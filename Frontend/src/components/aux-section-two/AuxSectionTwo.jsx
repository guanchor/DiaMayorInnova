import "./AuxSectionTwo.css"

const AuxSectionTwo = () => {
  return (
    <div className='aux-section_two__container'>
      <h2 className='help_secction_tittle'>Mayores</h2>
      <section className='section-two_loader'>
        <label className='ledger_labels'> Cuenta:
          <input type="text" placeholder='Cuenta pescado' />
        </label>
        <label className='ledger_labels--small'> Asiento:
          <input type="number" placeholder='1' />
        </label>
      </section>
      <section>
        <div className="ledger">
          <p>numero Cuenta</p>
          <p>Asiento</p>
          <p>Debe</p>
          <p>Haber</p>
          <p>Saldo</p>
        </div>
        <div className="ledger_container">
          <div className="ledger_wrapper">

          </div>
        </div>
      </section>
      <label className='label_result'>Resultado
        <input type="number" placeholder='Total' />
      </label>
    </div>
  )
}

export default AuxSectionTwo
