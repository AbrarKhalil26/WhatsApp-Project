import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import ChatContainer from '../ChatContainer/ChatContainer'
import './ChatPage.css'


function ChatPage({currentUser, signOut}) {
    return (
        <div className='chatpage'>
            <div className='chatpage-container'>
                {/* Sidebar */}
                <Sidebar currentUser={currentUser} signOut={signOut}/>
                {/* ChatContainer */}
                <ChatContainer currentUser={currentUser}/>

            </div>
        </div>
    )
}

export default ChatPage
