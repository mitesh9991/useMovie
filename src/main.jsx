import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import StarRating from "./Components/StarRating.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={1} /> */}
  </React.StrictMode>
);
