import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "@/components/HomePage";
import RegisteredUsers from "@/components/RegisteredUsers";
import MovieList from "@/components/MovieList";
import Login from "@/components/Login";
import Signup from "@/components/SignUp";

// Define the User type
type User = {
  name: string;
  email: string;
  phone: string;
  profession: string;
  password?: string; // Optional, as it might not be needed after signup
};

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  // Function to add a user
  const addUser = (user: User) => {
    if (editIndex !== null) {
      // Update an existing user
      const updatedUsers = users.map((u, index) => (index === editIndex ? user : u));
      setUsers(updatedUsers);
      setEditIndex(null);
      setUserToEdit(null); // Reset after editing
    } else {
      // Add a new user
      setUsers((prevUsers) => [...prevUsers, user]);
    }
  };

  // Handle delete user
  const deleteUser = (index: number) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  // Handle edit user (you can define logic or use callback)
  const editUser = (index: number) => {
    setUserToEdit(users[index]);
    setEditIndex(index); // Track which user is being edited
  };

  return (
    <div className="bg-[#191818]">
      <Router>
        <Routes>
          {/* Redirect root "/" to "/SignIn" */}
          <Route path="/" element={<HomePage />} />
          <Route path="/SignIn" element={<Signup addUser={addUser} />} />
         
          <Route
            path="/UserDetails"
            element={
              <RegisteredUsers
                users={users}
                deleteUser={deleteUser}
                editUser={editUser} // Pass only the index for editing
              />
            }
          />

          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export { App };
