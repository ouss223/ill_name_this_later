import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required').matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Invalid email format'
    ),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const SignupForm = ({ setAuth }) => {
    const navigate = useNavigate();
    const [call, setCall] = useState(false);
    const [infos, setInfos] = useState();

    const handleSubmit = (values, { setSubmitting }) => {
        setInfos(values);
        setCall(!call);
        setSubmitting(false);
    };

    useEffect(() => {
        async function signUp() {
            if (!infos) {
                return;
            }
            try {
                const response = await fetch(
                    "http://localhost:8000/api/signup.php",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: infos.username,
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
                setAuth(data.auth);
            } catch (e) {
                console.log(e);
            }
        }
        signUp();
    }, [call]);

    return (
        <Formik
            initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form action="/signup" method="post">
                    <div className="relative w-3/4 mx-auto text min-w-[200px]">
                        <Field
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="text-xl peer h-[70px] text-[#FB2576] placeholder-[#FB2576] w-full border-b border-[#FB2576] bg-transparent pt-4 pb-1.5 font-sans  font-normal outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        <ErrorMessage name="username" component="div" className="text-red-500" />

                        <Field
                            type="text"
                            name="email"
                            placeholder="E-mail"
                            className=" text-xl peer h-[70px] text-[#FB2576] placeholder-[#FB2576] w-full border-b border-[#FB2576] bg-transparent pt-4 pb-1.5 font-sans  font-normal outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500" />

                        <Field
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="text-xl peer h-[70px] text-[#FB2576] placeholder-[#FB2576] w-full border-b border-[#FB2576] bg-transparent pt-4 pb-1.5 font-sans  font-normal outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        <ErrorMessage name="password" component="div" className="text-red-500" />

                        <Field
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="text-xl peer h-[70px] text-[#FB2576] placeholder-[#FB2576] w-full border-b border-[#FB2576] bg-transparent pt-4 pb-1.5 font-sans  font-normal outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="relative inline-block pl-8 pr-8 my-8 px-4 py-2 font-medium group left-1/2 transform -translate-x-1/2"
                        >
                            <span className="absolute inset-0 w-full h-full bg-[#FB2576] border-2 border-white group-hover:bg-black"></span>
                            <span className="relative text-white group-hover:text-white px-2">SIGN UP</span>
                        </button>
                        <div className="bottom-0 w-full text-left ml-10 mb-12">
                            <h1 className="abel text-[#FB2576]/30 text-[30px] uppercase">Already have an account? <a href="#" onClick={() => navigate("/login")} className="hover:underline">Log in</a></h1>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default SignupForm;
