import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyTasks = () => {

  const [tasks,setTasks] = useState([]);

  const loadTasks = async ()=>{
    const res = await axiosSecure.get("/tasks/my");
    setTasks(res.data);
  };

  useEffect(()=>{
    loadTasks();
  },[]);

  const handleDelete = async(id)=>{

    const confirm = await Swal.fire({
      title:"Delete task?",
      showCancelButton:true,
      confirmButtonText:"Yes"
    });

    if(!confirm.isConfirmed) return;

    const res = await axiosSecure.delete(`/tasks/${id}`);

    if(res.data.success){
      Swal.fire("Deleted!");
      loadTasks();
    }
  };

  // date format helper
  const formatDate = (date)=>{
    return new Date(date).toLocaleDateString("en-GB",{
      day:"2-digit",
      month:"short",
      year:"numeric"
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">

      <h2 className="text-2xl md:text-3xl font-bold mb-6">My Tasks</h2>

      {/* ================= TABLE (Desktop + Tablet) ================= */}

      <div className="hidden sm:block overflow-x-auto border rounded-lg">

        <table className="w-full min-w-[700px]">

          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-3">Title</th>
              <th>Date Added</th>
              <th>Workers</th>
              <th>Pay</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-400">
                  No tasks found
                </td>
              </tr>
            )}

            {tasks.map(task=>(
              <tr 
                key={task._id} 
                className="border-t text-center hover:bg-gray-50 transition"
              >

                <td className="p-3 font-medium">{task.title}</td>

                <td className="text-gray-600">
                  {formatDate(task.createdAt)}
                </td>

                <td>{task.required_workers}</td>

                <td className="font-semibold">
                  {task.payable_amount}
                </td>

                <td className="space-x-2 py-2">

                  <Link
                    to={`/dashboard/updateTask/${task._id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    Update
                  </Link>

                  <button
                    onClick={()=>handleDelete(task._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>


      {/* ================= CARD (Mobile) ================= */}

      <div className="sm:hidden space-y-4">

        {tasks.length === 0 && (
          <div className="text-center p-6 border rounded text-gray-400">
            No tasks found
          </div>
        )}

        {tasks.map(task=>(
          <div 
            key={task._id} 
            className="border rounded-xl p-4 shadow-sm bg-white"
          >

            <h3 className="font-bold text-lg mb-1">
              {task.title}
            </h3>

            <p className="text-sm text-gray-500 mb-2">
              Added: {formatDate(task.createdAt)}
            </p>

            <div className="flex justify-between text-sm mb-2">
              <span>👥 Workers: {task.required_workers}</span>
              <span className="font-semibold">
                💰 {task.payable_amount}
              </span>
            </div>

            <div className="flex gap-2 mt-3">

              <Link
                to={`/dashboard/updateTask/${task._id}`}
                className="flex-1 text-center bg-blue-500 text-white py-2 rounded-lg text-sm hover:bg-blue-600"
              >
                Update
              </Link>

              <button
                onClick={()=>handleDelete(task._id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default MyTasks;
