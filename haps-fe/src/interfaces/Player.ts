export interface Player {
  id: string;
  username: string;
  snaps: Snaps | null;
  ready: boolean;
}

export interface Snaps {
  id: string;
  owner: string;
  owner_name: string;
  name: string;
}
