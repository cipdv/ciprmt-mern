import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { searchUsers } from '../../../actions/healthHistory'
import styles from './rmtdashboard.module.css'

const SearchProfiles = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [searchName, setSearchName] = useState('')
    const [errors, setErrors] = useState({
        general: ''
    })

    const searchPosts = (e) => {
        e.preventDefault()
        setErrors({general: ''})
        if(searchName.trim()) {
            dispatch(searchUsers(searchName, setErrors))
            clear()
        } 
    }
 
    const clear = () => {
        setSearchName('')
    }

    return (
        <div>
            <form onSubmit={searchPosts}>
                <div>
                    <input className={styles.forminput} type="text" placeholder="Search patient profiles" value={searchName} onChange={(e)=>setSearchName(e.target.value)} />
                    <button type="submit" style={{marginLeft: '10px'}}>Search</button>
                </div>
                <div style={{marginTop: '1rem'}}>
                    {errors?.general && <h3>{errors?.general}</h3>}
                </div>
            </form>
        </div>
    )
}

export default SearchProfiles
