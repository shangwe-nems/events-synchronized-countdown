import {
  Box,
  Button,
  Grid,
  Group,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { nanoid } from "nanoid";
import React from "react";

import { BsClockHistory } from "react-icons/bs";
import { StageTypes } from "../types";

type StageFormProps = {
  handleClose: (data: StageTypes) => void;
};

const StageForm = ({ handleClose }: StageFormProps) => {
  const form = useForm({
    initialValues: {
      duration: 0,
      name: "",
      startMessage: "",
      endMessage: "",
    },
  });

  function handleSubmit(values: Omit<StageTypes, "id">) {
    const id = nanoid();
    const newEvent = { ...values, id };
    handleClose(newEvent);
  }

  return (
    <Box mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col span={12}>
            <TextInput
              label="Stage Title"
              description="The name of the current activity will help identify the state of the event."
              placeholder="for ex: Introduction"
              {...form.getInputProps("name")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <NumberInput
              label="Duration of the stage"
              description="The duration of the current stage should be determined in minutes."
              placeholder="for ex: Introduction"
              icon={<BsClockHistory />}
              {...form.getInputProps("duration")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              description="Start message : "
              placeholder="for ex: Stage loading..."
              {...form.getInputProps("startMessage")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              description="End message : "
              placeholder="for ex: Your time is up!"
              {...form.getInputProps("endMessage")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Group position="right" mt="md">
              <Button compact type="submit">
                Save stage
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </form>
    </Box>
  );
};

export default StageForm;
