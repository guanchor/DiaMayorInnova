import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService.js";
import AddUsers from "./add-users/AddUsers.jsx";
import ListUsers from "./list-users/ListUsers.jsx";
import FindNameUsers from "./find-name-user/FindNameUsers.jsx";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    userService.getAllUsers()
      .then(({ data }) => {
        console.log(data.data.users);
        if (data.data && data.data.users) {
          console.log("Usuarios obtenidos:", data.data.users);
          setUsers(data.data.users);
        } else {
          console.error("No se encontraron usuarios en la respuesta.");
          setError("No se encontraron usuarios.");
        }
      })
      .catch(e => {
        console.error("Error fetching users", e);
        setError("Hubo un error al obtener los usuarios.");
      });
  }, []);

  return (
    <main className="user_page">
      <ListUsers
        users={users}
        setUsers={setUsers}
      />

      <AddUsers setUsers={setUsers} />

      <FindNameUsers users={users} />
    </main>
  );
};

export default UserManagement;