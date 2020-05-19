import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import InfoBar from '../InfoBar/InfoBar.js';
import Input from '../Input/Input.js';
import Messages from '../Messages/Messages.js'
import TextContainer from '../TextContainer/TextContainer.js'

import './Chat.css';

let socket;

const Chat = (props) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    const ENDPOINT = "https://tai-react-chat-app.herokuapp.com/"


    // LIFE CYLCE METHOD FOR JOINING 
    useEffect(() => {
        const {name, room} = queryString.parse(props.location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, (error) => {
            console.log(error);
        });
        
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    } , [ENDPOINT, props.location.search]);
    // 

    // LIFE CYCLE FOR HANDLING MESSAGES
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });


    }, [messages]);

    //LIFE CYCLE FOR HANDLING USERS IN ROOM UPDATES
    useEffect(()=> {
        socket.on('roomData', ({ room, users }) => {
            setUsers(users)
        });
    }, [users])



    // FUNCTION SEND MESSAGE
    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => {
                setMessage('');
            });
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
            <TextContainer users={users}/>
        </div>
     
    )
};

export default Chat 