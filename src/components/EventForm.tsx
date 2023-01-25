import { Box, Button, Divider, Grid, Group, TextInput } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { nanoid } from "nanoid";
import React from "react";
import { BsClockHistory } from "react-icons/bs";
import { EventTypes } from "../types";

type FormTypes = {
  title: React.ReactNode | string;
  start_time: Date | string;
  end_time: Date | string;
};

type EventFormProps = {
  handleCreate: (data: EventTypes) => void;
  status: string;
  currentEventData: EventTypes;
};

const eventBGI = [
  "https://images.unsplash.com/photo-1481142889578-dda440dacfe1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1481141973768-673903376812?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
];

const EventForm = ({ handleCreate, status, ...eventData }: EventFormProps) => {
  const form = useForm({
    initialValues: {
      title: status == "create" ? "" : eventData.currentEventData.title,
      start_time:
        status == "create"
          ? ""
          : new Date(eventData.currentEventData.start_time),
      end_time:
        status == "create" ? "" : new Date(eventData.currentEventData.end_time),
    },
  });

  function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function handleSubmit(values: FormTypes) {
    const id = nanoid();
    const newEvent = {
      title: values.title,
      start_time: new Date(values.start_time).toISOString(),
      end_time: new Date(values.end_time).toString(),
      id,
      stages: [],
      image: eventBGI[randomInteger(0, 3)],
      action: { label: "Configurer" },
    };
    handleCreate(newEvent);
  }

  return (
    <Box>
      <Divider mt={-14} mb={8} />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col span={12}>
            <TextInput
              size="xs"
              label="Event Title"
              description="The event needs to be identified through a specific name."
              placeholder="for ex: 1rst Service"
              {...form.getInputProps("title")}
            />
          </Grid.Col>
          <Grid.Col span={6} mt={-12}>
            <TimeInput
              size="xs"
              label="Durée de l'évenement"
              description="Start time : "
              icon={<BsClockHistory />}
              {...form.getInputProps("start_time")}
            />
          </Grid.Col>
          <Grid.Col span={6} pt={21}>
            <TimeInput
              size="xs"
              description="End time :"
              icon={<BsClockHistory />}
              {...form.getInputProps("end_time")}
            />
          </Grid.Col>
          <Grid.Col span={12} mt={-12}>
            <Group position="right" mt="xs">
              <Button compact type="submit" size="xs">
                Update Data
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </form>
    </Box>
  );
};

export default EventForm;
