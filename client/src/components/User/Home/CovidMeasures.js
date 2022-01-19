import React from 'react'
import styles from './styles.module.css'

const CovidMeasures = () => {
    return (
        <div className={styles.box}>
            The following measures are currently being used by Cip de Vries, RMT to reduce the risk of spreading infectious diseases, including Covid-19:
            <ul>
                <li>Cip de Vries, RMT has received 2 doses of the COVID-19 vaccine.</li>
                <li>Cip de Vries, RMT will do a risk assessment to determine if the benefits of receving massage therapy treatment will outweigh the possible risks of transmission of COVID-19 and to determine which personal protective equipment should be worn.</li>
                <li>All patients are screened following the <a target="_blank" href="https://www.health.gov.on.ca/en/pro/programs/publichealth/coronavirus/docs/2019_patient_screening_guidance.pdf">Ministry of Health's COVID-19 Patient Screening Document Guidance</a> when confirming their appointment, and immediately before every appointment.</li> 
                <li>Disposable surgical/procedure masks are worn by Cip de Vries, RMT and the patient at all times while on the premises, including entranceway and treatment room.</li>
                <li>Hands of Cip de Vries, RMT and the patient will be disinfected with either soap and water or an alcohol based hand sanitizer before and after every treatment.</li>
                <li>All surfaces that patients are likely to have come into contact with (including doorknobs, railings, bathroom, and treatment room) are cleaned and disinfected before and after every appointment.</li>
                <li>A daily cleaning log and log of all persons' time on the premises will be recorded.</li>
            </ul>
            <div>
                For a full list of all measures being taken, please refer to <a target="_blank" href="https://www.cmto.com/covid-19/">The CMTO's COVID-19 section</a>.
            </div>
        </div>
    )
}

export default CovidMeasures
