// Login.js
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
      >
        <button
          type="button"
          className="h-12 px-6 m-2 text-lg  text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => loginWithRedirect()}
        >
          Log in
        </button>
      </div>
    )
  );
};

export default Login;
