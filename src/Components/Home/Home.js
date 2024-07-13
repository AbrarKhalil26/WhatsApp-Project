import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './Home.css'

// Imported Images ======>
import whatappIcon from '../../assest/whatsapp-mobile.png'


function Home({ currentUser, signOut }) {
    return (
        <div className='home'>
            <div className='home-container'>
                {/* SideBar */}
                <Sidebar  currentUser={currentUser} signOut={signOut}/>
                <div className='home-bg'>
                    <img src={whatappIcon} alt='whatapp-icon'/>
                </div>
            </div>
        </div>
    )
}

export default Home
