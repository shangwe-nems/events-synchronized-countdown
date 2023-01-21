export type StageTypes = {
  id: string;
  duration: number;
  name: string;
  startMessage: string;
  endMessage: string;
};

export type EventTypes = {
  id: string;
  title: React.ReactNode;
  image: string;
  start_time: string;
  end_time: string;
  stages: StageTypes[];
  action: {
    label: string;
  };
};

export type CountDownTypes = {
  hours: number;
  minutes: number;
  seconds: number;
};
