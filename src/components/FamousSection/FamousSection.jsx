import React, { useState, useEffect } from 'react';
import './FamousSection.css';
import axios from 'axios';

function FamousSection() {
  let [famousPersonName, setPersonName] = useState('');
  let [famousPersonRole, setPersonRole] = useState('');
  let [personInput, setPersonInput] = useState('');
  let [roleInput, setRoleInput] = useState('');
  let [famousPeopleArray, setPeopleArray] = useState([]);

  // TODO: on load, call the fetchPeople() function

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = () => {
    // TODO: fetch the list of people from the server
    axios({
      method: 'GET',
      url: '/people'
    })
      .then((response) => {
        // When the data comes back, could you then please
        // stash it in a piece of React state?
        const peopleData = response.data;
        setPeopleArray(peopleData);
      })
      .catch((error) => {
        console.log('App.jsx useEffect fail:', error);
      })
  }

  const addPerson = (evt) => {
    evt.preventDefault();
    console.log(`The person is ${famousPersonName} and they're famous for ${famousPersonRole}`);
    setPersonName(personInput);
    setPersonRole(roleInput);
    // TODO: create POST request to add this new person to the database
    axios({
      method: 'POST',
      url: '/people',
      data: {name: personInput, role: roleInput}
    }).then((response) => {
      fetchPeople();
      setPersonInput('');
      setRoleInput('');
    })
    // HINT: the server is expecting a person object 
    //       with a `name` and a `role` property
  
  }

    return (
      <section className="new-person-section">
        <form onSubmit={addPerson}>
          <label htmlFor="name-input">Name:</label>
          <input 
          id="name-input"
          onChange={e => setPersonInput(e.target.value)} 
          value={personInput}
          />
          <label htmlFor="role-input">Famous for:</label>
          <input 
          id="role-input"
          onChange={e => setRoleInput(e.target.value)}
          value={roleInput}
          />
          <button type="submit">Done</button>
        </form>
        <p>
          {famousPersonName} is famous for "{famousPersonRole}".
        </p>
        <ul>
          {famousPeopleArray.map((person) => {
            return <li key={person.id}>{person.name} is famous for: "{person.role}"</li>
          })}
        </ul>
      </section>
    );
}

export default FamousSection;
