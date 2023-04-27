import React from "react";
import './style1.css';
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import sound from './sound.mp3'
import { useRef } from "react";
import { useNavigate } from "react-router-dom";


export const Timer = () => {

    const [time, setTime] = useState(null);
    const [isActive, setIsActive] = useState(true);
    const [description, setDescription] = useState('Please choose your schedule !!');
    const [notificationState, setNotificationState] = useState(false);
    const [soundState, setSoundState] = useState(false);
    const [volume, setVolume] = useState(1);
    const [token, setToken] = useState('');

    const navigate = useNavigate();

    const audioRef = useRef(null);

    const handleVolumeChange = (e) => {
        const vol = e.target.value
        console.log(vol)
        setVolume(vol)
    }

    useEffect(()=> {
        const storeToken = localStorage.getItem('token');
        if (!storeToken) {
            navigate('/');
        } else {
            setToken(storeToken)
        }
    }, [])

    const handleLogoutBtn = () => {
        localStorage.removeItem('token');
        console.log(token, "remove")
        navigate('/');
    }

    useEffect(() => {
        if (isActive && time > 0) {
            const interval = setInterval(() => {
                setTime((time) => time - 1)
            }, 1000)
            return () => {
                clearInterval(interval)
            }
        }
        if (time === 0 && notificationState) {
            showNotification();
        }
        if (time === 0 && soundState) {
            notificationSound();
        }
        if(time === 0) {
            setTime(null)
        }
        
    }, [time,  isActive, notificationState, soundState ]);

    const getTime = (time) => {
        
        const minute = Math.floor(time / 60);
        const second = time % 60;

        return `${minute < 10 ? "0" + minute : minute } : ${second < 10 ? "0" + second : second }`
    }
    
    const handlePlayButton = () => {
        setIsActive(true);
    }
    
    const handlePauseButton = () => {
        setIsActive(false);
    }

    const handleCodeTime = () => {
        setTime(30 * 60);
        setDescription('The Code Time');
    }

    const handleSocialTime = () => {
        setTime(1 * 6)
        setDescription('The Social Time');
    }

    const handleCoffeeTime = () => {
        setTime(15 * 60);
        setDescription('The Coffee Time')
    }

    useEffect(() => {
        if(!("Notification" in window)) {
            console.log("Browser does not support desktop notification");
        } else {
            Notification.requestPermission();
        }
    }, [])

    const showNotification = () => {
        new Notification("Time-Up.")
    }

    const handleNotification = (e) => {
        setNotificationState(e.target.checked)
    }

    // const audio = () => {
    //     new Audio(sound).play();
    // }

    const handleAudio = (e) => {
        setSoundState(e.target.checked)
        
    }
    
    const notificationSound = () =>{
        audioRef.current.volume = volume;
        audioRef.current.play();
    }

    return (
        <>
        <Helmet>
            <title>  {getTime(time)} | Promodoro App</title>
        </Helmet>
        <section className="timer-page">
            <div className="page-wrapper">
                <div className="logout-btn" onClick={handleLogoutBtn}>
                    Logout
                </div>
                <div className="middle-content">
                    <div className="time">
                        <span> {getTime(time)}  </span>
                    </div>
                    <div className="time-detail">
                        <p>{description}</p>
                    </div>
                    <div className="time-but">
                        <button onClick={ handleCodeTime  }>
                            Code
                        </button>
                        <button onClick={handleSocialTime} > 
                            Social
                        </button>
                        <button onClick={handleCoffeeTime}>
                            Coffee
                        </button>
                    </div>
                    <div className="play-pause">
                        <button onClick={handlePlayButton}>
                            <i className="fa fa-play-circle" aria-hidden="true"></i>
                        </button>
                        <button onClick={handlePauseButton}>
                            <i className="fa fa-pause-circle" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="footer">
                <div className="footer-status">
                    <div className="about">
                        <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">What is Pomodoro?</a>
                    </div>
                    <div className="check-boxes">
                        <div className="check-input">
                            <label>
                                <input type="checkbox" name="myCheckbox" onChange={handleNotification} /> Notification
                            </label>
                            <label>
                                <input type="checkbox" name="myCheckbox" onChange={handleAudio}/> Sound
                            </label>
                            <label>
                                <input type="checkbox" name="myCheckbox" /> Vibration
                            </label>
                        </div>
                        <div className="volume-check">
                            <i className="fa fa-volume-off" aria-hidden="true"></i>
                            <label>
                                <input type="range" step='0.1' min='0' max='1' id="volume" value={volume} onChange={handleVolumeChange} />
                                <audio style={{display: 'none'}}  src={sound} controls ref={audioRef} />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <p>&copy;2023 by Google Lense  - All Rights Reserve. </p>
                </div>
            </div>
        </section>
        </>
    )

}