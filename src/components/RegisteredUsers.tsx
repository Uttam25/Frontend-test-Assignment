import React from "react";

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
  return (
    <div className="flex flex-col justify-start h-[100vh]  items-center w-[100vw]">
      <h2 className="text-[22px] mt-8 font-bold">Registered Users</h2>

      {users.length === 0 ? (
        <p>No users registered yet.</p>
      ) : (
        <table className="table-auto border-collapse border border-gray-300 mt-4">
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
              <tr key={index}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.phone}</td>
                <td className="border px-4 py-2">{user.profession}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => editUser(index)}
                    className="mr-4 text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(index)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RegisteredUsers;
