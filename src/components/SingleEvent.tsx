import {
  Button,
  Card,
  CardProps,
  Modal,
  Overlay,
  Text,
  createStyles,
} from "@mantine/core";
import React, { useState } from "react";
import EventForm from "./EventForm";

type StageProps = {
  duration: number;
  title: string;
  startMessage: string;
  endMessage: string;
};

type EventProps = {
  title: React.ReactNode;
  image: string;
  start_time: Date;
  end_time: Date;
  stages: StageProps[];
  action: {
    label: string;
  };
};

const useStyles = createStyles((theme) => ({
  card: {
    height: 150,
    width: 400,
    margin: 14,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  content: {
    position: "absolute",
    padding: theme.spacing.xl,
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

const SingleEvent = ({ ...eventData }: EventProps) => {
  const { classes, cx, theme } = useStyles();
  const [displayEventForm, setdisplayEventForm] = useState<boolean>(false);

  return (
    <Card
      radius="md"
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
          Debut du culte :{" "}
          <strong>{new Date(eventData.start_time).toLocaleString()}</strong>
        </Text>
        <Text size="xs" className={classes.description}>
          Fin du culte :{" "}
          <b>{new Date(eventData.start_time).toLocaleString()}</b>
        </Text>

        <Button
          className={classes.action}
          variant="white"
          color="dark"
          component="a"
          size="xs"
          onClick={() => setdisplayEventForm(true)}
        >
          {eventData.action.label}
        </Button>
      </div>
      <Modal
        opened={displayEventForm}
        onClose={() => setdisplayEventForm(false)}
        title="New Event"
      >
        <EventForm />
      </Modal>
    </Card>
  );
};

export default SingleEvent;
