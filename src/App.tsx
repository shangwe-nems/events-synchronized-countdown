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

const data = {
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
      duration: 2,
      symbol: "I",
      name: "Intercession",
      startMessage: "About to start",
      endMessage: "Process is ending",
    },
    {
      id: "003",
      duration: 59,
      symbol: "P",
      name: "Prédication",
      startMessage: "About to start",
      endMessage: "Process is ending",
    },
    {
      id: "004",
      duration: 15,
      symbol: "Co",
      name: "Communiqués",
      startMessage: "About to start",
      endMessage: "Process is ending",
    },
    {
      id: "005",
      duration: 3,
      symbol: "Cl",
      name: "Cloture",
      startMessage: "About to start",
      endMessage: "Process is ending",
    },
  ],
};

type StageProps = {
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

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: 30,
    fontWeight: 700,
    width: 60,
  },
}));

const App: React.FunctionComponent = () => {
  const [currentStage, setcurrentStage] = useState<StageProps | null>(null);
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
              <StagesList {...data} />
            </Card>
          </Grid.Col>
          <Grid.Col span={9} key={currentStage?.id}>
            <Card>
              <Text size="xl">{currentStage?.name}</Text>
              <StageCountDown
                {...currentCounter}
                handleNext={() => handleNextStage()}
              />
              <Text>Upcoming : intercession</Text>
            </Card>
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  );
};

export default App;
