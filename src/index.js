// Absolute Imports
import React, { useReducer } from "react";
import ReactDOM from "react-dom";
// Relative Imports
import * as serviceWorker from "./serviceWorker";
import citiesReducer from "./reducers/cities";
import CitiesForecast from "./components/CitiesForecast";
import CitiesContext from "./context/cities-context";

/**
 * This is the main component of the application. This renders the CitiesForecast component that renders the list of cities and the detail of a city when clicked
 * Context is also implemented in this component to be used by child components
 * @param none
 */

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
