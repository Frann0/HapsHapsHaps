export type Player = {
  id: string;
  username: string;
  snaps: string;
  ready: boolean;
  ws: any;
};

export type PlayerPublic = {
  id: string;
  username: string;
  snaps: string;
  ready: boolean;
};
