// App.js
import React from "react";
import Navbar from "./Navbar";
import Main from "./Main";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";
import "./index.css";
import "./Navbar.js";
import "./Main.js";
import "./Login.js";
import "./Logout";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <Logout />
      <Login />
      <Navbar />
      {isAuthenticated && (
        <>
          <Main />
        </>
      )}
    </>
  );
}

export default App;
