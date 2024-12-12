import React from 'react'
import AuxSectionTwo from '../../components/aux-section-two/AuxSectionTwo'
import AuxSectionOne from '../../components/aux-section-one/AuxSectionOne'
import EntriesSection from '../../components/entries-section/EntriesSection'
import "./PracticePage.css"

const PracticePage = () => {
  return (
    <div className='modes_page_container practice_color'>
      <p className='head_task'>Modo Tarea</p>
      <EntriesSection />
      <AuxSectionOne />
      <AuxSectionTwo />
    </div>
  )
}

export default PracticePage
