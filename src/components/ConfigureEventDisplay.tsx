import { Button, Divider } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { CountDownTypes, EventTypes, StageTypes } from "../types";
import EventForm from "./EventForm";
import StagesList from "./StagesList";

const currentData = {
  data: [
    {
      id: "001",
      duration: 1,
      name: "Louange et adoration",
      startMessage: "About to start",
      endMessage: "Process is ending",
    },
    {
      id: "002",
      duration: 1,
      name: "Intercession",
      startMessage: "About to start",
      endMessage: "Process is ending",
    },
    {
      id: "003",
      duration: 2,
      name: "Prédication",
      startMessage: "About to start",
      endMessage: "Process is ending",
    },
    {
      id: "004",
      duration: 1,
      name: "Communiqués",
      startMessage: "About to start",
      endMessage: "Process is ending",
    },
    {
      id: "005",
      duration: 1,
      name: "Cloture",
      startMessage: "About to start",
      endMessage: "Process is ending",
    },
  ],
};

type Props = EventTypes & {
  handleClose: () => void;
};
type DataArrayStage = {
  data: StageTypes[];
};

const ConfigureEventDisplay = ({ handleClose, ...eventData }: Props) => {
  const [currentStage, setcurrentStage] = useState<StageTypes | null>(null);
  const [data, setdata] = useState<DataArrayStage>({ data: eventData.stages });

  const [currentCount, setcurrentCount] = useState<number>(0);
  const [currentCounter, setcurrentCounter] = useState<CountDownTypes>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const currentStage = data.data[currentCount];
    setcurrentStage({
      ...currentStage,
    });

    setcurrentCounter({
      hours: Math.trunc(currentStage?.duration / 60),
      minutes: currentStage?.duration % 60,
      seconds: 0,
    });

    return () => {
      setcurrentStage(null);
    };
  }, []);

  const handleNextStage = (): void => {
    if (currentCount + 1 >= data.data.length) return;

    setcurrentCount((e) => e + 1);
    const currentStage = data.data[currentCount + 1];
    setcurrentStage({
      duration: currentStage.duration,
      id: currentStage.id,
      name: currentStage.name,
      startMessage: "Starting the event",
      endMessage: "The event has ended",
    });
    setcurrentCounter({
      hours: Math.trunc(currentStage?.duration / 60),
      minutes: currentStage?.duration % 60,
      seconds: 0,
    });
  };

  const handleReorderStages = (reorderedData: StageTypes[]): void => {
    setdata({
      data: [...reorderedData],
    });
  };

  const handleAddStage = (newStage: StageTypes): void => {
    const newState = { data: [...data.data, newStage] };
    setdata(newState);
  };

  return (
    <div>
      <EventForm
        status="update"
        currentEventData={eventData}
        handleCreate={function (data: EventTypes): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Divider mt={14} mb={14} size="xl" />
      <StagesList
        {...data}
        handleReorder={(data: StageTypes[]) => handleReorderStages(data)}
        currentIndex={currentCount}
        handleAdd={(data: StageTypes) => handleAddStage(data)}
      />
    </div>
  );
};

export default ConfigureEventDisplay;
