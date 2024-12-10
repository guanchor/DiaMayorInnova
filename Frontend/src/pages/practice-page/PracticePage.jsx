import React from 'react'
import AuxSectionTwo from '../../components/aux-section-two/AuxSectionTwo'
import AuxSectionOne from '../../components/aux-section-one/AuxSectionOne'
import EntriesSection from '../../components/entries-section/EntriesSection'
import "./PracticePage.css"
import { EntriesProvider } from '../../context/entries-page/EntriesProvider'

const PracticePage = () => {
  return (
    <div className='modes_page_container practice_color'>
      <p className='head_task'>Modo Tarea</p>
      <EntriesProvider>
        <EntriesSection />
      </EntriesProvider>
      <AuxSectionOne />
      <AuxSectionTwo />
    </div>
  )
}

export default PracticePage
