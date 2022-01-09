import React from 'react'
import { Link } from 'react-router-dom'
import ciplegacy from '../../../images/ciprmt-legacy.jpg'
import homestyles from './styles.module.css'

const Home = () => {

    return (
            <div className={homestyles.container}>
                <div className={homestyles.intro}>
                    <img
                        src={ciplegacy}
                        alt="Cip de Vries, RMT"
                        className={homestyles.profilepic}
                    />
                    <h3 style={{marginTop: '10px'}}>Hi, I'm Cip</h3>
                    <h3 style={{marginTop: '-20px'}}>I'm a Massage Therapist</h3>
                    <p>
                    I'm very passionate about health and well-being. I love taking care of my body with exercise, healthy foods, and spending time with those I care about. My favourite activities include volleyball, rock climbing, swimming, skating, and just being outdoors with nature. 
                    </p>
                    <p>
                    As your Massage Therapist, I promise to give you 100% of my attention while focusing on your needs to give you the best treatment possible. Your health and well-being are just as important to me as my own. 
                    </p>
                    <Link to="/auth">
                        <button className={homestyles.bookmassagebtn}>Book a massage</button>
                    </Link>
                </div>   
            </div>     
    )
}

export default Home
