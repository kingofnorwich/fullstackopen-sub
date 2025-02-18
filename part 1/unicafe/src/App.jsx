import { useState } from "react";
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ good, neutral, bad, allClicks, average, popularity }) => {
  if (allClicks === 0) {
    return (
      <div>
        <i>Start providing feedback to see the results</i>
      </div>
    );
  }
  return (
    <>
      <h2>Statistics table</h2>
      <table>
        <tbody>
          <tr>
            <th>Rating</th>
            <th>Score</th>
          </tr>
          <StatisticsLine rating={good} text={"Good"} />
          <StatisticsLine rating={neutral} text={"Neutral"} />
          <StatisticsLine rating={bad} text={"Bad"} />

          <StatisticsLine rating={average} text={"Average Score"} />
          <StatisticsLine rating={popularity} text={"Popularity"} />
        </tbody>
      </table>
      <i>
        Average and Popularity use the scoring of: Good =1, Neutral = 0, Bad =
        -1
      </i>
    </>
  );
};
const StatisticsLine = ({ rating, text }) => (
  <tr>
    <td>{text}</td>
    <td>{rating}</td>
  </tr>
);

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
