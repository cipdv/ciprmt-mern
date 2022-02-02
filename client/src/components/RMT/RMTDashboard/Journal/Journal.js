import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { addJournalEntry } from '../../../../api'
import styles from './journal.module.css'

const Journal = ({user}) => {

    const history = useHistory()

    const [journalEntry, setJournalEntry] = useState('')

    const data = {
        journalEntry
    }

    const submitJournalEntry = (data) => {
        console.log(data)
        addJournalEntry(data)
        history.push('/rmt/dashboard')
    }

    return (
        <div>
            <h4>{user?.result?.firstName}'s Journal</h4>
            <form onSubmit={submitJournalEntry}>
                <textarea className={styles.journalEntry} value={journalEntry} onChange={(e)=>setJournalEntry(e.target.value)}/>
                <button type="submit" className={styles.btn}>Submit entry</button>
            </form>
        </div>
    )
}

export default Journal
