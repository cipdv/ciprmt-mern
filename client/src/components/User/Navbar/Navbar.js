import React, { useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styles from './styles.module.css'
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

    const toDashboard = () => {
        history.push('/dashboard')
    }

    const toUpdate = () => {
        history.push('/healthhistory/update')
    }

    const toReceipts = () => {
        history.push('/dashboard/receipts')
    }

    const toLogin = () => {
        history.push('/auth')
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
            // <nav className="ui inverted menu" >   
            <nav className={styles.navbar}>
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
            <nav className={styles.navbar}>             
                {user ? (
                    <ul>
                        <li className={styles.logo}>
                            <Link style={{color: 'white'}} to={'/'}>
                                Cip de Vries, RMT
                            </Link>
                        </li>
                        <li className={styles.menuitem} style={{color: 'white'}} onClick={toDashboard}>
                            {/* <Link to={'/dashboard'}> */}
                                Dashboard
                            {/* </Link> */}
                        </li>
                        <li className={styles.menuitem} style={{color: 'white'}} onClick={toUpdate}>
                            {/* <Link to={'/healthhistory/update'}> */}
                                Update Health History
                            {/* </Link> */}
                        </li>
                        <li className={styles.menuitem} style={{color: 'white'}} onClick={toReceipts}>
                            {/* <Link to={'/dashboard/receipts'}> */}
                                View Appointment Receipts
                            {/* </Link> */}
                        </li>
                        <li className={styles.menuitem} style={{float: 'right'}} onClick={handleLogout}>
                            Logout
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <li className={styles.logo}>
                            <Link style={{color: 'white'}} to={`/`}>
                                Cip de Vries, RMT
                            </Link>
                        </li>
                        <li className={styles.menuitem} style={{float: 'right'}} onClick={toLogin}>
                            Login
                        </li>    
                    </ul>
                    
                )}
            </nav>
        )
    )
}

export default Navbar
