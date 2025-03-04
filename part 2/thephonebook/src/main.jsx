import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(<App />);
export const PersonForm = ({
  addName,
  newName,
  handleNameChange,
  newNum,
  handleNumChange,
  handleSearch,
}) => {
  return (
    <>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <>
          number: <input value={newNum} onChange={handleNumChange} />
        </>
        <div>
          <button type="submit" onClick={handleSearch}>
            add
          </button>
        </div>
      </form>
    </>
  );
};
