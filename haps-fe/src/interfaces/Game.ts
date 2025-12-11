export interface Results {
  snapsId: string;
  name: string;
  owner: string;
  owner_name: string;
  total: number;
}

export interface VotingStatus {
  id: string;
  username: string;
  hasVoted: boolean;
}
