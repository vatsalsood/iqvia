// Absolute Imports
import React from "react";
import { mdiCloud } from "@mdi/js";
import { mdiWeatherRainy } from "@mdi/js";
import { mdiWeatherSunny } from "@mdi/js";
import { mdiWeatherHazy } from "@mdi/js";
import Icon from "@mdi/react";

/**
 * This component returns a weather icon deoending on the name of the icon and size
 * @param iconname
 * @param size 
 */
const WeatherIcon = (props) => {
  let icons = {
    Clouds: mdiCloud,
    Rain: mdiWeatherRainy,
    Clear: mdiWeatherSunny,
    Haze: mdiWeatherHazy,
  };
  return (
    <Icon path={icons[props.weather]} style={{ marginLeft: "10px" }} size={props.size} />
  );
};

export default WeatherIcon;
