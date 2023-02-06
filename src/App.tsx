import {
  ActionIcon,
  Button,
  Card,
  Container,
  Divider,
  Drawer,
  Flex,
  Grid,
  Modal,
  Text,
  Title,
  createStyles,
  useMantineTheme,
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
import ConfigureEventDisplay from "./components/ConfigureEventDisplay";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import StageCountDown from "./components/StageCountDown";
import StageSwitcher from "./components/StageSwitcher";
import StagesList from "./components/StagesList";
import { CountDownTypes, EventTypes, StageTypes } from "./types";

type DataArrayStage = {
  data: StageTypes[];
};

const defaultEvent = {
  id: "",
  title: "",
  image: "",
  start_time: "",
  end_time: "",
  stages: [],
  action: {
    label: "",
  },
};

const App: React.FunctionComponent = () => {
  const [data, setdata] = useState<DataArrayStage>({ data: [] });
  const [events, setEvents] = useState<EventTypes[]>([]);
  const [eventData, setEventData] = useState<EventTypes>(defaultEvent);
  const [currentStage, setcurrentStage] = useState<StageTypes | null>(null);
  const [switching, setswitching] = useState(false);

  const [currentCount, setcurrentCount] = useState<number>(0);
  const [currentCounter, setcurrentCounter] = useState<CountDownTypes>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [displayEventDetails, setdisplayEventDetails] =
    useState<boolean>(false);

  const drawerTheme = useMantineTheme();

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

  return switching ? (
    <StageSwitcher
      handleStart={() => {
        setswitching(false);
        handleNextStage();
      }}
    />
  ) : (
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
          <EventList
            allEvents={events}
            handlePlay={(currentEvent: EventTypes) => {
              setEventData(currentEvent);
            }}
            handleSelect={async (currentEvent: EventTypes) => {
              await setEventData(currentEvent);
              await setdisplayEventDetails(true);
            }}
          />
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
          padding={"sm"}
          onClose={() => setdisplayEventForm(false)}
          title={
            <Text color="blue" size="md" weight={600}>
              <BsCalendar2PlusFill
                size={18}
                style={{ marginBottom: -2, marginRight: 8 }}
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
            currentEventData={{
              id: "",
              title: undefined,
              image: "",
              start_time: "",
              end_time: "",
              stages: [],
              action: {
                label: "",
              },
            }}
          />
        </Modal>
        <Drawer
          overlayColor={
            drawerTheme.colorScheme === "dark"
              ? drawerTheme.colors.dark[9]
              : drawerTheme.colors.gray[2]
          }
          overlayOpacity={0.55}
          overlayBlur={3}
          position="left"
          size="lg"
          padding="sm"
          opened={displayEventDetails}
          onClose={() => setdisplayEventDetails(false)}
          title={
            <Text color="blue" size="sm" weight={600}>
              <BsGearFill
                size={18}
                style={{ marginBottom: -2, marginRight: 8 }}
              />{" "}
              Configure the current event.
            </Text>
          }
        >
          <ConfigureEventDisplay
            {...eventData}
            handleConfig={(selected: EventTypes) => {
              setdisplayEventForm(false);
              console.log("Saved changes: ", selected);
            }}
          />
        </Drawer>
      </Grid>
    </div>
  );
};

export default App;
