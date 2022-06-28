//dependencies
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
//api calls
import { searchUsers } from '../../../actions/healthHistory'

const SearchProfiles = () => {

    const dispatch = useDispatch()

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
                    <input type="text" placeholder="Search patient profiles" value={searchName} onChange={(e)=>setSearchName(e.target.value)} />
                    <button type="submit">Search</button>
                </div>
                <div style={{marginTop: '1rem'}}>
                    {errors?.general && <h3>{errors?.general}</h3>}
                </div>
            </form>
        </div>
    )
}

export default SearchProfiles
