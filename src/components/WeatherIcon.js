// Absolute Imports
import React from "react";
import { mdiCloud } from "@mdi/js";
import { mdiWeatherRainy } from "@mdi/js";
import { mdiWeatherSunny } from "@mdi/js";
import { mdiWeatherHazy } from "@mdi/js";
import Icon from "@mdi/react";

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
