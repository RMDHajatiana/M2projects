import React from "react";
import Navigation from "./Components/Navigation";
import { MenuProvider } from "./Components/MenuContext";

function App() {
  return (
    <MenuProvider>
      <Navigation/>
    </MenuProvider>
  )
}

export default App
