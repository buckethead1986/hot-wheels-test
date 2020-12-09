import "./App.css";
import Navbar from "./components/Navbar.js";
import React from "react";
// import Drawer from "./components/Drawer.js";
import Drawer2 from "./components/Drawer2.js";
import Container from "./components/Container.js";
import Searchbar2 from "./components/Searchbar2.js";

//make container component underneath App.js to hold 'Drawer2.js' and 'Container.js'.
function App() {
  return (
    <div>
      <Navbar first="hello" second="hey" arr={[1, 2, 3]} />

      <Container />
    </div>
  );
}

export default App;
