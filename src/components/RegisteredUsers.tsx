import React, { useState, useEffect } from "react";
import Header from "./Header";
import { getUsersList, handleDeleteUser } from "@/utils/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Optional for toast feedback on delete

const RegisteredUsers: React.FC = () => {
    //@ts-ignore
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  // Fetch users on component mount
  useEffect(() => {
    const fetchedUsers = getUsersList();
    setUsers(fetchedUsers);
  }, []);

  // Handle deleting user with confirmation
  const handleDelete = (index: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      handleDeleteUser(index);
      setUsers(getUsersList()); // Update users after deletion
      toast.success("User deleted successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex bg-black flex-col lg:w-[100vw] sm:w-[full] lg:flex-col sm:justify-center lg:justify-start h-[100vh] items-center">
      {/* Header */}
      <div className="hidden lg:block ">
        <Header />
      </div>

      <div className="mt-[10%] w-[100vw]">
        <h2 className="text-[2rem] text-center mt-8 font-BebasNune text-center text-white font-bold">
          Registered Users
        </h2>

        {users.length === 0 ? (
          <p className="text-[18px] font-PoppinsBoldItalic text-center mt-8 text-[#989898]">
            No users registered yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse text-white border border-gray-300 mt-4 w-full">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Phone</th>
                  <th className="border px-4 py-2">Profession</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="text-white">
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.phone}</td>
                    <td className="border px-4 py-2">{user.profession}</td>
                    <td className="border px-4 py-2 flex flex-row gap-4 justify-center">
                      <button
                        onClick={() => navigate(`/edit-user/${index}`)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisteredUsers;
