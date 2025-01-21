import React, { useState } from 'react'

const MobileEntry = ({ number }) => {
  const [entryStatus, SetentryStatus] = useState(false)

  const changeStatus = () => {
    SetentryStatus(!entryStatus)
  }

  return (
    <section className="mobile-entry_container">
      <p>12/0707</p>
      <header className={entryStatus ? "mobile-entry_head entry_head-line" : "mobile-entry_head"} onClick={changeStatus}>
        <p>a {number}</p>
        <p>10070€</p>
        <p>10070€</p>
        <i className='fi fi-rr-angle-small-down'></i>
      </header>
      <div className="entries_list">
        {
          entryStatus && (
            <div className="mobile-entry_data">
              <input placeholder='1' type="number" />
              <input placeholder='Debe' type="number" />
              <input placeholder='Haber' type="number" />
            </div>
          )
        }
      </div>
    </section>
  )
}

export default MobileEntry
