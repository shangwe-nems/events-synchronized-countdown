import {
  ActionIcon,
  Button,
  Card,
  CardProps,
  Drawer,
  Modal,
  Overlay,
  Text,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import {
  BsCalendar,
  BsGear,
  BsGearFill,
  BsPlay,
  BsPlayBtn,
  BsSkipStart,
} from "react-icons/bs";
import { EventTypes } from "../types";
import ConfigureEventDisplay from "./ConfigureEventDisplay";
import EventForm from "./EventForm";

const useStyles = createStyles((theme) => ({
  card: {
    height: 140,
    width: 420,
    margin: 14,
    backgroundSize: "cover",
    backgroundPosition: "center",
    // background: "linear-gradient(225deg, #d0cdcd, #f7f4f4)",
    boxShadow: "-20px 20px 60px #c4c2c2, 20px -20px 60px #ffffff",
  },

  content: {
    position: "absolute",
    padding: "18px 24px",
    zIndex: 1,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },

  action: {
    position: "absolute",
    bottom: theme.spacing.xl,
    right: theme.spacing.xl,
    display: "inline-flex",
  },

  title: {
    color: theme.white,
    marginBottom: theme.spacing.xs / 2,
  },

  description: {
    color: theme.white,
    maxWidth: 220,
  },
}));

type SingleEventProps = EventTypes & {
  handleSelect: () => void;
  handlePlay: () => void;
};

const SingleEvent = ({
  handleSelect,
  handlePlay,
  ...eventData
}: SingleEventProps) => {
  const { classes, cx, theme } = useStyles();
  // const drawerTheme = useMantineTheme();
  // const [displayEventForm, setdisplayEventForm] = useState<boolean>(false);

  return (
    <Card
      radius="lg"
      style={{ backgroundImage: `url(${eventData.image})` }}
      className={cx(classes.card)}
    >
      <Overlay
        gradient={`linear-gradient(105deg, ${theme.black} 20%, #312f2f 50%, ${theme.colors.gray[4]} 100%)`}
        opacity={0.55}
        zIndex={0}
      />

      <div className={classes.content}>
        <Text size="md" weight={700} className={classes.title}>
          {eventData.title}
        </Text>

        <Text size="xs" className={classes.description} italic>
          {eventData.stages.length} stages for the current event.
        </Text>
        <Text size="xs" className={classes.description} mt={14}>
          Debut :{" "}
          <strong>{new Date(eventData.start_time).toLocaleString()}</strong>
        </Text>
        <Text size="xs" className={classes.description}>
          Cloture : <b>{new Date(eventData.end_time).toLocaleString()}</b>
        </Text>

        <div className={classes.action}>
          <ActionIcon
            variant="light"
            color="dark"
            style={{ marginRight: 8, backgroundColor: "white" }}
            onClick={() => handlePlay()}
          >
            <BsPlay />
          </ActionIcon>
          <ActionIcon
            variant="light"
            color="dark"
            style={{ backgroundColor: "white" }}
            onClick={() => handleSelect()}
          >
            <BsGear />
          </ActionIcon>
        </div>
      </div>
      {/* <Drawer
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
        opened={displayEventForm}
        onClose={() => setdisplayEventForm(false)}
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
          handleConfig={(data: EventTypes) => {
            setdisplayEventForm(false);
            console.log("From single Event: ", data);
          }}
        />
      </Drawer> */}
    </Card>
  );
};

export default SingleEvent;
