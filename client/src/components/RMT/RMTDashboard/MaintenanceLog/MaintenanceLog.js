import React, {useState} from 'react'
import axios from 'axios'
import styles from '../rmtdashboard.module.css'
import { useHistory } from 'react-router-dom'

const MaintenanceLog = ({user}) => {

    const history = useHistory()

    const [massageMatNoTears, setMassageMatNoTears] = useState(false)
    const [electronicsNoDamage, setElectronicsNoDamage] = useState(false)
    const [selfCareToolsNoDamage, setSelfCareToolsNoDamage] = useState(false)
    const [massageMatNotes, setMassageMatNotes] = useState('')
    const [electronicsNotes, setElectronicsNotes] = useState('')
    const [selfCareToolsNotes, setSelfCareToolsNotes] = useState('')

    const data = {
        massageMatNoTears,
        electronicsNoDamage,
        selfCareToolsNoDamage,
        massageMatNotes,
        electronicsNotes,
        selfCareToolsNotes,
        RMTId: user?.result?._id
    }

    const submitMaintenanceLog = () => {
        axios.post('http://localhost:5000/maintenancelog', data)
        history.push('/')
    }

    return (
        <div>
            <div className={styles.box}>
                <form className={styles.form} onSubmit={submitMaintenanceLog}>
                    <div className={styles.formfield}>
                        <h3>Massage mat</h3>
                        <label>Check massage mat for tears
                            <input type="checkbox" checked={massageMatNoTears} onChange={(e)=> setMassageMatNoTears(e.target.checked)} />
                        </label>
                        <input className={styles.forminput} type="text" value={massageMatNotes} onChange={(e)=>setMassageMatNotes(e.target.value)} />
                    </div>
                    <div className={styles.formfield}>
                        <h3>Electronics</h3>
                        <label>Check electronics and wires (speakers, lamps) for damage</label>
                        <input type="checkbox" checked={electronicsNoDamage} onChange={(e)=> setElectronicsNoDamage(e.target.checked)} />
                        <input className={styles.forminput} type="text" value={electronicsNotes} onChange={(e)=>setElectronicsNotes(e.target.value)} />
                    </div>
                    <div className={styles.formfield}>
                        <h3>Self-care tools</h3>
                        <label>Check self-care tools (foam roller and massage balls) for damage</label>
                        <input type="checkbox" checked={selfCareToolsNoDamage} onChange={(e)=> setSelfCareToolsNoDamage(e.target.checked)} />
                        <input className={styles.forminput} type="text" value={selfCareToolsNotes} onChange={(e)=>setSelfCareToolsNotes(e.target.value)} />
                    </div>
                    <button className={styles.btn} type="submit">Submit</button>
                </form>
            </div>
            <div>
                View maintenance log
            </div>
        </div>
        
    )
}

export default MaintenanceLog
