import Numbers from "./Numbers";
const Names = ({ filteredNames, handleDelete }) => {
  return (
    <ul>
      {filteredNames.map((person) => (
        <Numbers
          key={person.id}
          name={person.name}
          number={person.number}
          id={person.id}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default Names;
