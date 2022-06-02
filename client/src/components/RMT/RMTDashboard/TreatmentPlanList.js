import React, { useState } from 'react'
import {  useSelector, useDispatch } from 'react-redux'
import { deleteTreatment } from '../../../actions/treatmentPlans'
import Modal from 'react-modal'
import styles from './rmtdashboard.module.css'

const TreatmentPlanList = ({setTreatmentId}) => {

    const dispatch = useDispatch()
    Modal.setAppElement('#root')
    const treatments = useSelector((state)=>state?.treatmentPlanReducer?.treatments)

    const [modalIsOpen, setModalisOpen] = useState(false)
    const [treatId, setTreatId] = useState(null)

    const openModal = () => {
        setModalisOpen(true)
    }

    const confirmDelete = () => {
        dispatch(deleteTreatment(treatId))
        closeModal()
        window.location.reload(false)
    }

    const closeModal = () => {
        setModalisOpen(false)
    }

    const cancelDelete = () => {
        closeModal()
    }

    const selectTreatment = (tid) => {
        setTreatmentId(tid)     
    }

    const handleDelete = (tid) => {
        setTreatId(tid)
        openModal()
    }

    return (
        !treatments ? (
            <div>
                Loading...
            </div>
        ) : (
            <div className={styles.box}>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Duration</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {treatments?.map((t)=>(
                        <tr onClick={()=>selectTreatment(t?._id)}>
                            <td>{t?.date}</td>
                            <td>{t?.time}</td>
                            <td>{t?.duration} minutes</td>
                            <td onClick={()=>handleDelete(t?._id)}><button>Delete</button></td>
                        </tr>
                    )) 
                    }
                    </tbody>
                </table>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className={styles.modal}
                >
                    <div>
                        <h3>Confirm delete treatment</h3>
                        <button className={styles.btn} onClick={confirmDelete}>Delete</button>
                        <button className={styles.btn} onClick={cancelDelete}>Cancel</button>
                    </div>
                    
                </Modal>
            </div>
        )
    )
}

export default TreatmentPlanList
