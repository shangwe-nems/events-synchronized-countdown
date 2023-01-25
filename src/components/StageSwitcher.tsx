import { Loader } from "@mantine/core";
import React, { useEffect, useState } from "react";
import background from "../assets/img/rm422-047.jpg";

type SwitchProps = {
  handleStart: () => void;
};

const StageSwitcher = ({ handleStart }: SwitchProps) => {
  const [countdown, setcountdown] = useState<number>(15);
  const [loading, setloading] = useState<boolean>(true);

  const count = () => {
    if (countdown <= 0) {
      reset();
    }
    setcountdown((e) => e - 1);
  };

  const reset = () => {
    setcountdown(0);
    setloading(false);
    handleStart();
  };

  useEffect(() => {
    const timerId = setInterval(() => (loading ? count() : null), 1000);
    return () => {
      clearInterval(timerId);
    };
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "grid",
        placeContent: "center",
      }}
    >
      <div
        style={{
          fontSize: "6vw",
          width: "100%",
          textAlign: "center",
          paddingInline: "10vw",
        }}
      >
        <p>Vous avez 15' pour la predication!!</p>
        <span>
          <Loader size={120} color="gray" />
          <p style={{ fontSize: 24, marginTop: -126 }}>{countdown}s</p>
        </span>
      </div>
    </div>
  );
};

export default StageSwitcher;
