import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";  // Import Yup for validation
import "react-toastify/dist/ReactToastify.css";

const validCredentials = [
  { name: "testuser", password: "testpassword"},
  { name: "admin", password: "admin123" },
  { name: "guest", password: "guestpass"},
  { name: "user1", password: "password1" },
  { name: "user2", password: "password2" },
];

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate(); 

  return (
    <div className="flex w-[100vw] h-[100vh] justify-center items-center">
      <div className="flex flex-col justify-center">
        <h2 className="mb-6 text-center text-white font-BebasNune font-bold text-[2rem]">Login</h2>
        <div className="mb-[5%] ">
        <Formik
        
          initialValues={{ name: "", password: "" }}
          validationSchema={validationSchema}  // Apply validation schema
          onSubmit={(values, { setSubmitting }) => {
            // Find the user in the validCredentials array
            const user = validCredentials.find(
              (cred) =>
                cred.name === values.name &&
                
                cred.password === values.password
            );

            if (user) {
              toast.success("Login Successful", {
                position: "top-center",
                autoClose: 2000,  // Automatically close after 2 seconds
              });
              setTimeout(() => {
                navigate("/MovieList");  // Redirect to /movies after login success
              }, 2000);  // Redirect after 2 seconds
            } else {
              toast.error("Invalid Credentials", {
                position: "top-center",
                autoClose: 2000,  // Automatically close after 2 seconds
              });
            }

            setSubmitting(false);  // Stop the submission state
          }}
        >
          {({ isSubmitting }) => (

            <Form className="flex flex-col  gap-6">
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className="border w-[22rem] border-black p-2 rounded-md"
              />
              <ErrorMessage name="name" component="div" className="text-red-500" /> {/* Show name error */}
              
              

              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="border w-[22rem] border-black p-2 rounded-md"
              />
              <ErrorMessage name="password" component="div" className="text-red-500" /> {/* Show password error */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="border text-white bg-[#CB1517]  p-4 border-[#CB1517] rounded-md"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
        </div>
        
        <ToastContainer />
        <h1 className="text-[18px] font-PoppinsBoldItalic text-center text-white ">Need a new account? <a href="/SignIn" className="underline font-BebasNune">Sign In</a></h1>
      </div>
    </div>
  );
};

export default Login;


  