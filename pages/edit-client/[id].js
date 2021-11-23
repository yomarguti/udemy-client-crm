import { useState } from "react";
import Layout from "../../components/Layout";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";

const GET_CLIENT = gql`
  query GetClient($id: ID) {
    getClient(id: $id) {
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

const UPDATE_CLIENT = gql`
  mutation Mutation($id: ID, $input: ClientInput) {
    updateClient(id: $id, input: $input) {
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

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  lastname: Yup.string().required("Lastname is required"),
  email: Yup.string().email("Main invalid").required("Email is required"),
  company: Yup.string().required("Password is required"),
});

const EditClient = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const [updateClient] = useMutation(UPDATE_CLIENT);
  const { data, loading, error } = useQuery(GET_CLIENT, { variables: { id } });

  const [message, setMessage] = useState(null);

  const handleSubmit = async ({ name, lastname, company, email, phone }) => {
    try {
      const { data } = await updateClient({
        variables: { id: id, input: { name, lastname, company, email, phone } },
      });
      window.scrollTo(0, 0);
      setMessage("Cliente actualizado correctamente");
      setTimeout(() => {
        setMessage(null);
        router.push("/");
      }, 3000);
    } catch (error) {
      console.log(error);
      setMessage("Error al actualizar el cliente");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div>
        <Layout>
          <p>Loading...</p>
        </Layout>
      </div>
    );
  }

  const { getClient } = data;

  return (
    <div>
      <Layout>
        <h1 className="text-2xl font-light text-gray-800">Editar Cliente</h1>
        {message ? (
          <div className="w-full max-w-sm px-3 py-2 mx-auto my-3 text-center bg-white">
            <p>{message}</p>
          </div>
        ) : null}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <Formik
              validationSchema={validationSchema}
              enableReinitialize
              initialValues={getClient}
              onSubmit={handleSubmit}
            >
              {(props) => {
                return (
                  <form
                    onSubmit={props.handleSubmit}
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
                        value={props.values.name}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                    </div>
                    {props.touched.name && props.errors.name ? (
                      <div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
                        <p className="font-bold">Error: </p>
                        <p>{props.errors.name}</p>
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
                        value={props.values.lastname}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                    </div>
                    {props.touched.lastname && props.errors.lastname ? (
                      <div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
                        <p className="font-bold">Error: </p>
                        <p>{props.errors.lastname}</p>
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
                        value={props.values.email}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                    </div>
                    {props.touched.email && props.errors.email ? (
                      <div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
                        <p className="font-bold">Error: </p>
                        <p>{props.errors.email}</p>
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
                        value={props.values.company}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                    </div>
                    {props.touched.company && props.errors.company ? (
                      <div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
                        <p className="font-bold">Error: </p>
                        <p>{props.errors.company}</p>
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
                        value={props.values.phone}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                    </div>
                    {props.touched.phone && props.errors.phone ? (
                      <div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
                        <p className="font-bold">Error: </p>
                        <p>{props.errors.phone}</p>
                      </div>
                    ) : null}
                    <input
                      type="submit"
                      className="w-full p-2 mt-5 text-white uppercase bg-gray-800 hover:bg-gray-900"
                      value="Actualizar Cliente"
                    />
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default EditClient;
