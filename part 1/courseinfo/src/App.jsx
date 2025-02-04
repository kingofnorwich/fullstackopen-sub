const Header = (props) => {
  console.log(props);
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Content = (props) => {
  const numex = "Number of Exercises: ";
  return (
    <div>
      <p>
        Objectives: {props.part[0].name} - {numex} {props.part[0].exercises}
      </p>
      <p>
        Objectives: {props.part[1].name} - {numex} {props.part[1].exercises}
      </p>
      <p>
        Objectives: {props.part[2].name} - {numex} {props.part[2].exercises}
      </p>
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>
        Total Number of Exercises:
        {props.part[0].exercises +
          props.part[1].exercises +
          props.part[2].exercises}
      </p>
    </div>
  );
};
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content part={course.parts} />
      <Total part={course.parts} />
    </div>
  );
};

export default App;
