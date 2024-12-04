import React from 'react'
import EntryHeader from './entry-header/EntryHeader'
import Entry from './entry/Entry'
import "./EntriesSection.css"

const EntriesSection = () => {
  return (
    <div className='entry_container'>
      <EntryHeader />
      <Entry />
      <Entry />
      <Entry />
      <Entry />
    </div>
  )
}

export default EntriesSection
