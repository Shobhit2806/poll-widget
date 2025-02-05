import { useState } from "react";
import { removeVote, submitVote } from "../db/api";
import { PollProps } from "../types/PollProps";
import { PollOption } from "../types/types";

const PollWidget = ({
  pollId,
  title,
  options,
  isMultipleChoice = false,
  onVote,
  // onVoteRemove,
  styles,
}: PollProps) => {
  const [currentOptions, setCurrentOptions] = useState<PollOption[]>(options);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const totalVotes = options.reduce((acc, option) => acc + option.voteCount, 0);

  const handleSubmitVote = async (optionId: string) => {
    let newSelectedOptions: string[];
    if (isMultipleChoice) {
      //
    } else {
      if (selectedOptions.length > 0 && selectedOptions[0] !== optionId) {
        const updatedOptions = await removeVote(pollId, selectedOptions);
        setCurrentOptions(updatedOptions);
      }
      newSelectedOptions = [optionId];
      const updatedOptions = await submitVote(pollId, newSelectedOptions);
      setCurrentOptions(updatedOptions);
    }
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <fieldset className="p-4 border border-gray-300 rounded-lg">
      <div
        id={`poll-${pollId}-title`}
        className="text-lg font-semibold "
        // style={styles.title}
      >
        {title}
      </div>
      <div className="p-1">
        {currentOptions.map((option) => {
          const votePercentage =
            totalVotes > 0 ? (option.voteCount / totalVotes) * 100 : 0;
          return (
            <div
              className="p-2 px-4 flex flex-col justify-between  "
              key={option.id}
            >
              <div className="flex gap-4 justify-between">
                <label>
                  <input
                    type={isMultipleChoice ? "checkbox" : "radio"}
                    name={`poll-${pollId}`}
                    value={option.id}
                    onChange={() => handleSubmitVote(option.id)}
                  />
                  {option.text}
                </label>
                {option.voteCount > 0 ? (
                  <div className="text-xl">{votePercentage.toFixed(1)}%</div>
                ) : null}
              </div>

              <div
                className="w-full rounded-full h-2"
                style={styles?.progressBar}
              >
                <div
                  className="bg-blue-500 h-full rounded-full transform origin-left"
                  style={{
                    ...styles?.progressBarFill,
                    transform: `scaleX(${votePercentage / 100})`,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      {/* <button className="bg-red-500 px-3 py-1 text-white rounded cursor-pointer">
        Remove
      </button> */}
    </fieldset>
  );
};

export default PollWidget;
