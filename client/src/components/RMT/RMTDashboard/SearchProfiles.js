import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { searchUsers } from '../../../actions/healthHistory'


const SearchProfiles = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [searchName, setSearchName] = useState('')

    const searchPosts = (e) => {
        e.preventDefault()
        if(searchName.trim()) {
            dispatch(searchUsers(searchName))
            clear()
        } else {
            history.push('/rmt/dashboard')
        }
    }
 
    const clear = () => {
        setSearchName('')
    }

    return (
        <form onSubmit={searchPosts}>
                <div className="ui input">
                    <input type="text" placeholder="Search patient profiles" value={searchName} onChange={(e)=>setSearchName(e.target.value)} />
                    <button type="submit" style={{marginLeft: '10px'}} className="ui button">Search</button>
                </div>
            </form>
    )
}

export default SearchProfiles
