import React from 'react'
import EntriesSection from '../../../components/entries-section/EntriesSection'
import AuxSectionTwo from '../../../components/aux-section-two/AuxSectionTwo'
import "./ExamPage.css"
import HelpSection from '../../../components/aux-section-one/HelpSection'

const ExamPage = () => {
  return (
    <div className='modes_page_container exam-color'>
      <p className='head_task'>Modo Examen</p>
      <EntriesSection />
      <HelpSection />
      <AuxSectionTwo />
    </div>
  )
}

export default ExamPage
