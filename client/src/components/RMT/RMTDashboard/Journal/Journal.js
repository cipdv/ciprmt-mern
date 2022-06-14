//dependencies
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
//api calls
import { addJournalEntry } from '../../../../api'

const Journal = ({user}) => {

    const history = useHistory()

    const [journalEntry, setJournalEntry] = useState('')

    const data = {
        journalEntry
    }

    const submitJournalEntry = () => {
        addJournalEntry(data)
        history.push('/rmt/dashboard')
    }

    return (
        <div>
            <h4>{user?.result?.firstName}'s Journal</h4>
            <form onSubmit={submitJournalEntry}>
                <textarea value={journalEntry} onChange={(e)=>setJournalEntry(e.target.value)}/>
                <button className='btn orange' type="submit">Submit entry</button>
            </form>
        </div>
    )
}

export default Journal
