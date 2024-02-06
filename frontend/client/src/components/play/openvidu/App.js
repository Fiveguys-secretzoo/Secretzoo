import React, { useState, useEffect, useRef } from 'react';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import './App.css';
import UserVideoComponent from './UserVideoComponent';

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000/';

const App = () => {
    // const [mySessionId, setMySessionId] = useState('');
    const [myUserName, setMyUserName] = useState(sessionStorage.getItem('userName'));
    // const [session, setSession] = useState(undefined);
    // const [mainStreamManager, setMainStreamManager] = useState(undefined);
    const [publisher, setPublisher] = useState(undefined);
    const [subscribers, setSubscribers] = useState([]);
    const session = useRef(undefined);
    useEffect(() => {
        window.addEventListener('beforeunload', onbeforeunload);
        joinSession();
        return () => {
            window.removeEventListener('beforeunload', onbeforeunload);
            leaveSession();
        };
    }, []);

    const onbeforeunload = () => {
        leaveSession();
    };

    const deleteSubscriber = (streamManager) => {
        setSubscribers((prevSubscribers) => prevSubscribers.filter((sub) => sub !== streamManager));
    };

    const joinSession = async () => {
        const OV = new OpenVidu();

        const mySession = OV.initSession();
        
        mySession.on('streamCreated', (event) => {
            const subscriber = mySession.subscribe(event.stream, undefined);
            setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
        });
        
        mySession.on('streamDestroyed', (event) => {
            deleteSubscriber(event.stream.streamManager);
        });
        
        mySession.on('exception', (exception) => {
            console.warn(exception);
        });
        
        try {
            const token = await getToken(sessionStorage.getItem('roomName'));
            setMyUserName(sessionStorage.getItem('userName'));
            
            mySession.connect(token, { clientData: myUserName })
            .then(async () => {
                let newPublisher = await OV.initPublisherAsync(undefined, {
                    audioSource: undefined,
                    videoSource: undefined,
                    publishAudio: true,
                    publishVideo: true,
                    resolution: '640x480',
                    frameRate: 30,
                    insertMode: 'APPEND',
                    mirror: false,
                });
                
                await mySession.publish(newPublisher);
                
                setPublisher(newPublisher);
            })
            .catch((error) => {
                console.log('There was an error connecting to the session:', error.code, error.message);
            });
        } catch (error) {
            console.error(error);
        }
        session.current = mySession;
        console.log(session);
    };
    
    const leaveSession = () => {
        const mySession = session.current;
        sessionStorage.removeItem('roomName');
        if (mySession) {
            mySession.disconnect();
        }
        
        session.current=undefined;
        setSubscribers([]);
        // setMySessionId('');
        setMyUserName(sessionStorage.getItem('userName'));
        // setMainStreamManager(undefined);
        setPublisher(undefined);
    };

    const getToken = async (sid) => {
        const safeid = encodeURIComponent(sid).replace(/[%]/g, '');
        const sessionId = await createSession(safeid);
        return await createToken(sessionId);
    };

    const createSession = async (sessionId) => {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    };

    const createToken = async (sessionId) => {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    };

    return (
        <div className="container">
            <div id="video-container" className="col-md-6">
                {publisher !== undefined ? (
                    <div className="stream-container col-md-6 col-xs-6">
                        <UserVideoComponent streamManager={publisher} />
                    </div>
                    
                ) : null}
            </div>
            <div className="video-container">
                {subscribers.map((sub, i) => (
                    <div key={sub.id} className="stream-container col-md-6 col-xs-6">
                        <span>{sub.id}</span>
                        <UserVideoComponent streamManager={sub} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
