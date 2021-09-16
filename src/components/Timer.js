import React, { useState, useEffect } from "react";

let timeIntervalId;

const Timer = ({ gameOver, start }) => {
    let [time, setTime] = useState(0);
    let [sTime, setSTime] = useState(0);

    useEffect(() => {
        if ((time > 0 && gameOver) || !start) {
            setSTime(time);
            setTime(0);
        }
    }, [gameOver, time, start]);

    useEffect(() => {
        const incrementTime = () => {
            let newTime = time + 1;
            setTime(newTime);
        };
        timeIntervalId = setTimeout(() => {
            incrementTime();
        }, 1000);
        if (gameOver || !start) {
            //   let updatedTime = JSON.parse(JSON.stringify(time));

            clearInterval(timeIntervalId);
        }
    }, [time, setTime, gameOver, start]);

    return (
        <React.Fragment>
            <p className="blockCenter px-5">
                <span role="img" aria-label="clock" style={{ paddingRight: 5 }}>
                    ⏰
                </span>
                {gameOver ? sTime : time}
            </p>
        </React.Fragment>
    );
}

export default Timer;