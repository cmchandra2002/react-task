import React, { useState } from 'react';
import '../styles/Users.css';

function UserForm({ users, handleUsers }) {
    const [userInput, setUserInput] = useState('');
    const [userId, setUserId] = useState(1);

    const handleSubmit = () => {
        const newUser = {
            name: userInput,
            id: userId
        };
        handleUsers(newUser);

        setUserInput('');
        setUserId(userId + 1);
    };

    return (
        <div className='user-form'>
            <h1>Add New</h1>
            <input
                type="text"
                placeholder="Enter new user name"
                onChange={(e) => setUserInput(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>

            <ol>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ol>
        </div>
    );
}

export default UserForm;
