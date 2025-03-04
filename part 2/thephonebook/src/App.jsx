import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";
import Numbers from "./components/Numbers";
import Names from "./components/Names";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [searchedName, setSearchedName] = useState("");
  const [filteredNames, setFilteredNames] = useState(persons);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialResponse) => {
      setPersons(initialResponse);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchedName(searchValue);

    if (searchValue === "") {
      setFilteredNames(persons);
    } else {
      setFilteredNames(
        persons.filter((person) =>
          person.name.toLowerCase().includes(searchValue)
        )
      );
    }
  };
  useEffect(() => {
    setFilteredNames(persons);
  }, [persons]);

  const addName = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(
      (person) => person.name === newName && person.number !== newNum
    );
    const samePerson = persons.find(
      (person) => person.name === newName || person.number === newNum
    );

    if (existingPerson) {
      if (
        window.confirm(
          `The name ${existingPerson.name} already exists, would you like to update the number?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNum };
        setSuccessMessage(
          `"${updatedPerson.name}" has been updated successfully`
        );
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);

        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? returnedPerson : person
              )
            );
          });
      }
    } else if (samePerson) {
      setErrorMessage(`This name already exists`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } else if (newNum === "" || newName === "") {
      setErrorMessage(`Please ensure both fields are entered `);
    } else {
      const nameObject = {
        name: newName,
        number: newNum,
      };

      personService.create(nameObject).then((returnedName) => {
        setPersons(persons.concat(returnedName));
      });
      setSuccessMessage(`"${newName}" has been added successfully`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    }
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id); // Get the person's name before deleting

    if (
      window.confirm(
        `Are you sure you want to delete ${person?.name}'s name and number permanently?`
      )
    ) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          setSuccessMessage(`"${person?.name}" was successfully deleted.`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(
            `"${person?.name}" has already been removed from the server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const cheese = "cheese";

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      <Filter searchedName={searchedName} handleSearch={handleSearch} />
      <PersonForm
        addName={addName}
        newNum={newNum}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumChange={handleNumChange}
        handleSearch={handleSearch}
      />

      <h2>Numbers</h2>
      <Names filteredNames={filteredNames} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
