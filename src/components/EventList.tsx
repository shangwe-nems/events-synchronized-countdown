import { Container, Flex, Modal, Text } from "@mantine/core";
import React, { useState } from "react";
import { BsCalendar2PlusFill } from "react-icons/bs";
import { EventTypes } from "../types";
import EventForm from "./EventForm";
import SingleEvent from "./SingleEvent";

const data = [
  {
    _id: "1",
    image:
      "https://images.unsplash.com/photo-1481142889578-dda440dacfe1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    title: "1st Service",
    start_time: new Date(),
    end_time: new Date(),
    stages: [],
    action: {
      label: "Configurer",
    },
  },
  {
    _id: "2",
    image:
      "https://images.unsplash.com/photo-1481141973768-673903376812?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    title: "2nd Service",
    start_time: new Date(),
    end_time: new Date(),
    stages: [],
    action: {
      label: "Configurer",
    },
  },
  {
    _id: "3",
    image:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    title: "3rd Service",
    start_time: new Date(),
    end_time: new Date(),
    stages: [],
    action: {
      label: "Configurer",
    },
  },
  {
    _id: "4",
    image:
      "https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    title: "4th Service",
    start_time: new Date(),
    end_time: new Date(),
    stages: [],
    action: {
      label: "Configurer",
    },
  },
];

type ListProps = {
  allEvents: EventTypes[];
  handlePlay: (currentEvent: EventTypes) => void;
  handleSelect: (currentEvent: EventTypes) => void;
};

const EventList = ({ allEvents, handlePlay, handleSelect }: ListProps) => {
  // const [events, setEvents] = useState<EventTypes[]>(allEvents);
  // const [displayEventForm, setdisplayEventForm] = useState<boolean>(false);
  const handleSelectEvent = (event: EventTypes) => {
    console.log("Selected:", event);
    handleSelect(event);
  };

  const handlePlayEvent = (event: EventTypes) => {
    console.log("Played:", event);
    handlePlay(event);
  };

  return (
    <>
      <Flex direction="row" align="center" wrap="wrap" justify="space-evenly">
        {allEvents.map((event) => (
          <div key={event.id}>
            <SingleEvent
              {...event}
              handleSelect={() => {
                handleSelectEvent(event);
              }}
              handlePlay={() => {
                handlePlayEvent(event);
              }}
            />
          </div>
        ))}
      </Flex>
      {/* <Modal
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
        <EventForm />
      </Modal> */}
    </>
  );
};

export default EventList;
