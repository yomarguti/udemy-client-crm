import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="p-5 bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen">
      <div>
        <p className="text-2xl font-bold text-white">CRM Clientes</p>
      </div>

      <nav className="mt-5 list-none">
        <li className={router.pathname === "/" ? "bg-blue-600 p-2" : "p-2"}>
          <Link href="/">
            <a className="block text-white">Clientes</a>
          </Link>
        </li>
        <li
          className={router.pathname === "/orders" ? "bg-blue-600 p-2" : "p-2"}
        >
          <Link href="/orders">
            <a className="block text-white">Pedidos</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/products" ? "bg-blue-600 p-2" : "p-2"
          }
        >
          <Link href="/products">
            <a className="block text-white">Productos</a>
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
