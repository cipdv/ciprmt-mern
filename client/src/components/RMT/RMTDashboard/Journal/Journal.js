import React, { useState } from 'react'
import styles from './journal.module.css'

const Journal = () => {

    const [journalEntry, setJournalEntry] = useState('')

    return (
        <div>
            <form>
                <input className={styles.journalEntry} type="text" value={journalEntry} onChange={(e)=>setJournalEntry(e.target.value)}/>
            </form>
        </div>
    )
}

export default Journal
