import { useCallback } from "react";
import * as Yup from "yup"; // Import Yup for validation
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// import * as Yup from "yup";

// Validation schema for login form
export const loginSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name can't be longer than 30 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password can't be longer than 20 characters"),
});
export const handleSubmit = (
  values: { name: string; password: string },
  navigate: ReturnType<typeof useNavigate>,
  setSubmitting: (isSubmitting: boolean) => void
) => {
  console.log("Submit handler invoked with values:", values); // Add a log here to check if it's triggered

  // Find the user in the validCredentials array
  const user = validCredentials.find(
    (cred: { name: string; password: string }) =>
      cred.name === values.name && cred.password === values.password
  );

  if (user) {
    toast.success("Login Successful", {
      position: "top-center",
      autoClose: 2000, // Automatically close after 2 seconds
    });
    setTimeout(() => {
      navigate("/MovieList"); // Redirect to /movies after login success
    }, 2000); // Redirect after 2 seconds
  } else {
    toast.error("Invalid Credentials", {
      position: "top-center",
      autoClose: 2000, // Automatically close after 2 seconds
    });
  }

  setSubmitting(false); // Stop the submission state
};

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[a-zA-Z\s]+$/,
      "Name should not contain special characters or numbers"
    )
    .min(3, "Name must be at least 3 characters long")
    .required("Name is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9@.]+$/,
      "Email can only contain letters, numbers, '@', and '.'"
    )
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number can't be longer than 15 digits")
    .required("Phone number is required"),
  profession: Yup.string()
    .oneOf(["developer", "designer", "manager", "hr"], "Profession is required")
    .required("Profession is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

// // Load data from LocalStorage
// export const loadStoredData = (): User[] => {
//   return JSON.parse(localStorage.getItem("storedData") || "[]");
// };

// Save data to LocalStorage
// export const saveStoredData = (storedData: User[]) => {
//   localStorage.setItem("storedData", JSON.stringify(storedData));
// };

// Handle adding new user
export const saveStoredData = (storedData: User[]) => {
  localStorage.setItem("usersList", JSON.stringify(storedData));
};

// Load data from LocalStorage
export const loadStoredData = (): User[] => {
  const savedData = localStorage.getItem("usersList");
  console.log("savedData",savedData);
  return savedData ? JSON.parse(savedData) : [];
};

// Handle adding new user (Signup)
export const handleSignupSubmit = (
  values: User,
  navigate: ReturnType<typeof useNavigate>,
//   setStoredData: React.Dispatch<React.SetStateAction<User[]>>,
  resetForm: () => void
) => {
  const existingUsers = getUsersList(); // Load existing users from localStorage
  console.log("existingUsers", existingUsers);
  const updatedUsers = [...existingUsers, values]; // Add the new user to the list

  // Save the updated list of users to localStorage
  saveStoredData(updatedUsers);

  // Update the app state with the new user list
//   setStoredData(updatedUsers);

  // Show success message
  toast.success("Signup Successful", {
    position: "top-center",
    autoClose: 2000,
  });
  setTimeout(() => {
    navigate("/login"); // Redirect to /movies after login success
  }, 2000);
  // Reset the form after submission
  resetForm();
};

// Function to get the list of users from localStorage
export const getUsersList = (): User[] => {
  return loadStoredData(); // Load users from local storage
};

// Handle user update
export const handleUserUpdate = (
  values: User,
//   storedData: User[],
  selectedUser: { index: number } | null,
//   setStoredData: React.Dispatch<React.SetStateAction<User[]>>,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
) => {
  const updatedData = getUsersList();
  if (selectedUser) {
    updatedData[selectedUser.index] = values;
    // setStoredData(updatedData);
    saveStoredData(updatedData);
    // setSelectedUser(null);
    // setActiveTab("users");
    // toast.success("User updated successfully", {
    //   position: "top-center",
    //   autoClose: 2000,
    // });
    setSelectedUser(null);
    setActiveTab("users");
    toast.success("User updated successfully", {
      position: "top-center",
      autoClose: 2000,
    });
  }
};

export const handleEditUser = (
  updatedUser: User,
  index: number
  // storedData: User[],
  // setStoredData: React.Dispatch<React.SetStateAction<User[]>>,
  // resetForm: () => void
) => {
  // Update the user in the stored data

  const storedData = getUsersList();
  const updatedUsers = [...storedData];
  updatedUsers[index] = updatedUser; // Replace the user at the specified index with the updated user

  // Save the updated data to localStorage
  saveStoredData(updatedUsers);

  // Update the state
  // setStoredData(updatedUsers);

  // Show success toast
  toast.success("User updated successfully!", {
    position: "top-center",
    autoClose: 2000,
  });

  // Reset the form after updating
  // resetForm();
};

// **Handle Deleting a User**
export const handleDeleteUser = (
    index: number,
    // storedData: User[],
    // setStoredData: React.Dispatch<React.SetStateAction<User[]>>
  ) => {
    // Check if index is within valid range
    const storedData = getUsersList();
    if (index < 0 || index >= storedData?.length) {
      toast.error("Invalid user index!", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
  
    // Remove the user from the stored data
    const updatedUsers = storedData.filter((_, i) => i !== index);
  
    // Save the updated data to localStorage
    saveStoredData(updatedUsers);
  
    // Update the state with the new users list
    // setStoredData(updatedUsers);
  
    // Show success toast
    toast.success("User deleted successfully!", {
      position: "top-center",
      autoClose: 2000,
    });
  };
  

type EditDeleteCallback = (index: number) => void;
export type User = {
  name: string;
  email: string;
  phone: string;
  profession: string;
  password?: string;
};

export const addUser = (
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  editIndex: number | null,
  user: User,
  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>,
  setUserToEdit: React.Dispatch<React.SetStateAction<User | null>>
) => {
  if (editIndex !== null) {
    const updatedUsers = users.map((u, index) =>
      index === editIndex ? user : u
    );
    setUsers(updatedUsers);
    setEditIndex(null);
    setUserToEdit(null);
  } else {
    setUsers((prevUsers) => [...prevUsers, user]);
  }
};

export const deleteUser = (
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  index: number
) => {
  const updatedUsers = users.filter((_, i) => i !== index);
  setUsers(updatedUsers);
};

export const editUser = (
  users: User[],
  setUserToEdit: React.Dispatch<React.SetStateAction<User | null>>,
  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>,
  index: number
) => {
  setUserToEdit(users[index]);
  setEditIndex(index);
};

export const useHandleDeleteUser = (deleteUser: EditDeleteCallback) => {
  return useCallback(
    (index: number) => {
      deleteUser(index);
    },
    [deleteUser]
  );
};

export const useHandleEditUser = (editUser: EditDeleteCallback) => {
  return useCallback(
    (index: number) => {
      editUser(index);
    },
    [editUser]
  );
};

export const validCredentials = [
  { name: "testuser", password: "testpassword" },
  { name: "admin", password: "admin123" },
  { name: "guest", password: "guestpass" },
  { name: "user1", password: "password1" },
  { name: "user2", password: "password2" },
];
