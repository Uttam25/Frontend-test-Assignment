import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  getUserByIndex,
  handleEditUserSubmit,
  validationSchema,
} from "@/utils/user";


const EditUser: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>(); 

  console.log(`Edit User${id}`);
  //@ts-ignore
  const userDetails = getUserByIndex(id);
  console.log("userDetails", userDetails);

  return (
    <div>
      <div className="flex flex-col h-[100vh] justify-center items-center w-[100vw]">
        <div className="flex flex-col w-full">
          <h2 className="mb-8 text-center text-[2rem] font-BebasNune font-bold text-white">
            Edit user
          </h2>
          <div className="flex justify-center mb-8">
            <Formik
              initialValues={{
                name: userDetails?.name || "",
                email: userDetails?.email || "",
                phone: userDetails?.phone || "",
                profession: userDetails?.profession || "",
                password: userDetails?.password || "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                //@ts-ignore
                handleEditUserSubmit(values, parseInt(id), navigate, resetForm);
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
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500"
                  />

                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border px-4 w-[70%] text-black md:w-[75%] lg:w-[30%] border-black py-2 rounded-md"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />

                  <Field
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    className="border px-4 w-[70%] text-black md:w-[75%] lg:w-[30%] border-black py-2 rounded-md"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500"
                  />

                  <Field
                    as="select"
                    name="profession"
                    className="border w-[70%] text-black md:w-[75%] lg:w-[30%] px-4 border-black py-2 rounded-md"
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="developer">Developer</option>
                    <option value="designer">Designer</option>
                    <option value="manager">Manager</option>
                    <option value="hr">HR</option>
                  </Field>
                  <ErrorMessage
                    name="profession"
                    component="div"
                    className="text-red-500"
                  />

                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border px-4 w-[70%] text-black md:w-[75%] lg:w-[30%] border-black py-2 rounded-md"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="border text-white w-[40%] md:w-[50%] lg:w-[20%] bg-[#CB1517] p-2 border-[#CB1517] rounded-md"
                  >
                    Edit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
