export interface PollOption {
  id: string;
  text: string;
  voteCount: number;
}

export interface Poll {
  id: number;
  question: string;
  totalCount: number;
  options: PollOption[];
}
