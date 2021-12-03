import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

    return (
        <div>
            Cip is a really cool massage therapist.
            <Link to="/auth">
                <button className="ui button">Book a massage</button>
            </Link>
        </div>
    )
}

export default Home
