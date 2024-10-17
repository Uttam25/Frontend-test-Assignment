import { useCallback } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

// Validation schema for signup/edit forms
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

// **LocalStorage Utility Functions**
// Save data to LocalStorage
export const saveStoredData = (storedData: User[]) => {
  localStorage.setItem("usersList", JSON.stringify(storedData));
};

// Load data from LocalStorage
export const loadStoredData = (): User[] => {
  const savedData = localStorage.getItem("usersList");
  return savedData ? JSON.parse(savedData) : [];
};

// Get all users from localStorage
export const getUsersList = (): User[] => {
  return loadStoredData();
};

// Get user by index
export const getUserByIndex = (index: number) => {
  const users = getUsersList();
  return index >= 0 && index < users.length ? users[index] : null;
};

// **Login Handling**
export const handleSubmit = (
  values: { name: string; password: string },
  navigate: ReturnType<typeof useNavigate>,
  setSubmitting: (isSubmitting: boolean) => void
) => {
  const user = validCredentials.find(
    (cred: { name: string; password: string }) =>
      cred.name === values.name && cred.password === values.password
  );

  if (user) {
    toast.success("Login Successful", {
      position: "top-center",
      autoClose: 2000,
    });
    setTimeout(() => {
      navigate("/MovieList"); // Redirect to movie list after login success
    }, 2000);
  } else {
    toast.error("Invalid Credentials", {
      position: "top-center",
      autoClose: 2000,
    });
  }

  setSubmitting(false); // Stop the submission state
};

// **Signup Handling with Duplicate Check**
export const handleSignupSubmit = (
  values: User,
  navigate: ReturnType<typeof useNavigate>,
  resetForm: () => void
) => {
  const existingUsers = getUsersList();

  // Check for duplicate users by name or email
  const userExists = existingUsers.some(
    user => user.name === values.name || user.email === values.email
  );

  if (userExists) {
    toast.error("User already exists", {
      position: "top-center",
      autoClose: 2000,
    });
    return;
  }

  const updatedUsers = [...existingUsers, values];
  saveStoredData(updatedUsers);

  toast.success("Signup Successful", {
    position: "top-center",
    autoClose: 2000,
  });
  setTimeout(() => {
    navigate("/login"); // Redirect to login after signup success
  }, 2000);

  resetForm(); // Reset the form after submission
};

// **Handle User Edit Submission**
export const handleEditUserSubmit = (
  values: User,
  index: number,
  navigate: ReturnType<typeof useNavigate>,
  resetForm: () => void
) => {
  const existingUsers = getUsersList();

  if (index >= 0 && index < existingUsers.length) {
    existingUsers[index] = { ...existingUsers[index], ...values };
    saveStoredData(existingUsers);

    toast.success("User updated successfully!", {
      position: "top-center",
      autoClose: 2000,
    });

    setTimeout(() => {
      navigate("/userdetails");
    }, 2000);

    resetForm();
  } else {
    toast.error("Invalid user index", {
      position: "top-center",
      autoClose: 2000,
    });
  }
};

// **Handle User Deletion**
export const handleDeleteUser = (index: number) => {
  const storedData = getUsersList();

  if (index < 0 || index >= storedData?.length) {
    toast.error("Invalid user index!", {
      position: "top-center",
      autoClose: 2000,
    });
    return;
  }

  const updatedUsers = storedData.filter((_, i) => i !== index);
  saveStoredData(updatedUsers);

  toast.success("User deleted successfully!", {
    position: "top-center",
    autoClose: 2000,
    });
    window.location.reload();
};

// **Helper Functions for User CRUD Operations**
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

type EditDeleteCallback = (index: number) => void;


// **Handle Edit and Delete with useCallback Hooks**
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

// **Valid Credentials for Login (Hardcoded)**
export const validCredentials = [
  { name: "testuser", password: "testpassword" },
  { name: "admin", password: "admin123" },
  { name: "guest", password: "guestpass" },
  { name: "user1", password: "password1" },
  { name: "user2", password: "password2" },
];

// **User Type Definition**
export type User = {
  name: string;
  email: string;
  phone: string;
  profession: string;
  password?: string;
};
