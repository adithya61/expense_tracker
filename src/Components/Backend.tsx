import { useEffect, useState } from "react";
import { CanceledError } from "../services/api-client";
import userService, { Users } from "../services/user-service";
import useUsers from "../hooks/useUsers";

const Backend = () => {
  const { users, setUsers, error, setError, isLoading } = useUsers();

  const handleDelete = (user: Users) => {
    const originalUsers = users;
    // Optimistic Update.
    setUsers(users.filter((u) => u.id != user.id));

    userService.delete(user.id).catch((error) => {
      setError(error.message);
      setUsers(originalUsers);
    });
  };

  const addUsers = () => {
    const originalUsers = [...users];

    const user = { id: 0, name: "adi" };

    setUsers([user, ...users]);

    userService
      .create(user)
      .then(({ data }) => setUsers([data, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUsers = (user: Users) => {
    const originalUsers = [...users];

    const updatedUser = { ...user, name: user.name + "!" };

    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    userService.update(updatedUser).catch((error) => {
      setError(error.message);
      setUsers(originalUsers);
    });
  };

  return (
    <div className="m">
      {error && <p className="text-warning">{error}</p>}
      {isLoading && (
        <div className="spinner-border text-danger" role="status"></div>
      )}
      <button className="btn btn-primary mt-3 mx-3" onClick={addUsers}>
        Add User
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={user.id}
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-2"
                onClick={() => updateUsers(user)}
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(user)}
                className="btn btn-outline-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Backend;
