import React, { useState, useEffect } from 'react';
import './FamousSection.css';
import axios from 'axios';
import FamousPersonForm from '../FamousPersonForm/FamousPersonForm';

function FamousSection() {
  let [famousPersonName, setPersonName] = useState('');
  let [famousPersonRole, setPersonRole] = useState('');

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

  
    return (
      <section className="new-person-section">
       <FamousPersonForm />
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
