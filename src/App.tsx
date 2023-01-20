import {
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Grid,
  Modal,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import ClockDisplay from "./components/ClockDisplay";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import StageCountDown from "./components/StageCountDown";
import StagesList from "./components/StagesList";

type SingleEventProps = {
  eventName: string;
  location: string;
  startTime: Date;
  endTime: Date;
  host: string;
};

const currentData = {
  data: [
    {
      id: "001",
      duration: 1,
      symbol: "LA",
      name: "Louange et adoration",
      startMessage: "About to start",
      endMessage: "Process is ending",
    },
    {
      id: "002",
      duration: 1,
      symbol: "I",
      name: "Intercession",
      startMessage: "About to start",
      endMessage: "Process is ending",
    },
    {
      id: "003",
      duration: 1,
      symbol: "P",
      name: "Prédication",
      startMessage: "About to start",
      endMessage: "Process is ending",
    },
    {
      id: "004",
      duration: 1,
      symbol: "Co",
      name: "Communiqués",
      startMessage: "About to start",
      endMessage: "Process is ending",
    },
    {
      id: "005",
      duration: 1,
      symbol: "Cl",
      name: "Cloture",
      startMessage: "About to start",
      endMessage: "Process is ending",
    },
  ],
};

type StageTypes = {
  id: string;
  duration: number;
  name: string;
  symbol: string;
  startMessage: string;
  endMessage: string;
};

type CountDownProps = {
  hours: number;
  minutes: number;
  seconds: number;
};

type DataArrayStage = {
  data: StageTypes[];
};

const App: React.FunctionComponent = () => {
  const [data, setdata] = useState<DataArrayStage>(currentData);
  const [currentStage, setcurrentStage] = useState<StageTypes | null>(null);
  const [createEventVisible, setcreateEventVisible] = useState<boolean>(false);
  const [currentEvent, setcurrentEvent] = useState<SingleEventProps | null>(
    null
  );

  const [currentCount, setcurrentCount] = useState<number>(0);
  const [currentCounter, setcurrentCounter] = useState<CountDownProps>({
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
      symbol: currentStage.symbol,
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

  return (
    <Grid>
      <Grid.Col span={12} style={{ height: "25vh" }}>
        <Flex
          direction="row"
          justify="center"
          align="center"
          p={10}
          style={{
            borderBlock: "1px dashed #a6a6a6",
          }}
        >
          <Divider />
          <Text size="md" weight={600}>
            Eglise Arche de l'Alliance Goma
          </Text>
          <Divider />
        </Flex>

        <EventList />
      </Grid.Col>

      <Grid.Col span={12} style={{ height: "75vh", paddingInline: 124 }}>
        <Grid>
          <Grid.Col span={3}>
            <Card>
              <StagesList
                {...data}
                handleReorder={(data: StageTypes[]) =>
                  handleReorderStages(data)
                }
                currentIndex={currentCount}
              />
            </Card>
          </Grid.Col>
          <Grid.Col span={9} key={currentStage?.id}>
            <Card>
              <Text
                size={80}
                style={{ width: "100%", textAlign: "center" }}
                color="blue"
              >
                {currentStage?.name}
              </Text>
              <StageCountDown
                {...currentCounter}
                handleNext={() => handleNextStage()}
              />

              {currentCount + 1 >= data.data.length ? null : (
                <Text size={42} style={{ width: "100%", textAlign: "center" }}>
                  Upcoming : {data?.data[currentCount + 1]?.name}
                </Text>
              )}

              <ClockDisplay />
            </Card>
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  );
};

export default App;
