import { useState } from "react";
import Layout from "../../components/Layout";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";

const GET_PRODUCT = gql`
  query Query($id: ID!) {
    getProduct(id: $id) {
      id
      name
      stock
      price
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation Mutation($id: ID, $input: ProductInput) {
    updateProduct(id: $id, input: $input) {
      id
      name
      stock
      price
    }
  }
`;

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  stock: Yup.number()
    .integer("Stock must be integer")
    .positive("Non negative numbers")
    .required("Stock is required"),
  price: Yup.number()
    .positive("Non negative numbers")
    .required("Price is required"),
});

const EditProduct = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const { data, loading, error } = useQuery(GET_PRODUCT, { variables: { id } });

  const [message, setMessage] = useState(null);

  const handleSubmit = async ({ name, stock, price }) => {
    try {
      const { data } = await updateProduct({
        variables: { id: id, input: { name, stock, price } },
      });
      setMessage("Producto actualizado correctamente");
      setTimeout(() => {
        setMessage(null);
        router.push("/products");
      }, 3000);
    } catch (error) {
      console.log(error);
      setMessage("Error al actualizar el producto");
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

  const { getProduct } = data;

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
              initialValues={getProduct}
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
                        htmlFor="stock"
                      >
                        Existencia
                      </label>
                      <input
                        type="number"
                        id="stock"
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-none"
                        value={props.values.stock}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                    </div>
                    {props.touched.stock && props.errors.stock ? (
                      <div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
                        <p className="font-bold">Error: </p>
                        <p>{props.errors.stock}</p>
                      </div>
                    ) : null}
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="price"
                      >
                        Precio
                      </label>
                      <input
                        type="number"
                        id="price"
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-none"
                        value={props.values.price}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                    </div>
                    {props.touched.price && props.errors.price ? (
                      <div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
                        <p className="font-bold">Error: </p>
                        <p>{props.errors.price}</p>
                      </div>
                    ) : null}

                    <input
                      type="submit"
                      className="w-full p-2 mt-5 text-white uppercase bg-gray-800 hover:bg-gray-900"
                      value="Actualizar Producto"
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

export default EditProduct;
