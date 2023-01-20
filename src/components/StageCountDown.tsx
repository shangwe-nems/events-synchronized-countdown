import React, { useEffect, useState } from "react";

type CountDownProps = {
  hours: number;
  minutes: number;
  seconds: number;
  handleNext: () => void;
};

const StageCountDown = ({
  hours = 0,
  minutes = 0,
  seconds = 0,
  handleNext,
}: CountDownProps) => {
  const [time, setTime] = useState<Omit<CountDownProps, "handleNext">>({
    hours,
    minutes,
    seconds,
  });
  const [runTimer, setRunTimer] = useState<boolean>(true);

  const tick = () => {
    if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
      reset();
    } else if (time.minutes === 0 && time.seconds === 0) {
      setTime({ hours: time.hours - 1, minutes: 59, seconds: 59 });
    } else if (time.seconds === 0) {
      setTime({
        hours: time.hours,
        minutes: time.minutes - 1,
        seconds: 59,
      });
    } else {
      setTime({
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds - 1,
      });
    }
  };

  const reset = () => {
    setTime({
      hours: time.hours,
      minutes: time.minutes,
      seconds: time.seconds,
    });
    setRunTimer(false);
    handleNext();
  };

  useEffect(() => {
    const timerId = setInterval(() => (runTimer ? tick() : null), 1000);
    return () => {
      clearInterval(timerId);
    };
  });

  const hh = time.hours.toString().padStart(2, "0");
  const mm = time.minutes.toString().padStart(2, "0");
  const ss = time.seconds.toString().padStart(2, "0");

  return (
    <div>
      <div style={{ width: "100%", textAlign: "center" }}>
        <p style={{ fontSize: 240 }}>
          {hh} : {mm} : {ss}
        </p>
      </div>
    </div>
  );
};

export default StageCountDown;
