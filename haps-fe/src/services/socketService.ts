export const createSocket = () => {
  const socket = new WebSocket("ws://192.168.1.44:3000/ws");
  return socket;
};
