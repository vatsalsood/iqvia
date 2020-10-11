import React, { useEffect, useState, useReducer, useContext } from "react";
import CitiesContext from "../context/cities-context";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import RefreshIcon from "@material-ui/icons/Refresh";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";

import { checkCity } from "../processapi";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const CityList = (props) => {
  const { cities, dispatch } = useContext(CitiesContext);
  const [listEmpty, setListEmpty] = useState(true);
  const [reveresedCities, setReversedCities] = useState([]);
  const classes = useStyles();

  async function refreshWeather(cityName) {
    let isValidCity = await checkCity(cityName);
    dispatch({ type: "UPDATE_CITY", isValidCity });
  }

  const compare = (a, b) => {
    if (a.id > b.id) {
      return -1;
    }
    if (a.id < b.id) {
      return 1;
    }
    return 0;
  };

  const sortCities = () => {};

  useEffect(() => {
    setReversedCities(cities.sort(compare));

    let cityLength = cities.length;
    cityLength !== 0 ? setListEmpty(false) : setListEmpty(true);
    dispatch({ type: "UPDATE_CITY_LIST", cities });
  }, [cities]);

  return (
    <div>
      <List>
        {reveresedCities.map((city) => {
          return (
            <ListItem
              button
              onClick={() => {
                props.displayCityDetails(city.name);
              }}
              key={city.name}
            >
              <ListItemText
                key={city.name}
                primary={city.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {city.temperature} degrees
                    </Typography>
                    -- {city.description}
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="refresh"
                  onClick={() => {
                    refreshWeather(city.name);
                  }}
                >
                  <RefreshIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="refresh"
                  onClick={() => {
                    dispatch({ type: "REMOVE_CITY", name: city.name });
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
        <ListItem alignItems="right">
          <Button
            variant="contained"
            disabled={listEmpty}
            onClick={() => {
              dispatch({ type: "CLEAR_CITIES" });
            }}
          >
            Clear
          </Button>
        </ListItem>
      </List>
    </div>
  );
};

export default CityList;
