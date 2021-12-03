import React, { useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './styles.css'
import decode from 'jwt-decode'
import SearchProfiles from '../../RMT/RMTDashboard/SearchProfiles'

const Navbar = ({user, setUser}) => {

    const location = useLocation()
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' })
        setUser(null)
        history.push('/')  
    }

    useEffect(()=>{
        const token = user?.token

        if(token) {
            const decodedToken = decode(token)

            if (decodedToken.exp *1000 < new Date().getTime()) handleLogout()
            
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])


    return (
        user?.result?.userType === 'rmt' ? (
            <nav className="ui inverted menu" style={{backgroundColor: '#a7a0a9'}} >   
            <div className="item left">
                {user ? (
                    <div>
                        <Link to={'/rmt/dashboard'}>
                            <h3 style={{color: "white", marginBottom: "10px"}}>{user?.result?.firstName} {user?.result?.lastName}</h3>
                        </Link>
                        <button className="ui button" onClick={handleLogout}>Logout</button>
                    </div>
                    
                ) : (
                    <Link to="/auth">
                        <button className="ui button olive">Login</button>
                    </Link>
                )}
            </div>
            <div className="item">
                <SearchProfiles />
            </div>
            <div className="item right">              
                <Link to="/rmt/financialstatements">
                        Financial Statements              
                </Link>
            </div>
        </nav>
        ) : (
        <nav className="ui inverted menu" style={{backgroundColor: '#8FBC8F'}}>
            <Link to={`/`}>
                <h3 className="item">Cip de Vries, RMT</h3>
            </Link>
            <div className="item right">
                {user ? (
                    <div>
                        <h3>{user?.result?.firstName} {user?.result?.lastName}</h3>
                        <button className="ui button" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <Link to="/auth">
                        <button className="ui button">Login</button>
                    </Link>
                )}
            </div>
        </nav>
        )
    )
}

export default Navbar
