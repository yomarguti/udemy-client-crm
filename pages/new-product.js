import { useState } from "react";
import Layout from "../components/Layout";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";

const NEW_PRODUCT = gql`
  mutation Mutation($input: ProductInput) {
    newProduct(input: $input) {
      id
      name
      stock
      price
      createdAt
    }
  }
`;

const GET_PRODUCTS = gql`
  query Query {
    getProducts {
      id
      name
      stock
      price
      createdAt
    }
  }
`;

const newClient = () => {
  const [message, setMessage] = useState(null);
  const router = useRouter();
  const [newProduct] = useMutation(NEW_PRODUCT, {
    update(cache, { data: { newProduct } }) {
      const { getProducts } = cache.readQuery({
        query: GET_PRODUCTS,
      });

      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getProducts: [...getProducts, newProduct],
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      stock: "",
      price: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      stock: Yup.number()
        .integer("Stock must be integer")
        .positive("Non negative numbers")
        .required("Stock is required"),
      price: Yup.number()
        .positive("Non negative numbers")
        .required("Price is required"),
    }),
    onSubmit: async (values) => {
      try {
        setMessage("Creando producto...");
        const { data } = await newProduct({
          variables: { input: { ...values } },
        });
        setMessage("Producto creado correctamente");
        setTimeout(() => {
          setMessage(null);
          router.push("/products");
        }, 3000);
      } catch (error) {
        console.log(error);
        setMessage("Error al crear el nuevo producto");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    },
  });

  return (
    <div>
      <Layout>
        <h1 className="text-2xl font-light text-gray-800">Nuevo Producto</h1>
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
                  htmlFor="stock"
                >
                  Existencia
                </label>
                <input
                  type="number"
                  id="stock"
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-none"
                  value={formik.values.stock}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.stock && formik.errors.stock ? (
                <div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
                  <p className="font-bold">Error: </p>
                  <p>{formik.errors.stock}</p>
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
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.price && formik.errors.price ? (
                <div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
                  <p className="font-bold">Error: </p>
                  <p>{formik.errors.price}</p>
                </div>
              ) : null}

              <input
                type="submit"
                className="w-full p-2 mt-5 text-white uppercase bg-gray-800 hover:bg-gray-900"
                value="Crear Producto"
              />
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default newClient;
