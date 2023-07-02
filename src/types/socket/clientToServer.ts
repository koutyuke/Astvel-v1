export type ClientToServerEvents = {
  message: (message: string) => void;
  join: (id: string) => void;
};
