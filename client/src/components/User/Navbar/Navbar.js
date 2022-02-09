import React, { useEffect, useState } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './styles.css'
import decode from 'jwt-decode'
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
                user ? (
                    <nav className="navbar-rmt">                      
                        <Link className="nav-logo" to={'/rmt/auth'} onClick={() => setOpen(false)}>
                            {user?.result?.firstName} {user?.result?.lastName}
                        </Link>
                        <ul className={open ? "nav-links active" : "nav-links"}>
                            <li className='nav-item'>
                                <Link to="/rmt/financialstatements" className="nav-rmt-link" onClick={() => setOpen(false)}>
                                    Financial Statements              
                                </Link>
                            </li>
                            <div className='dropdown'>
                                <li className='nav-item-dropdown'>
                                    Logs
                                </li>
                                <div className='dropdown-content'>
                                    <li>
                                        <Link to="/rmt/dashboard/dailylog" className="nav-rmt-link" onClick={() => setOpen(false)}>
                                            Daily log             
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/rmt/maintenancelog" className="nav-rmt-link" onClick={() => setOpen(false)}>
                                            Maintenance Log             
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/rmt/dashboard/journal" className="nav-rmt-link" onClick={() => setOpen(false)}>
                                            Journal             
                                        </Link>
                                    </li>
                                </div>
                                
                            </div>
                            <li className="nav-item" onClick={() => setOpen(false)}>
                                <a className="nav-rmt-link" onClick={handleLogout}>Logout</a>
                            </li>                                            
                        </ul>
                    </nav>
                ) : (
                    <nav className='navbar-rmt'>
                        <Link className="nav-logo" to={'/rmt/auth'} onClick={() => setOpen(false)}>
                            {user?.result?.firstName} {user?.result?.lastName}
                        </Link>
                        <ul className={open ? "nav-links active" : "nav-links"}>
                            <li className="nav-item" onClick={() => setOpen(false)}>
                                <Link to="/auth" className="nav-rmt-link">
                                    <li className="nav-item">Login</li>
                                </Link>
                            </li>
                        </ul>
                        
                    </nav>
                )          
        ) : (
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
