import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisteredUsers from "./RegisteredUsers"; // Import the RegisteredUsers component

// Define the type for a single User
type User = {
  name: string;
  email: string;
  phone: string;
  profession: string;
  password: string;
};

// Define Yup validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Name should not contain special characters or numbers")
    .min(3, "Name must be at least 3 characters long")
    .required("Name is required"),
  email: Yup.string()
    .matches(/^[a-zA-Z0-9@.]+$/, "Email can only contain letters, numbers, '@', and '.'")
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

const Signup: React.FC = () => {
  const [storedData, setStoredData] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User & { index: number } | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<string>("signup");

  // Load data from LocalStorage on component mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("storedData") || "[]");
    setStoredData(savedData);
  }, []);

  // Save data to LocalStorage when storedData changes
  useEffect(() => {
    localStorage.setItem("storedData", JSON.stringify(storedData));
  }, [storedData]);

  // Handle Delete user
  const deleteUser = (index: number) => {
    const updatedData = storedData.filter((_, i) => i !== index);
    setStoredData(updatedData);
  };

  // Handle Edit user
  const editUser = (index: number) => {
    setSelectedUser({ ...storedData[index], index });
    setActiveTab("edit");
  };

  // Handle Update user
  const updateUser = (values: User) => {
    const updatedData = [...storedData];
    if (selectedUser) {
      updatedData[selectedUser.index] = values;
      setStoredData(updatedData);
      setSelectedUser(null);
      setActiveTab("users");
      toast.success("User updated successfully", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center w-[100vw]">
      <div className="my-4">
        {/* Tab Links */}
        <button onClick={() => setActiveTab("signup")} className="mr-4">
          Signup Form
        </button>
        <button onClick={() => setActiveTab("users")}>Registered Users</button>
      </div>

      {/* Signup Form */}
      {activeTab === "signup" && (
        <div className="flex flex-col">
          <h2 className="mb-8 text-center font-bold text-[22px]">Signup</h2>
          <div className="flex flex-row mb-8 justify-center">
            <Formik
              initialValues={{
                name: "",
                email: "",
                phone: "",
                profession: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setStoredData((prevData) => [...prevData, values]);
                toast.success("Signup Successful", {
                  position: "top-center",
                  autoClose: 2000,
                });
                resetForm();
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-6">
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="border px-4 w-[22rem] border-black py-2 rounded-md"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500" />

                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border  px-4  w-[22rem] border-black py-2 rounded-md"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500" />

                  <Field
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    className="border  px-4  w-[22rem] border-black py-2 rounded-md"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500" />

                  <Field
                    as="select"
                    name="profession"
                    className="border w-[22rem]  px-4  border-black py-2 rounded-md"
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="developer">Developer</option>
                    <option value="designer">Designer</option>
                    <option value="manager">Manager</option>
                    <option value="hr">HR</option>
                  </Field>
                  <ErrorMessage name="profession" component="div" className="text-red-500" />

                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border px-4 w-[22rem] border-black py-2 rounded-md"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500" />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="border text-white cursor bg-[#CB1517] p-4 border-[#CB1517] rounded-md"
                  >
                    Signup
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* Edit User Form */}
      {activeTab === "edit" && selectedUser && (
        <div className="flex flex-col">
          <h2 className="mb-8 text-center font-bold text-[22px]">Edit User</h2>
          <div className="flex flex-row mb-8 justify-center">
            <Formik
              initialValues={selectedUser}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                updateUser(values);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-6">
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="border px-4 w-[22rem] border-black py-2 rounded-md"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500" />

                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border  px-4  w-[22rem] border-black py-2 rounded-md"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500" />

                  <Field
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    className="border  px-4  w-[22rem] border-black py-2 rounded-md"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500" />

                  <Field
                    as="select"
                    name="profession"
                    className="border w-[22rem]  px-4  border-black py-2 rounded-md"
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="developer">Developer</option>
                    <option value="designer">Designer</option>
                    <option value="manager">Manager</option>
                    <option value="hr">HR</option>
                  </Field>
                  <ErrorMessage name="profession" component="div" className="text-red-500" />

                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border px-4 w-[22rem] border-black py-2 rounded-md"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500" />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="border text-white cursor bg-[#CB1517] p-4 border-[#CB1517] rounded-md"
                  >
                    Update
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* Registered Users Tab */}
      {activeTab === "users" && (
        <RegisteredUsers
          users={storedData}
          deleteUser={deleteUser}
          editUser={editUser}
        />
      )}

      {/* Toast Notifications */}
      <ToastContainer />
      <h1 className="text-[18px] ">Already Registered? please <a href="/login" className="text-[18px] text-italic underline">Login</a></h1>
    </div>
  );
};

export default Signup;
