import React from 'react';
import { useState } from 'react';
import Game from './components/Game';
import About from './components/About';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserForm from './components/Users';

import SideNav from './components/SideNavBar';
import SignupForm from './components/Signup';
import LoginForm from './components/Login';

export default function App() {

  const [users, setUsers] = useState([]);
  const handleUsers = (newUser) => {
    setUsers([...users, newUser]);

  }

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SideNav />}>
          <Route index element={<About />} />
          <Route path="game" element={<Game users={users} />} />
          <Route path="users" element={<UserForm users={users} handleUsers={handleUsers} />} />
          <Route path="sinup" element={<SignupForm />} />
          <Route path="login" element={<LoginForm />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}
