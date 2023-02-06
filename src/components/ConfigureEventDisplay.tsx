import { Button, Divider, Flex, Grid, Modal, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { BsCalendar2Event } from "react-icons/bs";
import { CountDownTypes, EventTypes, StageTypes } from "../types";
import EventForm from "./EventForm";
import StageForm from "./StageForm";
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
  // eventData: EventTypes,
  handleConfig: (selected: EventTypes) => void;
};
type DataArrayStage = {
  data: StageTypes[];
};

const ConfigureEventDisplay = ({ handleConfig, ...eventData }: Props) => {
  const [currentStage, setcurrentStage] = useState<StageTypes | null>(null);
  const [data, setdata] = useState<DataArrayStage>({ data: eventData.stages });
  const [displayStageForm, setdisplayStageForm] = useState<boolean>(false);

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
    console.log("added stage: ", newStage);

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
      <Grid>
        <Grid.Col span={12}>
          <Flex direction="row" justify="space-between" align="center">
            <Text size="sm" weight={600}>
              Stages of the event
            </Text>
            <Button size="xs" compact onClick={() => setdisplayStageForm(true)}>
              New Stage
            </Button>
          </Flex>
        </Grid.Col>
        <Grid.Col span={12} key={data.data.length - 1}>
          <StagesList
            {...data}
            handleReorder={(data: StageTypes[]) => handleReorderStages(data)}
            currentIndex={currentCount}
          />
        </Grid.Col>
      </Grid>
      <Modal
        opened={displayStageForm}
        onClose={() => setdisplayStageForm(false)}
        title={
          <Text color="blue" size="md" weight={600}>
            <BsCalendar2Event
              size={24}
              style={{ marginBottom: -4, marginRight: 8 }}
            />{" "}
            Create a stage for the current event
          </Text>
        }
      >
        <StageForm
          handleClose={(data: StageTypes) => {
            handleAddStage(data);
            setdisplayStageForm(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default ConfigureEventDisplay;
