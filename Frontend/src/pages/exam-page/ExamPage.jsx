import React from 'react'
import EntriesSection from '../../components/entries-section/EntriesSection'
import AuxSectionOne from '../../components/aux-section-one/AuxSectionOne'
import AuxSectionTwo from '../../components/aux-section-two/AuxSectionTwo'
import "./ExamPage.css"

const ExamPage = () => {
  return (
    <div className='modes_page_container exam-color'>
      <p className='head_task'>Modo Examen</p>
      <EntriesSection />
      <AuxSectionOne />
      <AuxSectionTwo />
    </div>
  )
}

export default ExamPage
