import {
  ActionIcon,
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
import {
  BsCalendar,
  BsCalendar2EventFill,
  BsCalendar2PlusFill,
  BsGearFill,
} from "react-icons/bs";
import background from "./assets/img/background2.png";
import ClockDisplay from "./components/ClockDisplay";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import StageCountDown from "./components/StageCountDown";
import StagesList from "./components/StagesList";
import { CountDownTypes, EventTypes, StageTypes } from "./types";

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

type DataArrayStage = {
  data: StageTypes[];
};

const App: React.FunctionComponent = () => {
  const [data, setdata] = useState<DataArrayStage>(currentData);
  const [events, setEvents] = useState<EventTypes[]>([]);
  const [currentStage, setcurrentStage] = useState<StageTypes | null>(null);
  const [createEventVisible, setcreateEventVisible] = useState<boolean>(false);
  const [currentEvent, setcurrentEvent] = useState<EventTypes | null>(null);

  const [currentCount, setcurrentCount] = useState<number>(0);
  const [currentCounter, setcurrentCounter] = useState<CountDownTypes>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [displayEventForm, setdisplayEventForm] = useState<boolean>(false);

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

  const handleSaveEvent = () => {};

  return (
    <div
      style={
        currentCount + 1 >= data.data.length
          ? {
              backgroundImage: `url(${background})`,
              backgroundSize: "100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : {}
      }
    >
      <Grid>
        <Grid.Col
          span={12}
          style={{
            display: "inline-flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingInline: 38,
            paddingBlock: 24,
          }}
        >
          {currentCount + 1 >= data.data.length ? (
            <div className="gear-btn" onClick={() => setdisplayEventForm(true)}>
              <BsCalendar2PlusFill size={28} />
            </div>
          ) : (
            <div className="gear-btn">
              <BsGearFill size={28} />
            </div>
          )}
        </Grid.Col>

        <Grid.Col span={12} key={currentStage?.id} style={{ height: "70vh" }}>
          {currentCount + 1 >= data.data.length ? null : (
            <div className="upper-heading">
              <Text
                style={{ width: "100%", textAlign: "center" }}
                tt="uppercase"
              >
                {currentStage?.name}
              </Text>
            </div>
          )}
          {currentCount + 1 >= data.data.length ? (
            <ClockDisplay />
          ) : (
            <StageCountDown
              {...currentCounter}
              handleNext={() => handleNextStage()}
            />
          )}

          {currentCount + 1 >= data.data.length ? null : (
            <div className="lower-heading">
              <Text style={{ width: "100%", textAlign: "center" }}>
                Prochaine étape : {data?.data[currentCount + 1]?.name}
              </Text>
            </div>
          )}
        </Grid.Col>
        <Grid.Col span={12} style={{ height: "18vh" }}>
          <EventList allEvents={events} />
        </Grid.Col>
        {/* <Grid.Col span={12} key={data.data.length}>
        <StagesList
          {...data}
          handleReorder={(data: StageTypes[]) => handleReorderStages(data)}
          currentIndex={currentCount}
          handleAdd={(data: StageTypes) => handleAddStage(data)}
        />
      </Grid.Col> */}
        <Modal
          opened={displayEventForm}
          onClose={() => setdisplayEventForm(false)}
          title={
            <Text color="blue" size="lg" weight={600}>
              <BsCalendar2PlusFill
                size={24}
                style={{ marginBottom: -4, marginRight: 8 }}
              />{" "}
              Add new event
            </Text>
          }
        >
          <EventForm
            handleCreate={(createdEvent: EventTypes) => {
              setdisplayEventForm(false);
              setEvents([...events, createdEvent]);
            }}
            status="create"
          />
        </Modal>
      </Grid>
    </div>
  );
};

export default App;
