const Filter = ({ searchedName, handleSearch }) => {
  return (
    <>
      <form>
        <input value={searchedName} onChange={handleSearch} />
      </form>
    </>
  );
};
export default Filter;
