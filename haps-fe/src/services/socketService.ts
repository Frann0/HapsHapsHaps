export const createSocket = () => {
  const socket = new WebSocket(import.meta.env.VITE_WS_ADDRESS);
  return socket;
};
