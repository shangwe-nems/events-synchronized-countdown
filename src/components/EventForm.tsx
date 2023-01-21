import { Box, Button, Grid, Group, TextInput } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { nanoid } from "nanoid";
import React from "react";
import { BsClockHistory } from "react-icons/bs";
import { EventTypes } from "../types";

type FormTypes = {
  title: string;
  start_time: string;
  end_time: string;
};

type EventFormProps = {
  handleCreate: (data: EventTypes) => void;
  status: string;
};

const EventForm = ({ handleCreate, status }: EventFormProps) => {
  const form = useForm({
    initialValues: {
      title: "",
      start_time: "",
      end_time: "",
    },
  });

  function handleSubmit(values: FormTypes) {
    const id = nanoid();
    const newEvent = {
      title: values.title,
      start_time: values.start_time.toString(),
      end_time: values.end_time.toString(),
      id,
      stages: [],
      image: "",
      action: { label: "Configurer" },
    };
    console.log(newEvent);
    handleCreate(newEvent);
  }

  return (
    <Box mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col span={12}>
            <TextInput
              label="Event Title"
              description="The event needs to be identified through a specific name."
              placeholder="for ex: 1rst Service"
              {...form.getInputProps("title")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TimeInput
              label="Durée de l'évenement"
              description="Start time : "
              icon={<BsClockHistory />}
              {...form.getInputProps("start_time")}
            />
          </Grid.Col>
          <Grid.Col span={6} pt={32}>
            <TimeInput
              description="End time :"
              icon={<BsClockHistory />}
              {...form.getInputProps("end_time")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Group position="right" mt="md">
              <Button compact type="submit">
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
