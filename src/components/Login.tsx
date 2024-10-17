import { handleSubmit, loginSchema } from "@/utils/user";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  // Form rendering logic
  const renderLoginForm = (isSubmitting: boolean) => (
    <Form className="flex flex-col justify-center items-center w-[100vw] gap-6">
      <Field
        type="text"
        name="name"
        placeholder="Name"
        className="border w-[70%] text-black lg:w-[30%] border-black p-2 rounded-md"
      />
      <ErrorMessage name="name" component="div" className="text-red-500" />

      <Field
        type="password"
        name="password"
        placeholder="Password"
        className="border w-[70%] text-black lg:w-[30%] border-black p-2 rounded-md"
      />
      <ErrorMessage name="password" component="div" className="text-red-500" />

      <button
        type="submit"
        disabled={isSubmitting}
        className="border w-[70%] lg:w-[30%] text-white bg-[#CB1517] p-4 border-[#CB1517] rounded-md"
      >
        Login
      </button>
    </Form>
  );

  return (
    <div className="flex w-[100vw] h-[100vh] justify-center items-center">
      <div className="flex flex-col justify-center">
        <h2 className="mb-6 text-center text-white font-BebasNune font-bold text-[2rem]">Login</h2>

        <div className="mb-[3%]">
          <Formik
            initialValues={{ name: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Form Submitted:", values);
              handleSubmit(values, navigate, setSubmitting);
            }}
          >
            {({ isSubmitting }) => renderLoginForm(isSubmitting)}
          </Formik>
        </div>

        <ToastContainer />
        <h1 className="text-[18px] font-PoppinsBoldItalic text-center text-white">
          Need a new account?{" "}
          <Link to="/signin" className="underline font-BebasNune">
            Sign Up
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Login;
