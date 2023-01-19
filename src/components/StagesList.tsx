import { Button, Divider, Flex, Grid, Text, createStyles } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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

  active: {
    backgroundColor: theme.colors.blue[7],
    color: theme.colors.yellow[3],
  },

  symbol: {
    fontSize: 30,
    fontWeight: 400,
    width: 60,
    textAlign: "left",
  },
}));

type StageProps = {
  data: {
    duration: number;
    symbol: string;
    name: string;
  }[];
};

const StagesList = ({ data }: StageProps) => {
  const { classes, cx } = useStyles();
  const [state, handlers] = useListState(data);

  // const [displayStageForm, setdisplayStageForm] = useState<boolean>(false);

  const items = state.map((item, index) => (
    <Draggable key={item.symbol} index={index} draggableId={item.symbol}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Text className={classes.symbol}>{item.symbol}</Text>
          <div>
            <Text weight={600}>{item.name}</Text>
            <Text color="dimmed" size="sm">
              {item.duration} minutes
            </Text>
          </div>
        </div>
      )}
    </Draggable>
  ));

  return (
    <Grid>
      <Grid.Col span={12}>
        <Flex direction="row" justify="space-between" align="center">
          <Text size="sm">Stages of the event</Text>
          <Button size="xs">New Stage</Button>
        </Flex>
      </Grid.Col>
      <Grid.Col span={12}>
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
      </Grid.Col>
    </Grid>
  );
};

export default StagesList;
