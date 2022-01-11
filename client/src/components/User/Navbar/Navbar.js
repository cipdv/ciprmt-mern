import React, { useEffect, useState } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './styles.css'
import decode from 'jwt-decode'
import SearchProfiles from '../../RMT/RMTDashboard/SearchProfiles'
import { FiMenu, FiX } from 'react-icons/fi'

const Navbar = ({user, setUser}) => {

    const [open, setOpen] = useState(false)

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
            <nav className="navbar">
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
            
            // <div className='ui menu'>
            //     <Link className='item' to={'/'}>
            //         Cip de Vries, RMT
            //     </Link>
            //     <Link className='item' to={'/'}>
            //         Dashboard
            //     </Link>
            //     <Link className='item' to={'/healthhistory/update'}>
            //         Update Health History
            //     </Link>
            //     <Link className='item' to={'/dashboard/receipts'}>
            //         Appointment Receipts
            //     </Link>
            //     <div className='right menu'>
            //         <a className='item' onClick={handleLogout}>Logout</a>
            //     </div>
            // </div>
                         
                user ? (
                    <nav className="navbar">
                        <Link className="nav-logo" to={'/'} onClick={() => setOpen(false)}>
                            Cip de Vries, RMT
                        </Link>
                        <ul className={open ? "nav-links active" : "nav-links"}>
                            <li className="nav-item">
                                <Link to={'/dashboard'} className="nav-link" onClick={() => setOpen(false)}>                                                     
                                    Dashboard                                                   
                                </Link> 
                            </li>   
                            <li className="nav-item">                     
                                <Link to={'/healthhistory/update'} className="nav-link" onClick={() => setOpen(false)}>
                                    Update Health History
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/dashboard/receipts'} className="nav-link" onClick={() => setOpen(false)}>
                                    Appointment Receipts                              
                                </Link>
                            </li>
                            <li className="nav-item" onClick={() => setOpen(false)}>
                                <a className='nav-link' onClick={handleLogout}>Logout</a>
                            </li>
                            
                        </ul>
                        <div onClick={() => setOpen(!open)} className="nav-icon">
                            {open ? <FiX /> : <FiMenu />}
                        </div>
                    </nav>              
                ) : (
                <nav className='navbar'>
                    <Link to={`/`} className='nav-logo'>
                        Cip de Vries, RMT
                    </Link>
                    <ul>                 
                        <li className='login' onClick={toLogin}>
                            Login
                        </li>    
                    </ul>
                </nav>
                )
            
        )
    )
}

export default Navbar
