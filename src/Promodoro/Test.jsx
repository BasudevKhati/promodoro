import React, { useEffect } from 'react'

const Test = () => {
    useEffect(() => {
        requestPermission();
    }, [])
    const requestPermission = async () => {
        if (!("Notification" in window)) {
            console.log("Browser does not support desktop notification");
        } else if (await Notification.permission === 'granted') {
            new Notification('Granted')
        }
        else {
            Notification.requestPermission();
        }
    }
    const showNotification = async () => {
        var options = {
            body: 'Notification Body',
            icon: 'https://www.vkf-renzel.com/out/pictures/generated/product/1/356_356_75/r12044336-01/general-warning-sign-10836-1.jpg?    auto=compress&cs=tinysrgb&dpr=1&w=500',
            dir: 'ltr',
        };
        new Notification('Hello World', options);


    }
    return (
        <div>
            <button onClick={showNotification} >Show Notification</button>
        </div>
    )``
}

export default Test
