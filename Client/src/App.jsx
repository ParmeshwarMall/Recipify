import React from "react";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
      <ToastContainer theme="colored" />
      <Home />
    </div>
  );
};

export default App;
