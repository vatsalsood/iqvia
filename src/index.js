// Check for duplicates in city list
// Disable add button when field empty
// Prevent adding special characters in search field
// Clear search field after adding city

import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import citiesReducer from "./reducers/cities";
import CitiesForecast from "./components/CitiesForecast";
import CitiesContext from "./context/cities-context";

const App = () => {
  const [cities, dispatch] = useReducer(citiesReducer, []);

  return (
    <CitiesContext.Provider value={{ cities, dispatch }}>
      <CitiesForecast></CitiesForecast>
    </CitiesContext.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
