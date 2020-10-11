import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { getCityForecast } from "../processapi";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import RefreshIcon from "@material-ui/icons/Refresh";
import IconButton from "@material-ui/core/IconButton";
import WeatherIcon from "./WeatherIcon";

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
  heading: {
    display: "block",
    fontSize: "15px",
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "0",
    marginRight: "0",
    fontWeight: "bold",
  },
  headerDiv: { marginLeft: "30px", marginTop: "20px" },
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

    list.forEach((element) => {
      let dt = element.dt;
      element.dt = new Date(dt * 1000).getDate();
      element.day = days[new Date(dt * 1000).getDay()].substring(0, 3);
      element.icon = element.weather[0].main;
    });
    return list;
  };

  async function getWeatherData() {
    let weatherData = await getCityForecast(props.cityName);
    setWeatherList(formatTemp(weatherData.list));
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={10}>
            <Typography
              align="left"
              variant="h4"
              gutterBottom
              className={classes.headerDiv}
            >
              {props.cityName !== "" ? props.cityName : "Please choose a city"}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton
              edge="end"
              aria-label="refresh"
              style={{ marginTop: "20px" }}
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
              <WeatherIcon weather={weatherList[0].icon} size={3}></WeatherIcon>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={8}>
            {weatherList.length > 0 ? (
              <Typography>
                <Typography
                  variant="body1"
                  component="span"
                  align="left"
                  className={classes.heading}
                  gutterBottom
                >
                  {Math.round(weatherList[0].temp.day)}
                </Typography>
                <Typography
                  align="left"
                  variant="body1"
                  component="span"
                  className={classes.heading}
                  gutterBottom
                >
                  {weatherList[0].weather[0].description}
                </Typography>
                <Typography
                  align="left"
                  variant="body1"
                  component="span"
                  className={classes.heading}
                  gutterBottom
                >
                  Wind: {weatherList[0].speed}
                </Typography>
                <Typography
                  align="left"
                  variant="body1"
                  component="span"
                  className={classes.heading}
                  gutterBottom
                >
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
              <ListItem key={item.dt} alignItems="center">
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        align="center"
                        variant="body1"
                        component="span"
                        className={classes.heading}
                        gutterBottom
                      >
                        {item.dt}
                      </Typography>
                      <Typography
                        align="center"
                        variant="body1"
                        component="span"
                        className={classes.heading}
                        gutterBottom
                      >
                        {item.day}
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        align="center"
                        variant="body1"
                        component="span"
                        className={classes.heading}
                        gutterBottom
                      >
                        <WeatherIcon
                          weather={item.icon}
                          size={1}
                          style={{ marginLeft: "5px" }}
                        ></WeatherIcon>{" "}
                      </Typography>
                      <Typography
                        align="center"
                        variant="body1"
                        component="span"
                        className={classes.heading}
                        gutterBottom
                      >
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
