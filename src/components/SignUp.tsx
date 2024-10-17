import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisteredUsers from "./RegisteredUsers";
import { User, validationSchema, handleSignupSubmit } from "@/utils/user";
import { Link, useNavigate } from "react-router-dom";

// Define the type for form values
interface FormValues {
  name: string;
  email: string;
  phone: string;
  profession: string;
  password: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("signup");

  // Initial form values
  const initialValues: FormValues = {
    name: "",
    email: "",
    phone: "",
    profession: "",
    password: "",
  };

  // Signup form rendering
  const renderSignupForm = () => (
    <div className="flex flex-col w-full">
      <h2 className="mb-8 text-center text-[2rem] font-BebasNune font-bold text-white">
        Signup
      </h2>
      <div className="flex justify-center mb-8">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleSignupSubmit(values, navigate, resetForm);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex w-full justify-center items-center flex-col gap-6">
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className="border px-4 w-[70%] text-black md:w-[75%] lg:w-[30%] border-black py-2 rounded-md"
              />
              <ErrorMessage name="name" component="div" className="text-red-500" />

              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="border px-4 w-[70%] text-black md:w-[75%] lg:w-[30%] border-black py-2 rounded-md"
              />
              <ErrorMessage name="email" component="div" className="text-red-500" />

              <Field
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="border px-4 w-[70%] text-black md:w-[75%] lg:w-[30%] border-black py-2 rounded-md"
              />
              <ErrorMessage name="phone" component="div" className="text-red-500" />

              <Field
                as="select"
                name="profession"
                className="border w-[70%] md:w-[75%] text-black lg:w-[30%] px-4 border-black py-2 rounded-md"
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
                className="border px-4 w-[70%] text-black md:w-[75%] lg:w-[30%] border-black py-2 rounded-md"
              />
              <ErrorMessage name="password" component="div" className="text-red-500" />

              <button
                type="submit"
                disabled={isSubmitting}
                className="border text-white w-[40%] md:w-[50%] lg:w-[20%] bg-[#CB1517] p-2 border-[#CB1517] rounded-md"
              >
                Signup
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-[100vh] justify-center items-center w-[100vw]">
      {activeTab === "signup" ? renderSignupForm() : <RegisteredUsers />}
      <ToastContainer />
      <h1 className="text-[18px] font-PoppinsBoldItalic text-white">
        Already Registered? Please{" "}
        <Link to="/login" className="text-[18px] font-BebasNune underline">
          Login
        </Link>
      </h1>
    </div>
  );
};

export default Signup;
