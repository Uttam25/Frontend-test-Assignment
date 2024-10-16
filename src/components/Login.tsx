import { handleSubmit,  loginSchema } from "@/utils/user";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-[100vw] h-[100vh] justify-center items-center">
      <div className="flex flex-col justify-center">
        <h2 className="mb-6 text-center text-white font-BebasNune font-bold text-[2rem]">Login</h2>
        <div className="mb-[3%]">
          <Formik
            initialValues={{ name: "", password: "" }} // Make sure these values match validation schema
            validationSchema={loginSchema} // Apply validation schema from utils
            onSubmit={(values, { setSubmitting }) => {
              console.log("Form Submitted:", values); // Log form submission
              handleSubmit(values, navigate, setSubmitting); // Use the handleSubmit from utils
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col justify-center items-center w-[100vw] gap-6">
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="border w-[70%] lg:w-[30%] border-black p-2 rounded-md "
                />
                <ErrorMessage name="name" component="div" className="text-red-500" /> {/* Show name error */}

                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="border w-[70%] lg:w-[30%] border-black p-2 rounded-md "
                />
                <ErrorMessage name="password" component="div" className="text-red-500" /> {/* Show password error */}

                <button
                  type="submit"
                  disabled={isSubmitting} // Disable button during submission
                  className="border w-[70%] lg:w-[30%] text-white bg-[#CB1517] p-4 border-[#CB1517] rounded-md"
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>
        </div>

        <ToastContainer />
        <h1 className="text-[18px] font-PoppinsBoldItalic text-center text-white">
          Need a new account? <a href="/signin" className="underline font-BebasNune">Sign In</a>
        </h1>
      </div>
    </div>
  );
};

export default Login;
