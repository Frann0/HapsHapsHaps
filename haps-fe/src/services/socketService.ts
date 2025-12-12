export function getClientId() {
  let id = localStorage.getItem("clientId");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("clientId", id);
  }

  return id;
}

export const createSocket = () => {
  const clientId = getClientId();
  const socket = new WebSocket(
    `${import.meta.env.VITE_WS_ADDRESS}?clientId=${clientId}`,
  );
  return socket;
};
