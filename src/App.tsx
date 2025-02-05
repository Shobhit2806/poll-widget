import React, { useEffect } from "react";
import { Poll } from "./types/types";
import { fetchPoll, submitVote } from "./db/api";
import PollWidget from "./components/PollWidget";

function App() {
  const [pollData, setPollData] = React.useState<Poll | null>();
  useEffect(() => {
    const loadPoll = async () => {
      try {
        const poll = await fetchPoll(1);
        setPollData(poll);
      } catch (err) {
        console.error(err);
      }
    };
    loadPoll();
  }, []);
  if (!pollData) return <> Loading...</>;
  return (
    <div className=" h-screen flex justify-center items-center">
      <PollWidget
        pollId={pollData.id}
        title={pollData.question}
        options={pollData.options}
        onVote={submitVote}
        // onVoteRemove={() => {}}
        styles={{}}
        // isMultipleChoice={false}
      />
    </div>
  );
}

export default App;
