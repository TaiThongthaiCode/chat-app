import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (

    <div className='textContainer'>
        <h3>Online: </h3>
        <ScrollToBottom className='activeContainer'>
            {users.map((user, i) => 
                <div key={user.name} className='activeItem'>
                    <img className='img' alt="Online Icon" src={onlineIcon}/>
                    {user.name}
                </div>
            )}
        </ScrollToBottom>
    </div>

)

export default TextContainer;