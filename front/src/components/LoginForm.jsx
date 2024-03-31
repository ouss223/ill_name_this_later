import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

const LoginForm = ({ setAuth, setRole }) => {
  const navigate = useNavigate();
  const [call, setCall] = useState(false);
  const [infos, setInfos] = useState();
  const handleSubmit = (values, { setSubmitting }) => {
    // Submit your form data here, e.g., send a request to your backend
    console.log(values);
    setInfos((prev) => values);
    setCall(!call);

    setSubmitting(false);
  };
  useEffect(() => {
    async function login() {
      if (!infos) {
        return;
      }
      try {
        const response = await fetch(
          "http://localhost:8000/api/login.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: infos.email,
              password: infos.password,
            }),
          }
        );
        if (!response.ok) {
          console.log("error");
          return;
        }
        const data = await response.json();
        console.log(data);
        setRole(data.role);
        setAuth(data.auth);
      } catch (e) {
        console.log(e);
      }
    }
    login();

  }, [call])

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form action="/login" method="post">
          <div className="abel relative  w-3/5 my-12 mx-auto ">
            <div>
              <Field
                type="text"
                name="email"
                placeholder="E-mail"
                className="text-[35px] peer h-[100px] placeholder-[#FB2576] text-[#FB2576] w-full border-b-[2px] border-[#FB2576] bg-transparent pt-4 pb-1.5 outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="text-[35px] peer h-[100px] placeholder-[#FB2576] text-[#FB2576] w-full border-b-[2px] border-[#FB2576] bg-transparent pt-4 pb-1.5 outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative inline-block pl-8 pr-8 my-8 px-4 py-2 font-medium group left-1/2 transform -translate-x-1/2"
            >
              <span className="absolute inset-0 w-full h-full bg-[#FB2576] border-2 border-white group-hover:bg-black"></span>
              <span className="relative text-white group-hover:text-white px-2">
                LOG IN
              </span>
            </button>
            <div className="bottom-0 w-full text-left ml-10 mb-12">
              <h1 className="abel text-[30px] text-[#FB2576]/30 uppercase">
                Don't have an account?{" "}
                <a href="#" onClick={() => navigate("/signup")} className="hover:underline">
                  Sign up
                </a>
              </h1>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
