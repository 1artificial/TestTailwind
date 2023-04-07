import Navbar from "./Navbar";
import Main from "./Main";
import Login from "./Login";
import Logout from "./Logout";
import "./index.css";
import "./Navbar.js";
import "./Main.js";
import "./Login.js";
import "./Logout";

function App() {
  return (
    <>
      <Logout />
      <Login />
      <Navbar />
      <Main />
    </>
  );
}

export default App;
