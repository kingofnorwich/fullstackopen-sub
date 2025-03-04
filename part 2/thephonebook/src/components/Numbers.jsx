const Numbers = ({ name, number, handleDelete, id }) => {
  return (
    <li>
      Name: {name}, Number: {number}{" "}
      <button onClick={() => handleDelete(id)}>Delete</button>
    </li>
  );
};
export default Numbers;
