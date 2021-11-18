import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const GET_USER = gql`
  query GetUser {
    getUser {
      name
      lastname
    }
  }
`;

const Header = () => {
  const { data, loading, error } = useQuery(GET_USER);
  const router = useRouter();

  const handleSignUp = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) return null;

  if (!data) {
    router.push("/login");
    return <p>No data</p>;
  }

  return (
    <div className="flex justify-between mb-7">
      <p className="mr-2">{`${data?.getUser.name} ${data?.getUser.lastname}`}</p>
      <button
        type="button"
        className="w-full px-2 py-1 text-xs font-bold text-white uppercase bg-blue-800 rounded shadow-md sm:w-auto"
        onClick={handleSignUp}
      >
        Cerrar sesion
      </button>
    </div>
  );
};

export default Header;
