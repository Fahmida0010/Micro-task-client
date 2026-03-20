import { useEffect, useState } from "react";
import axiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUserShield, FaUserEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosSecure.get("/users").then((res) => setUsers(res.data));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${id}`).then(() => {
          setUsers(users.filter((u) => u._id !== id));
          Swal.fire("Deleted!", "User has been removed.", "success");
        });
      }
    });
  };

  const handleRoleChange = (id, role) => {
    axiosSecure.patch(`/users/role/${id}`, { role }).then(() => {
      setUsers(users.map((u) => (u._id === id ? { ...u, role } : u)));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Role updated to ${role}`,
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 lg:mb-10 gap-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl
        mt-10 font-extrabold text-indigo-800 flex items-center gap-3 drop-shadow-sm">
          <FaUserShield className="text-indigo-600 text-4xl" /> Manage Users
        </h2>
        <span className="bg-purple-200 text-indigo-800 px-5 py-2 rounded-full font-bold shadow-sm text-sm sm:text-base">
          Total: {users.length}
        </span>
      </div>

      {/* Content */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-100/50 overflow-hidden">
        {/* Mobile Card View */}
        <div className="block lg:hidden divide-y divide-purple-100">
          {users.length === 0 ? (
            <div className="text-center py-12 text-gray-500 font-medium">
              No users found
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user._id}
                className="p-5 hover:bg-indigo-50/50 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-200 shadow-md"
                      src={user.photo || "https://i.ibb.co/m9YyZ2G/user.png"}
                      alt={user.name}
                    />
                    <div>
                      <p className="font-bold text-indigo-900 text-lg">{user.name}</p>
                      <p className="text-sm text-gray-600 mt-0.5">{user.email}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(user._id)}
                    className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all active:scale-95"
                    title="Delete User"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
                  <div className="bg-amber-100 text-amber-800 px-4 py-1.5 rounded-xl text-sm font-bold shadow-sm">
                    🪙 {user.coin}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700">Role:</span>
                    <div className="relative">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="bg-white border-2 border-indigo-200 text-indigo-700 text-sm rounded-xl px-4 py-2 pr-10 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none cursor-pointer shadow-sm"
                      >
                        <option value="admin">Admin</option>
                        <option value="buyer">Buyer</option>
                        <option value="worker">Worker</option>
                      </select>
                      <FaUserEdit className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500 pointer-events-none" size={16} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gradient-to-r from-indigo-600
             to-purple-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">User</th>
                <th className="px-6 py-4 text-left font-semibold">Email</th>
                <th className="px-6 py-4 text-left font-semibold">Coins</th>
                <th className="px-6 py-4 text-left font-semibold">Role</th>
                <th className="px-6 py-4 text-center font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-500 font-medium">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-indigo-50/50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-100 shadow-sm"
                          src={user.photo || "https://i.ibb.co/m9YyZ2G/user.png"}
                          alt={user.name}
                        />
                        <span className="font-semibold text-indigo-800">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                        🪙 {user.coin}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative inline-block w-40">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          className="w-full bg-white border-2 border-indigo-200 text-indigo-700 rounded-xl px-4 py-2 pr-10 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none cursor-pointer shadow-sm"
                        >
                          <option value="admin">Admin</option>
                          <option value="buyer">Buyer</option>
                          <option value="worker">Worker</option>
                        </select>
                        <FaUserEdit className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500 pointer-events-none" size={16} />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all active:scale-95 shadow-sm"
                        title="Delete User"
                      >
                        <FaTrashAlt size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;