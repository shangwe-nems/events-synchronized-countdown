import React, { createContext, useEffect, useState } from "react";
import Sound from "./../assets/sound/alarm-security.wav";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type Props = {};

const alarm = new Audio(Sound);

const ClockDisplay = (props: Props) => {
  const [hourDigital, setHourDigital] = useState<string | number>("");
  const [minutesDigital, setMinutesDigital] = useState<string | number>("");
  const [amPm, setAmPm] = useState<string | null>(null);
  const [dayNow, setDayNow] = useState<string | number>("");
  const [monthNow, setMonthNow] = useState<string | number>("");
  const [yearNow, setYearNow] = useState<string | number>("");
  const [alarmTime, setAlarmTime] = useState<string | null>(null);
  const [hasAlarm, setHasAlarm] = useState<boolean>(false);

  useEffect(() => {
    setInterval(() => {
      let date: Date = new Date();
      let HH: number | string = date.getHours(),
        MM: number | string = date.getMinutes(),
        day: number = date.getDate(),
        month: number = date.getMonth(),
        year: number = date.getFullYear(),
        ampm: string;

      if (HH >= 12) {
        HH = HH - 12;
        ampm = "PM";
      } else {
        ampm = "AM";
      }

      if (HH === 0) HH = 12;
      if (HH < 10) HH = `0${HH}`;
      if (MM < 10) MM = `0${MM}`;

      setHourDigital(HH);
      setMinutesDigital(MM);
      setAmPm(ampm);
      setDayNow(day);
      setMonthNow(months[month]);
      setYearNow(year);
    }, 1000);
  }, []);

  if (alarmTime === `${hourDigital}:${minutesDigital} ${amPm}`) {
    alarm.play();
    alarm.loop = false;
  }

  const pauseAlarm = () => {
    alarm.pause();
    setAlarmTime("");
  };

  return (
    <div>
      <p>
        {/* ClockDisplay current time: */}
        {hourDigital}:{minutesDigital} {amPm}
      </p>
      <p>
        {dayNow} {monthNow} {yearNow}
      </p>
    </div>
  );
};

export default ClockDisplay;
