import { useState } from "react";
import Layout from "../components/Layout";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";

const NEW_CLIENT = gql`
  mutation NewClient($input: ClientInput) {
    newClient(input: $input) {
      id
      name
      sellerId
    }
  }
`;

const GET_CLIENTS_BY_SELLER = gql`
  query GetClientsBySeller {
    getClientsBySeller {
      id
      name
      lastname
      email
      company
      phone
      createdAt
      sellerId
    }
  }
`;

const newClient = () => {
  const [message, setMessage] = useState(null);
  const router = useRouter();
  const [newClient] = useMutation(NEW_CLIENT, {
    update(cache, { data: { newClient } }) {
      const { getClientsBySeller } = cache.readQuery({
        query: GET_CLIENTS_BY_SELLER,
      });

      cache.writeQuery({
        query: GET_CLIENTS_BY_SELLER,
        data: {
          getClientsBySeller: [...getClientsBySeller, newClient],
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      company: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      lastname: Yup.string().required("Lastname is required"),
      email: Yup.string().email("Main invalid").required("Email is required"),
      company: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await newClient({
          variables: { input: { ...values } },
        });
        console.log("data: ", data);
        window.scrollTo(0, 0);
        setMessage("Cliente creado correctamente");
        setTimeout(() => {
          setMessage(null);
          router.push("/");
        }, 3000);
      } catch (error) {
        console.log(error);
        setMessage("Error al crear el nuevo cliente");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    },
  });

  return (
    <div>
      <Layout>
        <h1 className="text-2xl font-light text-gray-800">Nuevo Cliente</h1>
        {message ? (
          <div className="w-full max-w-sm px-3 py-2 mx-auto my-3 text-center bg-white">
            <p>{message}</p>
          </div>
        ) : null}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <form
              onSubmit={formik.handleSubmit}
              className="px-8 pt-6 pb-8 mb-4 bg-white shadow-md"
            >
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="name"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-none"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.name && formik.errors.name ? (
                <div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
                  <p className="font-bold">Error: </p>
                  <p>{formik.errors.name}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="lastname"
                >
                  Apellido
                </label>
                <input
                  type="text"
                  id="lastname"
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-none"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.lastname && formik.errors.lastname ? (
                <div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
                  <p className="font-bold">Error: </p>
                  <p>{formik.errors.lastname}</p>
                </div>
              ) : null}
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
                  htmlFor="company"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-none"
                  value={formik.values.company}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.company && formik.errors.company ? (
                <div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
                  <p className="font-bold">Error: </p>
                  <p>{formik.errors.company}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-none"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.phone && formik.errors.phone ? (
                <div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
                  <p className="font-bold">Error: </p>
                  <p>{formik.errors.phone}</p>
                </div>
              ) : null}
              <input
                type="submit"
                className="w-full p-2 mt-5 text-white uppercase bg-gray-800 hover:bg-gray-900"
                value="Crear Cliente"
              />
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default newClient;
