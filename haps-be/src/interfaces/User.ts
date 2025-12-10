export type Player = {
  id: string;
  username: string;
  snaps: Snaps | null;
  ready: boolean;
  ws: any;
};

export type PlayerPublic = {
  id: string;
  username: string;
  snaps: Snaps | null;
  ready: boolean;
};

export type Snaps = {
  id: string;
  owner: string;
  name: string;
};
