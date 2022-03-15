import React, {useState} from 'react'
import axios from 'axios'
import styles from '../rmtdashboard.module.css'
import { useHistory } from 'react-router-dom'
import { addToMaintenanceLog } from '../../../../api/index'

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
        addToMaintenanceLog(data)
        history.push('/')
    }

    return (
        <div>
            <div className={styles.box}>
                <form className={styles.form} onSubmit={submitMaintenanceLog}>
                    <div className={styles.formfield}>
                        <h3>Massage mat</h3>
                        <div>
                            <input style={{marginRight: '1rem'}} type="checkbox" checked={massageMatNoTears} onChange={(e)=> setMassageMatNoTears(e.target.checked)} />
                            <label>Check massage mat for tears and damage</label>
                        </div>
                        <input className={styles.forminput} type="text" value={massageMatNotes} onChange={(e)=>setMassageMatNotes(e.target.value)} />
                    </div>
                    <div className={styles.formfield}>
                        <h3>Electronics</h3>
                        <div>
                            <input style={{marginRight: '1rem'}} type="checkbox" checked={electronicsNoDamage} onChange={(e)=> setElectronicsNoDamage(e.target.checked)} />
                            <label>Check electronics and wires (speakers, lamps) for damage</label>
                        </div>
                        <input className={styles.forminput} type="text" value={electronicsNotes} onChange={(e)=>setElectronicsNotes(e.target.value)} />
                    </div>
                    <div className={styles.formfield}>
                        <h3>Self-care tools</h3>
                        <div>
                            <input style={{marginRight: '1rem'}} type="checkbox" checked={selfCareToolsNoDamage} onChange={(e)=> setSelfCareToolsNoDamage(e.target.checked)} />
                            <label>Check self-care tools (foam roller and massage balls) for damage</label>
                        </div>
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
