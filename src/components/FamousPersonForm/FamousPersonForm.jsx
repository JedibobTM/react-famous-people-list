import React, { useState } from 'react';
import axios from 'axios';


function FamousPersonForm() {
    let [personInput, setPersonInput] = useState('');
    let [roleInput, setRoleInput] = useState('');
    let [famousPersonName, setPersonName] = useState('');
    let [famousPersonRole, setPersonRole] = useState('');

    const addPerson = (evt) => {
        evt.preventDefault();
        setPersonName(personInput);
        setPersonRole(roleInput);
        // TODO: create POST request to add this new person to the database
        axios({
            method: 'POST',
            url: '/people',
            data: { name: personInput, role: roleInput }
        }).then((response) => {
            setPersonInput('');
            setRoleInput('');
        })
        // HINT: the server is expecting a person object 
        //       with a `name` and a `role` property

    }
    return (
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
    )
}

export default FamousPersonForm;