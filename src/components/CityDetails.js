import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { mdiCloud } from "@mdi/js";
import Icon from "@mdi/react";
import { getCityForecast } from "../processapi";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

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

  const formatTemp = (list) => {
    var days = [
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
    });
    return list;
  };

  async function getWeatherData() {
    let weatherData = await getCityForecast(props.cityName);
    // console.log("weatherData", weatherData);

    setWeatherList(formatTemp(weatherData.list));
  }

  useEffect(() => {
    if (props.cityName !== "") {
      console.log("cityname", props.cityName);
      getWeatherData(props.cityName);
    }
  }, [props]);

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={4}>
            <Icon path={mdiCloud} title="Clouds" size={3} />
          </Grid>
          <Grid item xs={8}></Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <List className={classes.flexContainer}>
          {weatherList.map((item) => {
            return (
              <ListItem>
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
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                        align="center"
                      >
                        Ali Connors
                      </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
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
