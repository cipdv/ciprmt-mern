//dependencies
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
//api calls
import { addJournalEntry } from '../../../../api'

const Journal = ({user}) => {

    const history = useHistory()

    const [entry, setEntry] = useState('')

    const data = {
        entry
    }

    const submitJournalEntry = () => {
        addJournalEntry(data)
        history.push('/rmt/dashboard')
    }

    return (
        <div>
            <h4>{user?.result?.firstName}'s Journal</h4>
            <form onSubmit={submitJournalEntry}>
                <textarea value={entry} onChange={(e)=>setEntry(e.target.value)}/>
                <button className='btn orange' type="submit">Submit entry</button>
            </form>
        </div>
    )
}

export default Journal
