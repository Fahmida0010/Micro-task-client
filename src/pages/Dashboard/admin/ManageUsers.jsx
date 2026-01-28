import { useEffect, useState } from "react";
import axiosSecure from "../../../utils/axiosSecure";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosSecure.get("/users").then(res => setUsers(res.data));
  }, []);

  const handleDelete = id => {
    axiosSecure.delete(`/users/${id}`).then(() => {
      setUsers(users.filter(u => u._id !== id));
    });
  };

  const handleRoleChange = (id, role) => {
    axiosSecure.patch(`/users/role/${id}`, { role }).then(() => {
      setUsers(
        users.map(u =>
          u._id === id ? { ...u, role } : u
        )
      );
    });
  };

  return (
    <div>
      <h2>Manage Users</h2>

      {users.map(user => (
        <div key={user._id}>
          <img src={user.photo_url} width="40" />
          <span>{user.display_name}</span>
          <span>{user.email}</span>
          <span>{user.coin}</span>

          <select
            value={user.role}
            onChange={e => handleRoleChange(user._id, e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="buyer">Buyer</option>
            <option value="worker">Worker</option>
          </select>

          <button onClick={() => handleDelete(user._id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default ManageUsers;
