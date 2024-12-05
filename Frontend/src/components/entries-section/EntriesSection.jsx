import React from 'react'
import EntryHeader from './entry-header/EntryHeader'
import Entry from './entry/Entry'
import "./EntriesSection.css"

const EntriesSection = () => {

  const entries = [1, 2, 3, 4, 5];

  return (
    <div className='entry_container'>
      <EntryHeader />
      {
        entries.map((index) => (
          <Entry key={index} number={index} />
        ))
      }

    </div>
  )
}

export default EntriesSection
