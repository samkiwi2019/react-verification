import React, { useEffect, useState } from 'react';

const Countdown = ({ seconds }) => {
    const [timeLeft, setTimeLeft] = useState(seconds);
    useEffect(() => {
        if (!timeLeft) return;
        const timer = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    return <>Resend in {timeLeft} s</>;
};

export default Countdown;
