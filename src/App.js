import "./App.css";
import React from "react";
// import Drawer from "./components/Drawer.js";
import Drawer2 from "./components/Drawer2.js";
import Container from "./components/Container.js";
import Searchbar2 from "./components/Searchbar2.js";

//make container component underneath App.js to hold 'Drawer2.js' and 'Container.js'.
function App() {
  return (
    <div>
      <Container />
    </div>
  );
}

export default App;
