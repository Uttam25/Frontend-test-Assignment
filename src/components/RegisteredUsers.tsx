import React from "react";
import Header from "./Header";
import { getUsersList, handleDeleteUser, handleEditUser } from "@/utils/user";

const RegisteredUsers: React.FC = ({
}) => {
const users = getUsersList()
console.log("users",users)

  return (
    <div className="flex  bg-black flex-col  lg:w-[100vw] sm:w-[full] lg:flex-col sm:justify-center lg:justify-start h-[100vh] items-center ">
      {/* Header */} 
      <Header />

      <div className="mt-[10%] ">
        <h2 className="text-[2rem] mt-8 font-BebasNune text-center text-white font-bold">
          Registered Users
        </h2>

        {users.length === 0 ? (
          <p className="text-[18px] mt-8 text-white font-bold">
            No users registered yet.
          </p>
        ) : (
          <div className="overflow-x-auto  ">
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
              <tbody className="overflow-x-auto">
                {users.map((user, index) => (
                  <tr key={index} className=" text-white">
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.phone}</td>
                    <td className="border px-4 py-2">{user.profession}</td>
                    <td className="border px-4 py-2 flex flex-row gap-4 justify-center">
                      <button
                        onClick={() => handleEditUser( user,index)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(index)}
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
