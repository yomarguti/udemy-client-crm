import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useMutation, gql } from "@apollo/client";

const AUTH_USER = gql`
  mutation AuthUser($input: AuthInput!) {
    authUser(input: $input) {
      token
    }
  }
`;

const Login = () => {
  const [authUser] = useMutation(AUTH_USER);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Main invalid").required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Minimun password length 6 characters"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await authUser({
          variables: { input: { ...values } },
        });
        setMessage(`Autenticando...`);
        localStorage.setItem("token", data.authUser.token);
        setTimeout(() => {
          setMessage(null);
          router.push("/");
        }, 3000);
      } catch (error) {
        console.log(error);
        setMessage(error.message);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    },
  });

  return (
    <Layout>
      <h1 className="text-2xl font-light text-center text-white">Login</h1>
      {message ? (
        <div className="w-full max-w-sm px-3 py-2 mx-auto my-3 text-center bg-white">
          <p>{message}</p>
        </div>
      ) : null}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            onSubmit={formik.handleSubmit}
            className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
          >
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-none"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
                <p className="font-bold">Error: </p>
                <p>{formik.errors.email}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-none"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
                <p className="font-bold">Error: </p>
                <p>{formik.errors.password}</p>
              </div>
            ) : null}
            <input
              type="submit"
              className="w-full p-2 mt-5 text-white uppercase bg-gray-800 hover:bg-gray-900"
              value="Iniciar Sesion"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
