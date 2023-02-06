import {
  Button,
  Divider,
  Flex,
  Grid,
  Modal,
  Text,
  createStyles,
} from "@mantine/core";
import { useListState } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  BsCalendar2Date,
  BsCalendar2Event,
  BsCheck2Circle,
} from "react-icons/bs";
import { StageTypes } from "../types";
import StageForm from "./StageForm";

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.xs}px ${theme.spacing.xs}px`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.xs,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: 30,
    fontWeight: 400,
    width: 52,
    textAlign: "left",
  },
}));

type StageProps = {
  data: StageTypes[];
  currentIndex: number;
  handleReorder: (data: StageTypes[]) => void;
};

const StagesList = ({ data, currentIndex, handleReorder }: StageProps) => {
  const { classes, cx } = useStyles();
  const [state, handlers] = useListState<StageTypes>(data);

  const items = state.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.id}>
      {(provided, snapshot) => (
        <>
          <div
            className={cx(classes.item, {
              [classes.itemDragging]: snapshot.isDragging,
            })}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {currentIndex >= index ? (
              <BsCheck2Circle
                className={classes.symbol}
                color={currentIndex >= index ? "dodgerblue" : "#a6a6a6"}
              />
            ) : (
              <BsCalendar2Date
                className={classes.symbol}
                color={currentIndex >= index ? "dodger" : "#a6a6a6"}
              />
            )}
            <div>
              <Text
                weight={600}
                size="sm"
                color={currentIndex >= index ? "blue" : "dimmed"}
              >
                {item.name}
              </Text>
              <Text color="dimmed" size="xs">
                {item.duration} minutes
              </Text>
            </div>
          </div>
        </>
      )}
    </Draggable>
  ));

  useEffect(() => {
    handleReorder(state);
  }, [state]);

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
        handlers.reorder({
          from: source.index,
          to: destination?.index || 0,
        })
      }
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default StagesList;
