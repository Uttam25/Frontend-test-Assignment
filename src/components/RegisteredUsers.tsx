import React, { useCallback } from "react";
import Header from "./Header";

// Define the User type
type User = {
  name: string;
  email: string;
  phone: string;
  profession: string;
};

type RegisteredUsersProps = {
  users: User[];
  deleteUser: (index: number) => void;
  editUser: (index: number) => void;
};

const RegisteredUsers: React.FC<RegisteredUsersProps> = ({
  users,
  deleteUser,
  editUser,
}) => {
  
  const handleDeleteUser = useCallback(
    (index: number) => {
      deleteUser(index);
    },
    [deleteUser]
  );

  const handleEditUser = useCallback(
    (index: number) => {
      editUser(index);
    },
    [editUser]
  );

  return (
    <div className="flex flex-col justify-start h-[100vh] items-center w-[100vw]">
      {/* Header */}
      <Header />

      <div className="mt-[10%]">
        <h2 className="text-[2rem] mt-8 font-BebasNune text-white font-bold">
          Registered Users
        </h2>

        {users.length === 0 ? (
          <p className="text-[18px] mt-8 text-white font-bold">
            No users registered yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-300 mt-4 w-full">
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
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.phone}</td>
                    <td className="border px-4 py-2">{user.profession}</td>
                    <td className="border px-4 py-2 flex flex-row gap-4 justify-center">
                      <button
                        onClick={() => handleEditUser(index)}
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
