import { useState } from "react";
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ rating, total }) => (
  <p>
    {rating}: {total}
  </p>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <h3>Your response is very much appreciated</h3>
      <Button onClick={() => setGood(good + 1)} text={"Good"} />
      <Button onClick={() => setNeutral(neutral + 1)} text={"Neutral"} />
      <Button onClick={() => setBad(bad + 1)} text={"Bad"} />

      <h1> Statistics </h1>
      <Statistics rating={"good"} total={good} />
      <Statistics rating={"neutral"} total={neutral} />
      <Statistics rating={"bad"} total={bad} />
    </div>
  );
};

export default App;
