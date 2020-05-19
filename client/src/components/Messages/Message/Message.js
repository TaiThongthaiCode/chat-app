import React from 'react';

import './Message.css';

const Message = ({ message: { user, text }, name }) => {

    let isCurrentUser = false;

    //TODO: FIX THIS I DON'T LIKE HAVING TO PREPROCESS OUTSIDE OF MAINS
    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName){
        isCurrentUser = true;
    }

    return (

        isCurrentUser ? (
            <div className="messageContainer justifyEnd">
                <p className="sentText pr-10">{user}</p>
                <div className="messageBox backgroundBlue">
                    <p className="messageText colorWhite">{text}</p>
                </div>
            </div>

        ) : (
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                    <p className="messageText colorDark">{text}</p>
                </div>
                <p className="sentText pl-10">{user}</p>
            </div>
        )
        
    );

}


export default Message;