import { useState } from "react";
import "./App.css";
import MotivatorCards from "./pages/Main/Main";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MotivatorCards />
    </>
  );
}

export default App;
