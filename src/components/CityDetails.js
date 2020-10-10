import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { mdiCloud } from "@mdi/js";
import { mdiWeatherRainy } from "@mdi/js";
import { mdiWeatherSunny } from "@mdi/js";
import Icon from "@mdi/react";
import { getCityForecast } from "../processapi";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import RefreshIcon from "@material-ui/icons/Refresh";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 0,
  },
}));

const CityDetails = (props) => {
  const classes = useStyles();
  const [weatherList, setWeatherList] = useState([]);

  useEffect(() => {
    if (props.cityName !== "") {
      getWeatherData(props.cityName);
    }
  }, [props]);

  const formatTemp = (list) => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let icons = {
      Clouds: mdiCloud,
      Rain: mdiWeatherRainy,
      Clear: mdiWeatherSunny,
    };

    list.forEach((element) => {
      let dt = element.dt;
      let iconData = element.weather[0].main;
      element.dt = new Date(dt * 1000).getDate();
      element.day = days[new Date(dt * 1000).getDay()].substring(0, 3);
      element.icon = icons[iconData];
    });
    return list;
  };

  async function getWeatherData() {
    let weatherData = await getCityForecast(props.cityName);
    // console.log("weatherData", weatherData);

    setWeatherList(formatTemp(weatherData.list));
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={8}>
            <Typography align="left" variant="h4" gutterBottom gutterLeft>
              {props.cityName !== "" ? props.cityName : "Please choose a city"}
            </Typography>
          </Grid>
          <Grid item xs={4} alignItems="right">
            <IconButton
              edge="end"
              aria-label="refresh"
              onClick={() => {
                getWeatherData();
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={4}>
            {weatherList.length > 0 ? (
              <Icon path={weatherList[0].icon} title="Clouds" size={3} />
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={8}>
            {weatherList.length > 0 ? (
              <Typography variant="div">
                <Typography align="left" variant="h6" gutterBottom>
                  {Math.round(weatherList[0].temp.day)}
                </Typography>
                <Typography align="left" variant="h6" gutterBottom>
                  {weatherList[0].weather[0].description}
                </Typography>
                <Typography align="left" variant="h6" gutterBottom>
                  Wind: {weatherList[0].speed}
                </Typography>
                <Typography align="left" variant="h6" gutterBottom>
                  Pressure: {weatherList[0].pressure}
                </Typography>
              </Typography>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <List className={classes.flexContainer}>
          {weatherList.map((item) => {
            return (
              <ListItem alignItems="center">
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography align="center" variant="h6" gutterBottom>
                        {item.dt}
                      </Typography>
                      <Typography align="center" variant="h6" gutterBottom>
                        {item.day}
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography align="center" variant="h6" gutterBottom>
                        <Icon path={item.icon} size={1} />
                      </Typography>
                      <Typography align="center" variant="h6" gutterBottom>
                        {Math.round(item.temp.day)}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
};

export default CityDetails;
