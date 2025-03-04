const Header = (props) => <h2>{props.course}</h2>;

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);
const Course = ({ course }) => (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
);

const Total = ({ parts }) => {
  return (
    <>
      <b>
        {" "}
        Total number of exercises:{" "}
        {parts.reduce((sum, part) => sum + part.exercises, 0)}
      </b>
    </>
  );
};

export default Course;
