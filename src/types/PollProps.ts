import { CSSProperties } from "react";
import { PollOption } from "./types";

export interface PollStyles {
  container?: CSSProperties;
  title?: CSSProperties;
  optionsContainer?: CSSProperties;
  optionLabel?: CSSProperties;
  optionInput?: CSSProperties;
  optionVotes?: CSSProperties;
  progressBar?: CSSProperties;
  progressBarFill?: CSSProperties;
  removeButton?: CSSProperties;
}

export interface PollProps {
  pollId: number;
  title: string;
  options: PollOption[];
  isMultipleChoice: boolean;
  onVote: (
    pollId: number,
    selectedOptions: PollOption[]
  ) => Promise<PollOption[]>;
  onVoteRemove: (
    pollId: number,
    selectedOptions: PollOption[]
  ) => Promise<PollOption[]>;
  styles?: PollStyles;
}
