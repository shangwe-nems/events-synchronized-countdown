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
import { BsCalendar } from "react-icons/bs";
import { EventTypes } from "../types";
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

const SingleEvent = ({ ...eventData }: EventTypes) => {
  const { classes, cx, theme } = useStyles();
  const [displayEventForm, setdisplayEventForm] = useState<boolean>(false);

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
        title={
          <Text color="blue" size="md" weight={600}>
            <BsCalendar
              size={24}
              style={{ marginBottom: -4, marginRight: 8 }}
            />{" "}
            Configure the current event.
          </Text>
        }
      >
        <EventForm
          status="update"
          handleCreate={(createdEvent: EventTypes) => {
            setdisplayEventForm(false);
            // Here we should query and update by ID
            // setEvents([...events, createdEvent]);
          }}
        />
      </Modal>
    </Card>
  );
};

export default SingleEvent;
