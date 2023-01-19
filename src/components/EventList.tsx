import { Container, Flex, Modal } from "@mantine/core";
import React, { useState } from "react";
import EventForm from "./EventForm";
import SingleEvent from "./SingleEvent";

type StageProps = {
  duration: number;
  title: string;
  startMessage: string;
  endMessage: string;
};

type EventProps = {
  _id: string;
  title: React.ReactNode;
  image: string;
  start_time: Date;
  end_time: Date;
  stages: StageProps[];
  action: {
    label: string;
  };
};

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

const EventList = () => {
  const [events, setEvents] = useState<EventProps[]>(data);

  return (
    <>
      <Flex direction="row" align="center" wrap="wrap" justify="center">
        {events.map((event) => (
          <div key={event._id}>
            <SingleEvent {...event} />
          </div>
        ))}
      </Flex>
    </>
  );
};

export default EventList;
