import { useState } from "react";
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ good, neutral, bad, allClicks, average, popularity }) => {
  if (allClicks === 0) {
    return <div>Please provide feedback to see the results</div>;
  }
  return (
    <>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <h2>In depth statistics</h2>
      <p> Good = 1, Neutral = 0, Bad = -1</p>
      <p>Total reviews: {allClicks}</p>
      <p>Average Score: {average}</p>
      <p>Popularity: {popularity}</p>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAllClicks] = useState(0);

  const handleGoodClick = () => {
    const newGood = good + 1;
    setGood(newGood);
    setAllClicks(newGood + neutral + bad);
  };
  const handleNeutralClick = () => {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
    setAllClicks(good + newNeutral + bad);
  };
  const handleBadClick = () => {
    const newBad = bad + 1;
    setBad(newBad);
    setAllClicks(good + neutral + newBad);
  };

  const popularity = (good, allClicks) => {
    return ((good / allClicks) * 100).toFixed(0) + "%";
  };
  const average = ((good + neutral * 0 + bad * -1) / allClicks).toFixed(1);

  return (
    <div>
      <h1>Give Feedback</h1>
      <h3>Your response is very much appreciated</h3>
      <Button onClick={handleGoodClick} text={"Good"} />
      <Button onClick={handleNeutralClick} text={"Neutral"} />
      <Button onClick={handleBadClick} text={"Bad"} />
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        allClicks={allClicks}
        average={average}
        popularity={popularity(good, allClicks)}
      />
    </div>
  );
};

export default App;
