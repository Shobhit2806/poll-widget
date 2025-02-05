import { Poll, PollOption } from "../types/types";

export const fetchPoll = async (pollId: number): Promise<Poll> => {
  try {
    const response = await fetch(`http://localhost:3000/polls/${pollId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const json: Poll = await response.json();
    return json;
  } catch (err) {
    throw new Error(`Failed to fetch poll: ${err.message}`);
  }
};

export const submitVote = async (
  pollId: number,
  selectedOptions: PollOption[]
): Promise<PollOption[]> => {
  const poll = await fetchPoll(pollId);
  const updatedOptions = poll.options.map((option) => {
    if (selectedOptions.includes(option.id)) {
      return {
        ...option,
        voteCount: option.voteCount + 1,
      };
    }
    return option;
  });
  const totalCount = updatedOptions.reduce(
    (acc, option) => acc + option.voteCount,
    0
  );

  await fetch(`http://localhost:3000/polls/${pollId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: poll.question,
      id: poll.id,
      options: updatedOptions,
      totalCount: totalCount,
    }),
  });

  return updatedOptions;
};

export const removeVote = async (
  pollId: number,
  selectedOptions: PollOption[]
): Promise<PollOption> => {
  const poll = await fetchPoll(pollId);
  const updatedOptions = poll.options.map((option) => {
    if (selectedOptions.includes(option.id)) {
      return {
        ...option,
        voteCount: option.voteCount - 1,
      };
    }
    return option;
  });
  const totalCount = updatedOptions.reduce(
    (acc, option) => acc + option.voteCount,
    0
  );

  await fetch(`http://localhost:3000/polls/${pollId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: poll.question,
      id: poll.id,
      options: updatedOptions,
      totalCount: totalCount,
    }),
  });

  return updatedOptions;
};
