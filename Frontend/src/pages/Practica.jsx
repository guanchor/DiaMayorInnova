import React from 'react'
import Shortcut from '../components/shortcut/Shortcut'

const Practica = () => {
  return (
    <>
      <div className='practica'>
        <button className='btn' disabled><i className='fi fi-rr-search'></i>hola</button>
        <button className='btn btn--l'><i className='fi fi-rr-search'></i>hola</button>
        <button className='btn btn--border' ><i className='fi fi-rr-search'></i>hola</button>
        <button className='btn btn--l btn--border' disabled><i className='fi fi-rr-search'></i>hola</button>
      </div>
      <div className="practica">
        <Shortcut />
      </div>
    </>
  )
}

export default Practica
