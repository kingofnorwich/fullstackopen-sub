import { useState } from "react";

const DisplayVotes = ({ votes, maxVotes, selected, anecdotes }) => {
  if (votes[maxVotes] === 0) {
    return <>Vote to see the statistics</>;
  }
  return (
    <>
      <p>This anecdote has {votes[selected]} votes</p>
      <p>
        The most voted anecdote is <i>{anecdotes[maxVotes]} </i> with{" "}
        {votes[maxVotes]} votes
      </p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [selected, setSelected] = useState(0);

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };
  const zeroVotes = new Array(anecdotes.length).fill(0);
  const [votes, setVotes] = useState(zeroVotes);
  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const maxVotes = votes.reduce(
    (maxIdx, num, idx, arr) => (num > arr[maxIdx] ? idx : maxIdx),
    0
  );

  return (
    <div>
      {anecdotes[selected]}
      <p>
        <button onClick={nextAnecdote}> Next anecdote</button>;
        <button onClick={handleVote}>Vote for this anecdote</button>
      </p>
      <DisplayVotes
        votes={votes}
        maxVotes={maxVotes}
        selected={selected}
        anecdotes={anecdotes}
      />
    </div>
  );
};

export default App;
