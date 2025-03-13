import React, { useState } from 'react'
import AuxSectionTwo from '../../../components/aux-section-two/AuxSectionTwo'
import EntriesSection from '../../../components/entries-section/EntriesSection'
import "./PracticePage.css"
import "../../../components/entries-section/EntriesSection.css"
import useScreenSize from '../../../hooks/useScreenSize'
import EntryMobile from '../../../components/entries-section/entry-mobile/EntryMobile'
import HelpSection from '../../../components/help-section/HelpSection'
import EntryHeader from '../../../components/entries-section/entry-header/EntryHeader'
import useEntry from '../../../hooks/useEntry'
import useAnnotation from '../../../hooks/useAnnotation'
import Entry from '../../../components/entries-section/entry/Entry'

const PracticePage = () => {
  const { addEntry, removeEntry, entries } = useEntry();
  const { addAnnotation, deleteAnnotation, updateAnnotation, annotations } = useAnnotation();
  const [auxSection, setAuxSection] = useState("help_example")
  let [sectionAux, setSectionAux] = useState(<HelpSection />);

  if (useScreenSize().width < 600) {
    return (
      <EntryMobile />
    )
  }

  const changeAuxSection = (section) => {
    switch (section) {
      case "statements":
        setSectionAux(<AuxSectionTwo />)
        setAuxSection("statements")
        break;

      case "mayor":
        setSectionAux(<div>Diario Mayor</div>)
        setAuxSection("mayor")
        break;

      case "balance":
        setSectionAux(<div>Balance</div>)
        setAuxSection("balance")
        break;

      default:
        setSectionAux(<HelpSection />)
        setAuxSection("help_example")
        break;
    }
  }

  return (
    <div className='modes_page_container practice_color'>
      <h1 className='head_task'>Modo Tarea</h1>

      <div className="entry__container">
        <EntryHeader
          addEntry={addEntry}
          selectedStatement={true}
        />
        <section className='modes-entries-container scroll-style'>
          {
            entries.map((entry, index) => {
              return (
                <Entry
                  key={entry.entry_uid}
                  entryIndex={entry.entry_uid}
                  number={index + 1}
                  date={entry.entry_date}
                  markId={entry.mark_id}
                  annotations={annotations.filter(annotation => annotation.student_entry_uid === entry.entry_uid)}
                  updateAnnotation={updateAnnotation}
                  deleteAnnotation={deleteAnnotation}
                  addAnnotation={addAnnotation}
                  deleteEntry={removeEntry}
                />
              )
            })
          }
        </section>
      </div>

      <div className="practice__section_2">
        <div className="section_2__tab_buttons">
          <button className={auxSection === "help_example" ? 'btn__tabs--radius btn__tabs  btn__tabs--active' : 'btn__tabs btn__tabs--radius'} onClick={() => changeAuxSection("help_example")}>Ejemplos de Ayuda</button>
          <button className={auxSection === "statements" ? 'btn__tabs btn__tabs--active' : 'btn__tabs'} onClick={() => changeAuxSection("statements")}>Enunciados</button>
          <button className={auxSection === "mayor" ? 'btn__tabs btn__tabs--active' : 'btn__tabs'} onClick={() => changeAuxSection("mayor")}>Diario Mayor</button>
          <button className={auxSection === "balance" ? 'btn__tabs btn__tabs--active' : 'btn__tabs'} onClick={() => changeAuxSection("balance")}>Balance</button>
        </div>
        {
          sectionAux
        }

      </div>


      {/*       <EntriesSection />
      <HelpSection />
      <AuxSectionTwo /> */}
    </div>
  )
}

export default PracticePage
